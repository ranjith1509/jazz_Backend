const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminRegister"); // Make sure the path is correct

// Endpoint for admin registration
router.post("/", adminController.registerAdmin);

// Endpoint for get all admin
router.get("/", adminController.getAllAdmin);

// Route to get a specific user by ID
router.get("/:id", adminController.getAdminById);

// Route to update a user by ID
router.put("/:id", adminController.updateAdminById);

// Endpoint to delete admin
router.delete("/:id", adminController.deleteAdminById);

// Endpoint for admin login
// router.post("/login", adminController.loginAdmin);

// Endpoint for admin logout
router.post("/logout/:id", adminController.logoutAdmin);

module.exports = router;
