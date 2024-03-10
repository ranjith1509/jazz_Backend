const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminRegister"); // Make sure the path is correct

// Endpoint for admin registration
router.post("https://jazz-backend-six.vercel.app/", adminController.registerAdmin);

// Endpoint for get all admin
router.get("https://jazz-backend-six.vercel.app/", adminController.getAllAdmin);

// Route to get a specific user by ID
router.get("https://jazz-backend-six.vercel.app/:id", adminController.getAdminById);

// Route to update a user by ID
router.put("https://jazz-backend-six.vercel.app/:id", adminController.updateAdminById);

// Endpoint to delete admin
router.delete("https://jazz-backend-six.vercel.app/:id", adminController.deleteAdminById);

// Endpoint for admin login
router.post("https://jazz-backend-six.vercel.app/login", adminController.loginAdmin);

// Endpoint for admin logout
router.post("https://jazz-backend-six.vercel.app/logout/:id", adminController.logoutAdmin);

module.exports = router;
