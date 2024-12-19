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
    const mockData = [
      {
        book: {
          title: "Book Title 1",
          author: "Author Name",
          isbn: "1234567890",
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
        .reply(200, mockData);

      // Act
      const books: Book[] = await client.getBooksByAuthor("Author Name", 1);

      // Assert
      expect(books).toEqual([
        {
          title: "Book Title 1",
          author: "Author Name",
          isbn: "1234567890",
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
            <title>Book Title 1</title>
            <author>Author Name</author>
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
            <title>Book Title 1</title>
            <author>Author Name</author>
            <isbn>1234567890</isbn>
          </details>
          <stock>
            <quantity>10</quantity>
            <price>19.99</price>
          </stock>
        </book>
        <book>
          <details>
            <title>Book Title 2</title>
            <author>Author Name</author>
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
      const books: Book[] = await client.getBooksByAuthor("Author Name", 1);

      // Assert
      expect(books).toEqual([
        {
          title: "Book Title 1",
          author: "Author Name",
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
      const books: Book[] = await client.getBooksByAuthor("Author Name", 2);

      // Assert
      expect(books).toEqual([
        {
          title: "Book Title 1",
          author: "Author Name",
          isbn: "1234567890",
          quantity: 10,
          price: 19.99,
        },
        {
          title: "Book Title 2",
          author: "Author Name",
          isbn: "1234567891",
          quantity: 10,
          price: 19.99,
        },
      ]);
    });
  });
});
