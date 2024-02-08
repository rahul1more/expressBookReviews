
const express = require("express");
const router = express.Router();

let books = {
    "2221": {
        "name": "Things Fall Apart",
        "authorName": "Chinua Achebe",
        "price": "324",
        "reviews": [
            {"userName": "user1", "review": "Excellent book!"},
            {"userName": "user2", "review": "Great work by the author."}
        ]
    },
    "2222": {
        "name": "Mrityimjaya",
        "authorName": "Shivaji Sawant",
        "price": "324",
        "reviews": [
            {"userName": "user3", "review": "A masterpiece."},
            {"userName": "user4", "review": "Must-read for literature enthusiasts."}
        ]
    },
    "2223": {
        "name": "Agni Pankh",
        "authorName": "Apj Abdul Kalaam",
        "price": "324",
        "reviews": [
            {"userName": "user1", "review": "Inspirational."},
            {"userName": "user5", "review": "Highly recommended for everyone."}
        ]
    },
    "2224": {
        "name": "The Lazy Project Manager",
        "authorName": "Peter Taylor",
        "price": "324",
        "reviews": [
            {"userName": "user6", "review": "Practical insights for project management."}
        ]
    }
};

 // module.exports = router;
 module.exports = {
    books,
    router,
};