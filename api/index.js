const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware
const userRouter = require("../router/studentRegister");
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
app.use(cors());
app.use(cors({
  origin: ["https://jazz-frontend.vercel.app"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send("Hello, World jazzs!");
});


// Use the userRouter for all routes starting with /users
// app.use("/users", userRouter);
app.use("/announcement", announcementRouter);
// app.use("/admin", adminRegister);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "uploads/", // Destination directory for uploaded files
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${file.originalname}`);
  },
});
var upload = multer({ storage });
const userController = require("../controllers/studentRegister");

// Route to create a new user
router.post("/users/", userController.createUser);

// Route to get all users
router.get("/users/", userController.getAllUsers);

// Route to get a specific user by ID
router.get("/users/:id", userController.getUserById);

// Route to update a user by ID
router.put("/users/:id", userController.updateUserById);

// Route to delete a user by ID
router.delete("/users/:id", userController.deleteUserById);

// Route to xlxs file import
router.post("/users/file_import", upload.single("file"), userController.xlsxImport);

module.exports = router;


const express = require("express");
const adminController = require("../controllers/adminRegister"); // Make sure the path is correct

// Endpoint for admin registration
router.post("/admin/", adminController.registerAdmin);

// Endpoint for get all admin
router.get("/admin/", adminController.getAllAdmin);

// Route to get a specific user by ID
router.get("/admin/:id", adminController.getAdminById);

// Route to update a user by ID
router.put("/admin/:id", adminController.updateAdminById);

// Endpoint to delete admin
router.delete("/admin/:id", adminController.deleteAdminById);

// Endpoint for admin login
router.post("/admin/login", adminController.loginAdmin);

// Endpoint for admin logout
router.post("/admin/logout/:id", adminController.logoutAdmin);

module.exports = router;
