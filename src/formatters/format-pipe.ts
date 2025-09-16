import { Pipe, PipeTransform } from '@angular/core';
import {FormatService} from "./format-service";


@Pipe({
  name: 'format',
  standalone: true
})
export class FormatPipe implements PipeTransform {
  transform(value: any, format: string): string {
    return FormatService.format(value, format);
  }
}
