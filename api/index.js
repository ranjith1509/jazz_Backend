const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');
const cors = require("cors");
const userRouter = require("../router/studentRegister");
const announcementRouter = require("../router/announcement");
const adminRegister = require("../router/adminRegister");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Use Mongoose for MongoDB connection
mongoose.connect(process.env.MONGO_DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Use MongoClient for MongoDB operations
const client = new MongoClient(process.env.MONGO_DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function addBackendURL() {
  await client.connect();

  const database = client.db('test');
  const adminCollection = database.collection('adminSchema');
  const studentCollection = database.collection('studentSchema');

  const backendURL = 'https://jazzbackend.vercel.app/';

  try {
    await adminCollection.insertOne({ backendURL });
    await studentCollection.insertOne({ backendURL });
    console.log('Backend URL added to MongoDB');
  } catch (error) {
    console.error('Error adding backend URL to MongoDB:', error);
  } finally {
    await client.close();
  }
}

// Call the function to add the backend URL
addBackendURL();

// Parse incoming JSON requests
app.use(express.json());

// Use the cors middleware to enable CORS
app.use(cors({
  origin: ["https://jazz-frontend.vercel.app"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send("Hello, World jazzs!");
});

// Use the userRouter for all routes starting with /users
app.use("/users", userRouter);
app.use("/announcement", announcementRouter);
app.use("/admin", adminRegister);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
