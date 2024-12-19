import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { Book } from "../../types/book.types";
import {
  ResponseFormat,
  QueryEndpoint,
  QueryParams,
} from "../../types/api.types";
import { BookResponseParser } from "./BookResponseParser";
import pino from "pino";

export class ApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = "ApiError";
  }
}

export class BookSearchApiClient {
  private readonly format: "json" | "xml" = "json";
  private readonly axiosInstance: AxiosInstance;
  private readonly logger: pino.Logger;
  private readonly bookResponseParser: BookResponseParser;

  constructor(format: ResponseFormat = ResponseFormat.JSON) {
    this.format = format;
    this.axiosInstance = axios.create({
      baseURL: "http://api.book-seller-example.com",
    });
    this.logger = pino();
    this.bookResponseParser = new BookResponseParser(format);
  }

  public async getBooksByAuthor(
    authorName: string,
    limit: number
  ): Promise<Book[]> {
    this.logger.info(`Fetching books by author: ${authorName}`);
    return this.executeQuery(QueryEndpoint.AUTHOR, { q: authorName, limit });
  }

  public async getBooksByPublisher(
    publisher: string,
    limit: number
  ): Promise<Book[]> {
    this.logger.info(`Fetching books by publisher: ${publisher}`);
    return this.executeQuery(QueryEndpoint.PUBLISHER, {
      q: publisher,
      limit,
    });
  }

  public async getBooksByYear(year: number, limit: number): Promise<Book[]> {
    this.logger.info(`Fetching books by year: ${year}`);
    return this.executeQuery(QueryEndpoint.YEAR, { year, limit });
  }

  public async getBooksByIsbn(isbn: string): Promise<Book> {
    this.logger.info(`Fetching book by isbn: ${isbn}`);
    const books = await this.executeQuery(QueryEndpoint.ISBN, { isbn });
    return books[0];
  }

  private async executeQuery(
    endpoint: QueryEndpoint,
    params: Omit<QueryParams, "format">
  ): Promise<Book[]> {
    try {
      this.logger.info(
        `Executing query: ${endpoint} with params: ${JSON.stringify(params)}`
      );
      const response: AxiosResponse = await this.axiosInstance(endpoint, {
        params: {
          ...params,
          format: this.format,
        },
      });

      if (response.status === 200) {
        return this.bookResponseParser.parse(response.data);
      } else {
        this.logger.error(
          `Request failed with status code: ${response.status}`
        );
        throw new ApiError(
          `Request failed with status code: ${response.status}`,
          response.status
        );
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        throw new ApiError(
          `Request failed with status code: ${statusCode}`,
          statusCode
        );
      }
      throw error;
    }
  }
}
