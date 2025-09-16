import numeral from "numeral";

export class Nums {
  /**
   * Sayıyı belirtilen ondalık basamak sayısına yuvarlar
   * @param num - Yuvarlanacak sayı
   * @param fix - Ondalık basamak sayısı (varsayılan: 0)
   * @returns Yuvarlanmış sayı
   */
  static numberFloorFormat(num: number | null | undefined, fix: number = 0): number {
    let value: number;

    if (num == null || num == undefined) {
      num = 0;
    }

    if (fix === 0) {
      value = Math.round(num);
    } else {
      value = Number(Number(num).toFixed(fix));
    }

    if (isNaN(value)) {
      return 0;
    }

    return value;
  }

  /**
   * String'i sayıya dönüştürür (Türkiye formatında: virgül -> nokta)
   * @param num - Dönüştürülecek string
   * @param fix - Kullanılmıyor (ileride kaldırılabilir)
   * @returns Dönüştürülen sayı
   */
  static numberFloorFromStr(num: string | null | undefined, fix: number = 0): number {
    if (num == null) {
      return 0;
    }

    const numStr = num.toString().replace(".", "").replace(",", ".");
    const n = parseFloat(numStr);

    if (isNaN(n) || n == 0) {
      return 0;
    }

    return n;
  }

  /**
   * Sayıyı tam sayıya yuvarlar
   * @param num - Yuvarlanacak sayı
   * @returns Yuvarlanmış tam sayı
   */
  static numberInt(num: number | null | undefined): number {
    if (num == null || num == 0 || isNaN(num)) {
      return 0;
    }

    return Math.round(num);
  }

  /**
   * String'i tam sayıya dönüştürür
   * @param num - Dönüştürülecek string
   * @returns Dönüştürülen tam sayı
   */
  static numberIntFromStr(num: string | null | undefined): number {
    if (num == null) {
      return 0;
    }

    const n = parseInt(num);

    if (n == 0 || isNaN(n)) {
      return 0;
    }

    return n;
  }

  /**
   * String'i tam sayıya dönüştürür ve yuvarlar
   * @param num - Dönüştürülecek string
   * @returns Yuvarlanmış tam sayı
   */
  static numberIntByStr(num: string | null | undefined): number {
    return Math.round(this.numberIntFromStr(num));
  }

  /**
   * Sayıyı formatlı string'e dönüştürür (İngilizce format)
   * @param num - Formatlanacak sayı
   * @returns Formatlanmış string
   */
  static numberFormat(num: number | null | undefined): string {
    if (num == null || num == 0 || isNaN(num)) {
      return '0';
    }

    return num.toLocaleString('en-us', { minimumFractionDigits: 2 });
  }

  /**
   * Sayıyı yuvarlar ve formatlar
   * @param num - Yuvarlanacak ve formatlanacak sayı
   * @returns Yuvarlanmış ve formatlanmış string
   */
  static roundUp(num: number | null | undefined): string {
    if (num == null || num == 0 || isNaN(num)) {
      return '0';
    }

    return this.numberFormat(Math.round(num));
  }

  /**
   * Sayıyı yuvarlar ve string'e dönüştürür
   * @param num - Yuvarlanacak sayı
   * @returns Yuvarlanmış string
   */
  static roundUpStr(num: number | string | null | undefined): string {
    if (num == null) {
      return '0';
    }

    const v = Number(num);

    if (v == 0 || isNaN(v)) {
      return '0';
    }

    return Math.round(v).toString();
  }

  /**
   * Sayıya belirtilen yüzde oranını uygular
   * @param num - Ana sayı
   * @param percentage - Yüzde oranı
   * @returns Yüzde uygulanmış sayı
   */
  static calcPercentage(num: number, percentage: number): number {
    if (num == 0) {
      return 0;
    }

    if (percentage == 0) {
      return num;
    }

    return ((num / 100) * percentage) + num;
  }

  /**
   * Verilen ay ve yıl için çeyrek (quarter) hesaplar
   * @param month - Ay (1-12)
   * @param year - Yıl
   * @returns Çeyrek numarası (1-4)
   */
  static getQuarter(month: number, year: number): number {
    const date = new Date(year + '-' + month + '-1');
    return Math.floor(date.getMonth() / 3 + 1);
  }

  /**
   * Sayının negatif olup olmadığını kontrol eder
   * @param num - Kontrol edilecek sayı
   * @returns Negatif ise true, değilse false
   */
  static isNegative(num: number | string): boolean {
    const str = num.toString();
    return str.startsWith("-");
  }

  /**
   * Türk parasına uygun formatlama (nokta ve virgül değişimi)
   * @param value - Formatlanacak değer
   * @param format - Numeral.js format string'i (varsayılan: '0,0.00')
   * @returns Türk formatında formatlanmış string
   */
  static formatTurkishCurrency(value: number | string | null | undefined, format?: string): string {
    let numValue: number;

    if (typeof value !== 'number') {
      if (value == null) {
        return "0";
      }

      const valueStr = value.toString();
      if (typeof valueStr === 'string') {
        // Eğer string içinde virgül varsa, onu geçici olarak noktaya dönüştür
        const normalizedValue = valueStr.replace(',', '.');
        numValue = parseFloat(normalizedValue);
      } else {
        // Zaten sayı ise doğrudan kullan
        numValue = Number(value);
      }
    } else {
      numValue = Number(value);
    }

    // Eğer geçerli bir sayı değilse 0 olarak belirle
    if (isNaN(numValue)) {
      return "0";
    }

    // Sayıyı numeral.js ile formatla
    let formatted = numeral(numValue).format(format || '0,0.00');

    // Türk para birimi formatına dönüştür (1,234.56 -> 1.234,56)
    formatted = formatted.replace(/,/g, ';').replace(/\./g, ',').replace(/;/g, '.');

    return formatted;
  }
}
