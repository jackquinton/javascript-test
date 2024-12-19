import { BookSearchApiClient } from "./services/book/BookSearchApiClient";
import { ResponseFormat } from "./types/api.types";
import { Book } from "./types/book.types";
import { Validators } from "./utils/validators";

async function searchBooks(): Promise<void> {
  try {
    const client = new BookSearchApiClient(ResponseFormat.JSON);

    // Search by author
    const shakespeareBooks: Book[] = await client.getBooksByAuthor(
      "Shakespeare",
      10
    );
    console.log("Shakespeare books:", shakespeareBooks);

    // Search by publisher with input validation
    const limit = 5;
    if (Validators.isValidLimit(limit)) {
      const penguinBooks: Book[] = await client.getBooksByPublisher(
        "Penguin Books",
        limit
      );
      console.log("Penguin books:", penguinBooks);
    }

    // Search by year with validation
    const year = 2023;
    if (Validators.isValidYear(year)) {
      const books2023: Book[] = await client.getBooksByYear(year, 20);
      console.log("2023 books:", books2023);
    }

    // Search by ISBN with validation
    const isbn = "1234567890";
    if (Validators.isValidISBN(isbn)) {
      const specificBook: Book = await client.getBooksByIsbn(isbn);
      console.log("Specific book:", specificBook);
    }
  } catch (error) {
    console.error("Error searching books:", error);
  }
}

searchBooks();
