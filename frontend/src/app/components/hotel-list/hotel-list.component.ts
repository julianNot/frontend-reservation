import { Component, OnInit } from '@angular/core';
import { HotelService } from '../services/hotel.service'

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.sass']
})
export class HotelListComponent implements OnInit {
  hotels: any[] = [];
  availability: any[] = [];
  tariffs: any;
  locations: string[] = ['Barranquilla', 'Cali', 'Cartagena', 'Bogotá'];
  roomTypes: string[] = ['standard', 'premium', 'vip'];
  errorMessage: string = '';
  seasonMessage: string = '';
  seasonClass: string = '';
  submitted: boolean = false;

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
    this.hotelService.getHotels().subscribe(data => {
      this.hotels = data;
    });
  }

  checkAvailability(event: Event, location: string, date: string): void {
    event.preventDefault();
    this.submitted = true;
    this.hotelService.checkAvailability(location, date).subscribe(data => {
      this.availability = data;
    });
  }

  getSeason(date: Date): string {
    const month = date.getMonth() + 1;
    if ([6, 7, 12, 1].includes(month)) {
      return 'high';
    } else {
      return 'low';
    }
  }

  updateSeason(date: string): void {
    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      this.seasonMessage = '';
      this.seasonClass = '';
      return;
    }
    const season = this.getSeason(selectedDate);
    if (season === 'high') {
      this.seasonMessage = 'Aprovecha tus vacaciones';
      this.seasonClass = 'alert-danger';
    } else {
      this.seasonMessage = 'Aprovecha las promociones de temporada baja';
      this.seasonClass = 'alert-success';
    }
  }

  getTariffs(event: Event, location: string, date: string, roomType: string, numPeople: string): void {
    event.preventDefault();
    const numPeopleNumber = parseInt(numPeople, 10);
    this.errorMessage = '';
    const selectedDate = new Date(date);
    const season = this.getSeason(selectedDate);

    this.hotelService.getTariffs(location, season, roomType, numPeopleNumber).subscribe(
      data => {
        this.tariffs = data;
      },
      error => {
        if (error.error && error.error.error) {
          this.errorMessage = error.error.error;
        } else {
          this.errorMessage = 'An error occurred while fetching the tariffs.';
        }
      }
    );
  }
}
