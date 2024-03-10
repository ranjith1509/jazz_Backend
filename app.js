const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./router/studentRegister");
const announcementRouter = require("./router/announcement");
const adminRegister = require("./router/adminRegister");


require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000; // Or any other default port you prefer


// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Parse incoming JSON requests
app.use(express.json());

// Use the cors middleware to enable CORS
app.get("/", (req, res) => {
  res.send("Hello, World jazz!");
});


// Use the userRouter for all routes starting with /users
app.use("/users", userRouter);
app.use("/announcement", announcementRouter);
app.use("/admin", adminRegister);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
