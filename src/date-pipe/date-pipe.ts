import {Pipe, PipeTransform} from '@angular/core';
import {Dates} from "../helpers/dates";

@Pipe({
  name: 'customDate',
  standalone: true
})

export class CustomDatePipe implements PipeTransform {
  transform(value: any | undefined | null, format: string = 'DD-MM-YYYY HH:mm:ss'): string | null {
    if (!value) return '';

    return Dates.formatDate(value, format);
  }
}
