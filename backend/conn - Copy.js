const mongoose = require("mongoose");

// mongodb://127.0.0.1:27017

mongoose.connect("mongodb://127.0.0.1:27017", {
  dbName: "backend",
})
  .then(() => console.log("Database connected with login system 2.0"))
  .catch((e) => console.log(e));

