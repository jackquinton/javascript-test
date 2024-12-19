import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BookSearchApiClient } from "../BookSearchApiClient";
import { Book } from "../types";

describe("BookSearchApiClient", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  describe("JSON format", () => {
    // Mock data for JSON format
    const mockSingleBookJSONData = [
      {
        book: {
          title: "Jacks First Book",
          author: "Jack Quinton",
          isbn: "1234567890",
        },
        stock: {
          quantity: 10,
          price: 19.99,
        },
      },
    ];

    const mockMultipleBooksJSONData = [
      {
        book: {
          title: "Jacks First Book",
          author: "Jack Quinton",
          isbn: "1234567890",
        },
        stock: {
          quantity: 10,
          price: 19.99,
        },
      },
      {
        book: {
          title: "Jacks Second Book",
          author: "Jack Quinton",
          isbn: "1234567891",
        },
        stock: {
          quantity: 10,
          price: 19.99,
        },
      },
    ];

    it("should fetch books in JSON format", async () => {
      // Arrange
      const client = new BookSearchApiClient("json");
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
      const client = new BookSearchApiClient("json");
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
  });

  describe("XML format", () => {
    // Mock data for XML format
    const mockSingleBookXmlData = `
      <books>
        <book>
          <details>
            <title>Jacks First Book</title>
            <author>Jack Quinton</author>
            <isbn>1234567890</isbn>
          </details>
          <stock>
            <quantity>10</quantity>
            <price>19.99</price>
          </stock>
        </book>
      </books>
    `;

    const mockMultipleBooksXmlData = `
      <books>
        <book>
          <details>
            <title>Jacks First Book</title>
            <author>Jack Quinton</author>
            <isbn>1234567890</isbn>
          </details>
          <stock>
            <quantity>10</quantity>
            <price>19.99</price>
          </stock>
        </book>
        <book>
          <details>
            <title>Jacks Second Book</title>
            <author>Jack Quinton</author>
            <isbn>1234567891</isbn>
          </details>
          <stock>
            <quantity>10</quantity>
            <price>19.99</price>
          </stock>
        </book>
      </books>
    `;

    it("should fetch books in XML format", async () => {
      // Arrange
      const client = new BookSearchApiClient("xml");

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
      const client = new BookSearchApiClient("xml");
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
});
