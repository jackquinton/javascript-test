export enum ResponseFormat {
  JSON = "json",
  XML = "xml",
}

export enum QueryEndpoint {
  AUTHOR = "/by-author",
  PUBLISHER = "/by-publisher",
  YEAR = "/by-year",
  ISBN = "/by-isbn",
}

export interface QueryParams {
  q?: string;
  limit?: number;
  year?: number;
  isbn?: string;
  format: ResponseFormat;
}

export interface BookResponse {
  book: {
    title: string;
    author: string;
    isbn: string;
  };
  stock: {
    quantity: number;
    price: number;
  };
}

export interface XMLBookResponse {
  details: {
    title: string;
    author: string;
    isbn: string;
  };
  stock: {
    quantity: string;
    price: string;
  };
}
