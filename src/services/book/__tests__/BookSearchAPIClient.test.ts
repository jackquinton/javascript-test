import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BookSearchApiClient } from "../BookSearchApiClient";
import { Book } from "../../../types/book.types";
import { ResponseFormat } from "../../../types/api.types";
import {
  mockSingleBookJSONData,
  mockMultipleBooksJSONData,
  mockSingleBookXmlData,
  mockMultipleBooksXmlData,
} from "./fixtures/bookMocks";

describe("BookSearchApiClient", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  describe("JSON format", () => {
    it("should fetch books in JSON format", async () => {
      // Arrange
      const client = new BookSearchApiClient(ResponseFormat.JSON);
      mock
        .onGet("http://api.book-seller-example.com/by-author")
        .reply(200, mockSingleBookJSONData);

      // Act
      const books: Book[] = await client.getBooksByAuthor("Jack Quinton", 1);

      // Assert
      expect(books).toEqual([
        {
          title: "Jacks First Book",
          author: "Jack Quinton",
          isbn: "1234567890",
          quantity: 10,
          price: 19.99,
        },
      ]);
    });

    it("should fetch multiple books in JSON format", async () => {
      // Arrange
      const client = new BookSearchApiClient(ResponseFormat.JSON);
      mock
        .onGet("http://api.book-seller-example.com/by-author")
        .reply(200, mockMultipleBooksJSONData);

      // Act
      const books: Book[] = await client.getBooksByAuthor("Jack Quinton", 2);

      // Assert
      expect(books).toEqual([
        {
          title: "Jacks First Book",
          author: "Jack Quinton",
          isbn: "1234567890",
          quantity: 10,
          price: 19.99,
        },
        {
          title: "Jacks Second Book",
          author: "Jack Quinton",
          isbn: "1234567891",
          quantity: 10,
          price: 19.99,
        },
      ]);
    });

    it("should fail if the API returns an error", async () => {
      // Arrange
      const client = new BookSearchApiClient(ResponseFormat.JSON);
      mock
        .onGet("http://api.book-seller-example.com/by-author")
        .reply(500, "Internal Server Error");

      // Act
      await expect(client.getBooksByAuthor("Jack Quinton", 1)).rejects.toThrow(
        "Request failed with status code: 500"
      );
    });
  });

  describe("XML format", () => {
    it("should fetch books in XML format", async () => {
      // Arrange
      const client = new BookSearchApiClient(ResponseFormat.XML);

      mock
        .onGet("http://api.book-seller-example.com/by-author")
        .reply(200, mockSingleBookXmlData);

      // Act
      const books: Book[] = await client.getBooksByAuthor("Jack Quinton", 1);

      // Assert
      expect(books).toEqual([
        {
          title: "Jacks First Book",
          author: "Jack Quinton",
          isbn: "1234567890",
          quantity: 10,
          price: 19.99,
        },
      ]);
    });

    it("should fetch multiple books in XML format", async () => {
      // Arrange
      const client = new BookSearchApiClient(ResponseFormat.XML);
      mock
        .onGet("http://api.book-seller-example.com/by-author")
        .reply(200, mockMultipleBooksXmlData);

      // Act
      const books: Book[] = await client.getBooksByAuthor("Jack Quinton", 2);

      // Assert
      expect(books).toEqual([
        {
          title: "Jacks First Book",
          author: "Jack Quinton",
          isbn: "1234567890",
          quantity: 10,
          price: 19.99,
        },
        {
          title: "Jacks Second Book",
          author: "Jack Quinton",
          isbn: "1234567891",
          quantity: 10,
          price: 19.99,
        },
      ]);
    });
  });

  describe("Test different query types", () => {
    it("should fetch by publisher", async () => {
      // Arrange
      const client = new BookSearchApiClient(ResponseFormat.JSON);
      mock
        .onGet("http://api.book-seller-example.com/by-publisher")
        .reply(200, mockSingleBookJSONData);

      // Act
      const books: Book[] = await client.getBooksByPublisher(
        "Penguin Books",
        1
      );

      // Assert
      expect(books).toEqual([
        {
          title: "Jacks First Book",
          author: "Jack Quinton",
          isbn: "1234567890",
          quantity: 10,
          price: 19.99,
        },
      ]);
    });

    it("should fetch by year", async () => {
      // Arrange
      const client = new BookSearchApiClient(ResponseFormat.JSON);
      mock
        .onGet("http://api.book-seller-example.com/by-year")
        .reply(200, mockSingleBookJSONData);

      // Act
      const books: Book[] = await client.getBooksByYear(2023, 1);

      // Assert
      expect(books).toEqual([
        {
          title: "Jacks First Book",
          author: "Jack Quinton",
          isbn: "1234567890",
          quantity: 10,
          price: 19.99,
        },
      ]);
    });

    it("should fetch by isbn", async () => {
      // Arrange
      const client = new BookSearchApiClient(ResponseFormat.JSON);
      mock
        .onGet("http://api.book-seller-example.com/by-isbn")
        .reply(200, mockSingleBookJSONData);

      // Act
      const book: Book = await client.getBooksByIsbn("1234567890");

      // Assert
      expect(book).toEqual({
        title: "Jacks First Book",
        author: "Jack Quinton",
        isbn: "1234567890",
        quantity: 10,
        price: 19.99,
      });
    });
  });
});
