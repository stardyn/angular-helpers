export class StringUtil {
  public static yesNo(str: boolean): string {
    if (str) {
      return "Evet"
    }
    return "Hayır"
  }

  public static removeInvalidChars(str: string): string {
    if (str == null || str == "") {
      return "";
    }

    return str.replace(/[^a-zA-Z0-9]/g, "-")
  }
}
