export const mockSingleBookJSONData = [
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

export const mockMultipleBooksJSONData = [
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

export const mockSingleBookXmlData = `
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

export const mockMultipleBooksXmlData = `
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
