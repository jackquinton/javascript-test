import { Validators } from "../validators";

describe("Validators", () => {
  describe("isValidISBN", () => {
    it("should accept valid 10-digit ISBN", () => {
      expect(Validators.isValidISBN("0123456789")).toBe(true);
    });

    it("should accept valid 13-digit ISBN", () => {
      expect(Validators.isValidISBN("0123456789012")).toBe(true);
    });

    it("should reject invalid ISBN lengths", () => {
      expect(Validators.isValidISBN("123")).toBe(false);
      expect(Validators.isValidISBN("12345678901")).toBe(false);
      expect(Validators.isValidISBN("01234567890123")).toBe(false);
    });

    it("should reject ISBN with non-numeric characters", () => {
      expect(Validators.isValidISBN("012345678X")).toBe(false);
      expect(Validators.isValidISBN("abc1234567")).toBe(false);
    });
  });

  describe("isValidYear", () => {
    it("should accept current year", () => {
      const currentYear = new Date().getFullYear();
      expect(Validators.isValidYear(currentYear)).toBe(true);
    });

    it("should accept past years", () => {
      expect(Validators.isValidYear(2000)).toBe(true);
      expect(Validators.isValidYear(1900)).toBe(true);
    });

    it("should reject future years", () => {
      const nextYear = new Date().getFullYear() + 1;
      expect(Validators.isValidYear(nextYear)).toBe(false);
    });

    it("should reject invalid years", () => {
      expect(Validators.isValidYear(0)).toBe(false);
      expect(Validators.isValidYear(-1)).toBe(false);
    });
  });

  describe("isValidLimit", () => {
    it("should accept valid limits", () => {
      expect(Validators.isValidLimit(1)).toBe(true);
      expect(Validators.isValidLimit(50)).toBe(true);
      expect(Validators.isValidLimit(100)).toBe(true);
    });

    it("should reject invalid limits", () => {
      expect(Validators.isValidLimit(0)).toBe(false);
      expect(Validators.isValidLimit(-1)).toBe(false);
      expect(Validators.isValidLimit(101)).toBe(false);
    });
  });
});
