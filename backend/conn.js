const uri = "mongodb+srv://root:root@cluster0.rrkz1la.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require('mongoose');

mongoose.connect(uri, {
  dbName: "backend",
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  // Additional code for your Express.js app
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
