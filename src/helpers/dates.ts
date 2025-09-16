import moment from 'moment';

export class Dates {
  public static fromEpochToString(num: number, format: string = 'DD-MM-YYYY HH:mm:ss'): string {
    if (num <= 0) {
      return "";
    }

    return moment.unix(num).format(format);
  }

  public static fromEpochToDate(num: number): Date {
    if (num <= 0) {
      return new Date()
    }

    return moment.unix(num).toDate();
  }

  public static dataToUnix(date: Date): number {
    let day: string = date.getDate().toString();

    if (day.length == 1) {
      day = '0' + day;
    }

    let month: string = (date.getMonth() + 1).toString();

    if (month.length == 1) {
      month = '0' + month;
    }

    const year = date.getFullYear();

    let hour: string = date.getHours().toString();

    if (hour.length == 1) {
      hour = '0' + hour;
    }

    let minute: string = date.getMinutes().toString();

    if (minute.length == 1) {
      minute = '0' + minute;
    }

    const str = `${month}-${day}-${year}`;

    const final = moment(str, 'MM-DD-YYYY')
    final.set({hour: date.getHours(), minute: date.getMinutes(), second: 0, millisecond: 0})

    const utc: number = final.utc(true).unix()

    // console.log("dataToUnix", str, final,utc)

    return utc;
  }

  public static formatDate(date: any, format:string): string {
    return moment(date).format(format);
  }

  public static fromDateToString(date: Date): string {
    return moment(date).format('DD-MM-YYYY');
  }

  public static fromStringToDate(date: string): Date {

    if (date == "") {
      return new Date()
    }

    return moment(date, 'DD-MM-YYYY').toDate();
  }

  public static getQuarter(month: number, year: number) {
    const date = new Date(year + '-' + month + '-1');

    return Math.floor(date.getMonth() / 3 + 1);
  }

  public static getTimezoneOffset(): number {
    return new Date().getTimezoneOffset();
  }
}
