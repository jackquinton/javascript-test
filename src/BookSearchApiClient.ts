import axios, { AxiosInstance } from "axios";
import { Book } from "./types";

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
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "application/xml");
      const books: Book[] = [];
      xmlDoc.documentElement.childNodes.forEach((item: any) => {
        const book = {
          title: item.childNodes[0].childNodes[0].nodeValue,
          author: item.childNodes[0].childNodes[1].nodeValue,
          isbn: item.childNodes[0].childNodes[2].nodeValue,
          quantity: Number(item.childNodes[1].childNodes[0].nodeValue),
          price: Number(item.childNodes[1].childNodes[1].nodeValue),
        };
        books.push(book);
      });
      return books;
    } else {
      throw new Error(`Unsupported format: ${this.format}`);
    }
  }
}

// BookSearchApiClient.prototype.getBooksByAuthor = function (authorName, limit) {
//   var result = [];
//   var xhr = new XMLHttpRequest();
//   xhr.open(
//     "GET",
//     "http://api.book-seller-example.com/by-author?q=" +
//       authorName +
//       "&limit=" +
//       limit +
//       "&format=" +
//       this.format
//   );

//   xhr.onload = function () {
//     if (xhr.status == 200) {
//       if (this.format == "json") {
//         var json = JSON.parse(xhr.responseText);

//         result = json.map(function (item) {
//           return {
//             title: item.book.title,
//             author: item.book.author,
//             isbn: item.book.isbn,
//             quantity: item.stock.quantity,
//             price: item.stock.price,
//           };
//         });
//       } else if (this.format == "xml") {
//         var xml = xhr.responseXML;

//         result = xml.documentElement.childNodes.map(function (item) {
//           return {
//             title: item.childNodes[0].childNodes[0].nodeValue,
//             author: item.childNodes[0].childNodes[1].nodeValue,
//             isbn: item.childNodes[0].childNodes[2].nodeValue,
//             quantity: item.childNodes[1].childNodes[0].nodeValue,
//             price: item.childNodes[1].childNodes[1].nodeValue,
//           };
//         });
//       }

//       return result;
//     } else {
//       alert("Request failed.  Returned status of " + xhr.status);
//     }
//   };
//   xhr.send();
// };
