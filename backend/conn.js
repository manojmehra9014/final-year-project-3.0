const mongoose = require("mongoose");

// mongodb://127.0.0.1:27017

mongoose.connect("mongodb+srv://manojmehra:root123@cluster0.rrkz1la.mongodb.net/", {
  dbName: "backend",
})
  .then(() => console.log("Database connected with login system 3.0"))
  .catch((e) => console.log(e));



// Usage in your Express.js app or serverless function:


// Additional code for your Express.js app

