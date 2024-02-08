const express = require("express");
const regd_users = express.Router();
const jwt = require('jsonwebtoken');
const session = require('express-session')
const books = require('./booksdb.js').books;

const app = express();

app.use(express.json());

let users = [];

// Declaring a commnon variable for books access operations
const booksData = Object.values(books);

const doesExist = (username) => {
  let userswithsamename = users.filter((user) => {
    return user.username === username
  });
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
}
const authenticatedUser = (username, password) => {
  // console.log("users : :" + JSON.stringify(users));
  let validusers = users.filter((user) => {
    return (user.username === username && user.password === password)

  });
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
}

const authenticatedUserValue = (username, password) => {
  const user = users.find((user) => user.username === username && user.password === password);
  return !!user;
};
const isAuthenticated = (req, res, next) => {
  const { username, password } = req.body;

  // Check if user is authenticated
  if (authenticatedUserValue(username, password)) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Task 6 : Register New user
regd_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Task 7 : Login as a Registered use
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  //console.log("Username : :" + username);
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    const a = {
      accessToken,
      username
    };
    //console.log("Auth : : " + JSON.stringify(a));
    req.session.authorization = {
      accessToken,
      username
    };
    // req.session.authorization ={"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicGFzc3dvcmQyIiwiaWF0IjoxNzA3Mjg3MDc1LCJleHAiOjE3MDcyOTA2NzV9.RddXUEPjDNeMcd_m6CiA-xzf1YlhE4u9sD5PPl1c0dY","username":"Rahul"};
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

// Task 8: Add/Modify a book review
regd_users.get("/login2", (req, res) => {
  res.send("in customer login");
});

// Task 8: Add/Modify a book review
regd_users.post("/auth/addReview/:ISBNCode", isAuthenticated, (req, res) => {
  const bookId = req.params.ISBNCode;
  const { username, reviewData } = req.body;

  if (!books[bookId]) {
    return res.status(404).json({ error: "Book not found" });
  }

  const existingReviewIndex = books[bookId].reviews.findIndex((r) => r.userName === username);

  if (existingReviewIndex !== -1) {
    // Modify existing review
    books[bookId].reviews[existingReviewIndex].review = reviewData.review;
  } else {
    // Add new review
    books[bookId].reviews.push({ userName: username, review: reviewData.review });
  }

  //res.json({ message: "Review added/modified successfully", "\n Book Details " : books[bookId]});
  res.send({ message: "Review added/modified successfully", "\n Book Details " : books[bookId]});
});

// Task 9: Delete a book review for a specific user
regd_users.delete("/auth/deleteReview/:ISBNCode", isAuthenticated, (req, res) => {
  const bookId = req.params.ISBNCode;
  const username = req.body.username;
  if (!books[bookId]) {
    return res.status(404).json({ error: "Book not found" });
  }

  const existingReviewIndex = books[bookId].reviews.findIndex((r) => r.userName === username);
  if (existingReviewIndex !== -1) {
    // Delete the review
    books[bookId].reviews.splice(existingReviewIndex, 1);
    res.send({ message: "Review deleted successfully", "Book Details" : books[bookId] } );
  } else {
    res.status(404).json({ error: "Review not found" });
  }
});

module.exports = {
  users: users,
  router: regd_users,
};