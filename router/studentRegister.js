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
router.post("/", userController.createUser);

// Route to get all users
router.get("/", userController.getAllUsers);

// Route to get a specific user by ID
router.get("/:id", userController.getUserById);

// Route to update a user by ID
router.put("/:id", userController.updateUserById);

// Route to delete a user by ID
router.delete("/:id", userController.deleteUserById);

// Route to xlxs file import
router.post("/file_import", upload.single("file"), userController.xlsxImport);

module.exports = router;
