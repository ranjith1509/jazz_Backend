const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminRegister"); // Make sure the path is correct

// Endpoint for admin registration
router.post("/api/", adminController.registerAdmin);

// Endpoint for get all admin
router.get("/api/", adminController.getAllAdmin);

// Route to get a specific user by ID
router.get("/api/:id", adminController.getAdminById);

// Route to update a user by ID
router.put("/api/:id", adminController.updateAdminById);

// Endpoint to delete admin
router.delete("/api/:id", adminController.deleteAdminById);

// Endpoint for admin login
router.post("/api/login", adminController.loginAdmin);

// Endpoint for admin logout
router.post("/api/logout/:id", adminController.logoutAdmin);

module.exports = router;
