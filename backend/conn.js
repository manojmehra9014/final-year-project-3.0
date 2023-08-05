const uri = "mongodb+srv://manojmehra9014:fWrMYG2ooazTDFZ7@cluster0.hp03zdh.mongodb.net/?retryWrites=true&w=majority";
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


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://root:YTXhA42TEEErdz0g@cluster0.rrkz1la.mongodb.net/?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("database").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
// // Call the connectToDatabase function
// // connectToDatabase();
