import { BookSearchApiClient } from '../services/book/BookSearchApiClient';
import { ResponseFormat } from '../types/api.types';
import { Validators } from '../utils/validators';

async function searchBooks() {
  try {
    const client = new BookSearchApiClient(ResponseFormat.JSON);

    // Search by author
    const shakespeareBooks = await client.getBooksByAuthor("Shakespeare", 10);
    console.log('Shakespeare books:', shakespeareBooks);

    // Search by publisher with input validation
    const limit = 5;
    if (Validators.isValidLimit(limit)) {
      const penguinBooks = await client.getBooksByPublisher("Penguin Books", limit);
      console.log('Penguin books:', penguinBooks);
    }

    // Search by year with validation
    const year = 2023;
    if (Validators.isValidYear(year)) {
      const books2023 = await client.getBooksByYear(year, 20);
      console.log('2023 books:', books2023);
    }

    // Search by ISBN with validation
    const isbn = "1234567890";
    if (Validators.isValidISBN(isbn)) {
      const specificBook = await client.getBooksByIsbn(isbn);
      console.log('Specific book:', specificBook);
    }

  } catch (error) {
    console.error("Error searching books:", error);
  }
}

searchBooks();