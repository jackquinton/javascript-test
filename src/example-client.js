const BookSearchApiClient = require("./BookSearchApiClient.ts");

const client = new BookSearchApiClient();

async function searchBooks() {
  try {
    // Search by author
    const shakespeareBooks = await client.getBooksByAuthor("Shakespeare", 10);
    
    // Search by publisher
    const penguinBooks = await client.getBooksByPublisher("Penguin Books", 5);
    
    // Search by year
    const books2023 = await client.getBooksByYear(2023, 20);
    
    // Search by ISBN
    const specificBook = await client.getBooksByIsbn("1234567890");
    
  } catch (error) {
    console.error("Error searching books:", error);
  }
}

searchBooks();
