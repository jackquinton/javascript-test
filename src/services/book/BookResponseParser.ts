import { XMLParser } from "fast-xml-parser";
import { Book } from "../../types/book.types";
import {
  ResponseFormat,
  BookResponse,
  XMLBookResponse,
} from "../../types/api.types";
import pino from "pino";

export class BookResponseParser {
  private readonly format: ResponseFormat;
  private readonly xmlParser: XMLParser;
  private readonly logger: pino.Logger;

  constructor(format: ResponseFormat) {
    this.format = format;
    this.xmlParser = new XMLParser({
      ignoreAttributes: true,
      numberParseOptions: {
        leadingZeros: false,
        skipLike: /[0-9]+/,
        hex: false,
      },
    });
    this.logger = pino();
  }

  public parse(data: any): Book[] {
    return this.format === ResponseFormat.JSON
      ? this.parseJsonResponse(data)
      : this.parseXmlResponse(data);
  }

  private parseJsonResponse(data: BookResponse[]): Book[] {
    this.logger.info(`Parsing JSON response: ${JSON.stringify(data)}`);
    return data.map((item) => ({
      title: item.book.title,
      author: item.book.author,
      isbn: item.book.isbn,
      quantity: item.stock.quantity,
      price: item.stock.price,
    }));
  }

  private parseXmlResponse(data: string): Book[] {
    this.logger.info(`Parsing XML response: ${data}`);
    const result = this.xmlParser.parse(data);
    const books = result.books.book;
    const bookArray = Array.isArray(books) ? books : [books];

    return bookArray.map((item: XMLBookResponse) => ({
      title: item.details.title,
      author: item.details.author,
      isbn: item.details.isbn,
      quantity: Number(item.stock.quantity),
      price: Number(item.stock.price),
    }));
  }
}
