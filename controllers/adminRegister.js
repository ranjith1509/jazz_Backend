const Admin = require("../modal/adminRegister");
const jwt = require("jsonwebtoken");

// Controller function to handle admin registration
const registerAdmin = async (req, res) => {
  try {
    // Extract data from the request body
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });

    // Save the new admin to the database
    const savedAdmin = await newAdmin.save();

    // Respond with the saved admin data
    res.status(201).json(savedAdmin);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAdminById = async (req, res) => {
  try {
    const user = await Admin.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAdminById = async (req, res) => {
  try {
    const updatedUser = await Admin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAdminById = async (req, res) => {
  try {
    const deleteAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!deleteAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAdmin = async (req, res) => {
  try {
    const { page, rows } = req.query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(rows) || 10;
    const skip = (pageNumber - 1) * pageSize;

    // Fetch users with pagination
    const users = await Admin.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(pageSize);

    // Count all documents in the collection
    const totalRecords = await Admin.countDocuments();

    res.status(200).json({
      users,
      totalRecords,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json("Admin not found");
    }

    if (admin.password !== password) {
      return res.status(401).json("Invalid credentials");
    }
    const token = jwt.sign({ adminId: admin._id }, "your-secret-key", {
      expiresIn: "1d",
    });

    res.status(200).json({ data: admin, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logoutAdmin = async (req, res) => {
  if (req.params.id) {
    res.status(200).json({ message: "Logout successful" });
  }
};

module.exports = {
  registerAdmin,
  getAdminById,
  updateAdminById,
  getAllAdmin,
  deleteAdminById,
  loginAdmin,
  logoutAdmin,
};
