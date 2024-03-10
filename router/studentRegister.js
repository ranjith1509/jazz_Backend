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
router.post("https://jazz-backend-six.vercel.app/", userController.createUser);

// Route to get all users
router.get("https://jazz-backend-six.vercel.app/", userController.getAllUsers);

// Route to get a specific user by ID
router.get("https://jazz-backend-six.vercel.app/:id", userController.getUserById);

// Route to update a user by ID
router.put("https://jazz-backend-six.vercel.app/:id", userController.updateUserById);

// Route to delete a user by ID
router.delete("https://jazz-backend-six.vercel.app/:id", userController.deleteUserById);

// Route to xlxs file import
router.post("https://jazz-backend-six.vercel.app/file_import", upload.single("file"), userController.xlsxImport);

module.exports = router;
