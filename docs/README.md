# Hotel Reservation System

Este proyecto es una aplicación de reservas de hoteles que permite a los usuarios consultar la disponibilidad de hoteles y obtener tarifas según la temporada y el tipo de habitación.

## Descripción del Proyecto

La aplicación está dividida en dos partes principales: el backend y el frontend. El backend está construido con Node.js y Express, utilizando MongoDB como base de datos. El frontend está construido con Angular.

### Funcionalidades Principales

1. **Consulta de Disponibilidad:** Los usuarios pueden consultar la disponibilidad de los hoteles según la ubicación y la fecha seleccionadas.
2. **Cálculo de Tarifas:** Los usuarios pueden obtener tarifas basadas en la temporada (alta o baja), el tipo de habitación y el número de personas.

## Cálculo por Temporada

El cálculo de tarifas se realiza en función de la temporada en la que se realiza la reserva. Las temporadas se dividen en alta y baja según los siguientes criterios:

- **Temporada Alta:** Incluye los meses de Junio, Julio, Diciembre y Enero.
- **Temporada Baja:** Incluye todos los demás meses del año.

### Lógica de Temporada

La lógica para determinar la temporada se implementa en el componente Angular y en el backend. Cuando el usuario selecciona una fecha, se evalúa el mes de la fecha seleccionada para determinar si es temporada alta o baja.

#### Código de Ejemplo para Determinar la Temporada

**Frontend:**

```typescript
getSeason(date: Date): string {
  const month = date.getMonth() + 1; // Los meses en JavaScript son 0-11, sumamos 1 para que sean 1-12
  if ([6, 7, 12, 1].includes(month)) {
    return 'high';
  } else {
    return 'low';
  }
}

updateSeason(date: string): void {
  const selectedDate = new Date(date);
  const season = this.getSeason(selectedDate);
  if (season === 'high') {
    this.seasonMessage = 'Aprovecha tus vacaciones';
    this.seasonClass = 'alert-danger';
  } else {
    this.seasonMessage = 'Aprovecha las promociones de temporada baja';
    this.seasonClass = 'alert-success';
  }
}

