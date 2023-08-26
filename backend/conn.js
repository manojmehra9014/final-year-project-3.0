const { MongoClient } = require('mongodb');
async function connectToMongoDB() {
  const uri = "mongodb+srv://manojmehra:root123@cluster0.rrkz1la.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();

    // Access a specific database and collection
    // const database = client.db('your-database-name');
    // const collection = database.collection('your-collection-name');

    // Perform database operations here
    // For example, you can insert a document:
    // await collection.insertOne({ key: 'value' });

    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();
