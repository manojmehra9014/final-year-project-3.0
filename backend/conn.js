const mongoose = require("mongoose");

//local host =>  mongodb://127.0.0.1:27017
//cloud => mongodb+srv://manojmehra:root123@cluster0.rrkz1la.mongodb.net/


mongoose.connect("mongodb+srv://manojmehra:root123@cluster0.rrkz1la.mongodb.net/", {
  dbName: "backend",
})
  .then(() => console.log("Database connected with Cloud Cluster !"))
  .catch((e) => console.log("Check your internet connection\n", e))
