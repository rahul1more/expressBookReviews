const express = require("express");
const public_users = express.Router();
const books = require("./booksdb.js").books;
const axios = require('axios');

const app = express();

app.use(express.json());

// Declaring a commnon variable for books access operations
const booksData = Object.values(books);

// Task 1 : Get the book list available in the shop
public_users.get("/allBooks", (req, res) => {
    res.send("All Available books : " + JSON.stringify(books));
    // res.json(books);
});

// Task 2 : Get the books based on ISBN
public_users.get("/isbn/:ISBNCode", (req, res) => {
    const ISBNCode = req.params.ISBNCode;
    const book = books[ISBNCode];
    if (book) {
        res.send("Books By ISBN Code :: " + ISBNCode + " : " + JSON.stringify(book));
    } else {
        res.status(404).send("Book not found with ISBN Code :: " + ISBNCode);
    }
});

// Task 3 : Get all books by Author
public_users.get("/author/:authorName", (req, res) => {
    const authorName = req.params.authorName;
    let booksByAuthorName = booksData.filter(book => book.authorName === authorName);
    res.send("Books By Author Name :: " + JSON.stringify(booksByAuthorName));
});

// Task 4 : Get all books based on Title
public_users.get("/title/:title", (req, res) => {
    const title = req.params.title;
    let booksByTitle = booksData.filter(book => book.name === title);
    res.send("Books By Title Name :: " + JSON.stringify(booksByTitle));
});

// Task 5 : Get book Review
public_users.get("/review/:ISBNCode", (req, res) => {
    const isbnCode = req.params.ISBNCode;
    let booksReviews = books[isbnCode];
    res.send("Books Review By Title Name :: " + JSON.stringify(booksReviews));
});

public_users.post("/addBook", (req, res)=> {
    if(req.body.ISBNCode){
        books[req.body.ISBNCode] = {
            "name": req.body.name,
            "authorName": req.body.authorName,
            "price": req.body.price,
            "reviews": req.body.reviews
        }
    }
    res.send("The Book"+(" ")+ (req.body.name) + "Has Been Added");
});

// Node.JS program with 4 methods: 
// Use Async/Await or Promises with Axios in Node.js for all the four methods.

// Task 10 : Get the book list available in the shop with Async/Await

public_users.get("/getAllBooksList", async (req, res)=>{
    try {
    // res.send("All Available books : "+ JSON.stringify(books));
    const getAllBooksAsync = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(books);
        }, 1000); // Simulating a delay of 1 second
      });
    };
  
    // Use async/await to wait for the asynchronous operation to complete
    const allBooks = await getAllBooksAsync();
    res.json({ books: allBooks });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
  });

  // Task 11: Search by ISBN - Using Promises with Async/Await and axios
  public_users.get("/isbnAsync/:ISBNCodeValue", async (req, res) => {
    const ISBNCode = req.params.ISBNCodeValue;

    axios.get(`http://localhost:3000/isbn/${ISBNCode}`)
      .then(response => {
        const bookDetails = response.data;
        res.json({ book: bookDetails });
      })
      .catch(error => {
        console.error("Error searching by ISBN:", error.message);
        res.status(404).json({ error: "Book not found" });
      });
  });

// Task 12: Search by Author - Using Promises with Async/Await and axios
public_users.get("/authorAsync/:author", async (req, res) => {
    const authorName = req.params.author;
  
    try {
      const response = await axios.get(`http://localhost:3000/author/${authorName}`);
      const bookDetails = response.data;
      res.json({ book: bookDetails });
    } catch (error) {
      console.error("Error searching by Author:", error.message);
      res.status(404).json({ error: "Book not found" });
    }
  });
  
  // Task 13: Search by Title - Using Promises with Async/Await and axios
  public_users.get("/titleAsync/:name", async (req, res) => {
    const name = req.params.name;
  
    try {
      const response = await axios.get(`http://localhost:3000/title/${name}`);
      const bookDetails = response.data;
      res.json({ book: bookDetails });
    } catch (error) {
      console.error("Error searching by Title:", error.message);
      res.status(404).json({ error: "Book not found" });
    }
  });

// Mount the router on the /books path
app.use("/books", public_users);
// Export the app for testing
module.exports = public_users;
