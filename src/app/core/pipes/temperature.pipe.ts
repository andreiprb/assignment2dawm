import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number, format: string = 'celsius'): string {
    if (value === null || value === undefined) {
      return '';
    }

    switch (format.toLowerCase()) {
      case 'fahrenheit':
        const fahrenheit = (value * 9/5) + 32;
        return `${fahrenheit.toFixed(1)}°F`;
      case 'both':
        const fahr = (value * 9/5) + 32;
        return `${value.toFixed(1)}°C / ${fahr.toFixed(1)}°F`;
      case 'celsius':
      default:
        return `${value.toFixed(1)}°C`;
    }
  }
}
