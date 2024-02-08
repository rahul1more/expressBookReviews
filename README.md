Complementary add new book api : :
POST : http://localhost:3000/addBook {"ISBNCode":"2225","name":"Ramayana","authorName":"Tulsidas","price":"270", "reviews": []}

General users: Task 1: Get the book list available in the shop.- 2 Points http://localhost:3000/allBooks

Task 2: Get the books based on ISBN.- 2 Points http://localhost:3000/isbn/2222

Task 3: Get all books by Author. -2 Points http://localhost:3000/author/Chinua Achebe

Task 4: Get all books based on Title - 2 Points http://localhost:3000/title/Mrityimjaya

Task 5: Get book Review. - 2 Points http://localhost:3000/review/2222

Task 6: Register New user – 3 Points POST : http://localhost:3000/customer/register body : { "username": "Rahul", "password": "password2" }

Task 7: Login as a Registered user - 3 Points POST : http://localhost:3000/customer/login body : { "username": "Rahul", "password": "password2" }

Registered Users: Task 8: Add/Modify a book review. - 2 Points POST : http://localhost:3000/customer/auth/addReview/2225 body : { "username": "Rahul", "password": "password2", "reviewData": { "username": "Rahul", "review": "True Story" } }

Task 9: Delete book review added by that particular user - 2 Points DELETE : http://localhost:3000/customer/auth/deleteReview/2225 body : { "username": "Rahul", "password": "password2" }

Node.JS program with 4 methods:

Use Async/Await or Promises with Axios in Node.js for all the four methods.

Task 10: Get all books – Using async callback function – 2 Points http://localhost:3000/getAllBooksList

Task 11: Search by ISBN – Using Promises – 2 Points http://localhost:3000/isbnAsync/2224

Task 12: Search by Author – 2 Points http://localhost:3000/authorAsync/Peter Taylor

Task 13: Search by Title - 2 Points http://localhost:3000/titleAsync/The Lazy Project Manager

Task 14: Submission of Project GitHub Link - 2 Points Submitted project on github
