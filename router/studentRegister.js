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
router.post("/api/", userController.createUser);

// Route to get all users
router.get("/api/", userController.getAllUsers);

// Route to get a specific user by ID
router.get("/api/:id", userController.getUserById);

// Route to update a user by ID
router.put("/api/:id", userController.updateUserById);

// Route to delete a user by ID
router.delete("/api/:id", userController.deleteUserById);

// Route to xlxs file import
router.post("/api/file_import", upload.single("file"), userController.xlsxImport);

module.exports = router;
