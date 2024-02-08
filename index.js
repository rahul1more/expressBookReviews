const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes  = require('./router/auth_users.js').router;
const users = require('./router/auth_users.js').users;
const genl_routes = require('./router/general.js');
const books = require("./router/booksdb.js").books;

const app = express();

app.use(express.json());

app.use("/customer", session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer", customer_routes);
app.use("/", genl_routes);

const PORT =3000;  

app.use("/customer/auth/*", function auth(req,res,next){
  const { authorization } = req.session;
  if (authorization && authorization.accessToken) {
    try {
      // Verify the JWT token
      const decoded = jwt.verify(authorization.accessToken, 'access');
      req.user = decoded; // Attach the decoded user information to the request object
      next(); // Proceed to the next middleware
    } catch (error) {
      // If token verification fails, respond with Unauthorized error
      res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    // If no token found, respond with Unauthorized error
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.listen(PORT,()=>console.log("Server is running"));