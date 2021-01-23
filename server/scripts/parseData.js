// require("dotenv").config();
// require("./db");

const axios = require("axios");
const fs = require("fs");

axios(
  "https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json"
)
  .then(({ data: books }) => {
    let booksData = books.map((book) => {
      book.name = book.title;
      book.average_rating = parseFloat(book.average_rating)
        ? parseFloat(book.average_rating)
        : 0;

      book.isbn = parseInt(book.isbn) ? parseInt(book.isbn) : 0;
      book.ratings_count = parseInt(book.ratings_count)
        ? parseInt(book.ratings_count)
        : 0;
      book.type = "BOOK";
      delete book.bookID;
      delete book.title;
      return book;
    });
    // console.log(booksData[0]);
    fs.writeFileSync("books.json", JSON.stringify(booksData));
    return booksData;
  })
  .catch((err) => console.log);
