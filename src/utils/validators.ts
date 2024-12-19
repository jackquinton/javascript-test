export class Validators {
  public static isValidISBN(isbn: string): boolean {
    return /^(?:\d{10}|\d{13})$/.test(isbn);
  }

  public static isValidYear(year: number): boolean {
    const currentYear = new Date().getFullYear();
    return year > 0 && year <= currentYear;
  }

  public static isValidLimit(limit: number): boolean {
    return limit > 0 && limit <= 100;
  }
}
