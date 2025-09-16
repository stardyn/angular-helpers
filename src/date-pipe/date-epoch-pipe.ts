import {Pipe, PipeTransform} from "@angular/core";
import {Dates} from "../helpers/dates";

@Pipe({
  name: 'epochDate',
  standalone: true
})
export class EpochDatePipe implements PipeTransform {

  transform(epochTime: number | undefined | null, format: string = 'DD-MM-YYYY HH:mm:ss'): string | null {
    if (!epochTime) {
      return null;
    }

    return Dates.fromEpochToString(epochTime, format);
  }
}
