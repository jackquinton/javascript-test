import axios, { AxiosInstance } from "axios";
import { Book } from "./types";
import { XMLParser } from "fast-xml-parser";

export class BookSearchApiClient {
  private format: "json" | "xml" = "json";
  private axiosInstance: AxiosInstance;

  constructor(format: "json" | "xml" = "json") {
    this.format = format;
    this.axiosInstance = axios.create({
      baseURL: "http://api.book-seller-example.com",
    });
  }

  public async getBooksByAuthor(
    authorName: string,
    limit: number
  ): Promise<Book[]> {
    try {
      const response = await this.axiosInstance("/by-author", {
        params: {
          q: authorName,
          limit,
          format: this.format,
        },
      });

      if (response.status === 200) {
        return this.parseResponse(response.data);
      } else {
        throw new Error("Request failed with status code: " + response.status);
      }
    } catch (error) {
      console.error("Error fetching books by author:", error);
      throw error;
    }
  }

  private parseResponse(data: any): Book[] {
    if (this.format === "json") {
      return data.map((item: any) => ({
        title: item.book.title,
        author: item.book.author,
        isbn: item.book.isbn,
        quantity: item.stock.quantity,
        price: item.stock.price,
      }));
    } else if (this.format === "xml") {
      const parser = new XMLParser({
        ignoreAttributes: true,

        // This is to stop parsing the isbn as a number
        numberParseOptions: {
          leadingZeros: false,
          skipLike: /[0-9]+/,
          hex: false,
        },
      });
      const result = parser.parse(data);
      const books = result.books.book;

      // Handle both single book and multiple books cases
      const bookArray = Array.isArray(books) ? books : [books];

      return bookArray.map((item: any) => ({
        title: item.details.title,
        author: item.details.author,
        isbn: item.details.isbn,
        quantity: Number(item.stock.quantity),
        price: Number(item.stock.price),
      }));
    } else {
      throw new Error(`Unsupported format: ${this.format}`);
    }
  }
}
