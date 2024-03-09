const Student = require("../modal/studentRegister");
const path = require("path");
const xlsx = require("xlsx");

// Controller to handle creating a new user
const createUser = async (req, res) => {
  try {
    const newUser = new Student(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to get all users
const getAllUsers = async (req, res) => {
  try {
    const { page, rows } = req.query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(rows) || 10;
    const skip = (pageNumber - 1) * pageSize;

    // Fetch users with pagination
    const users = await Student.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(pageSize);

    // Count all documents in the collection
    const totalRecords = await Student.countDocuments();

    res.status(200).json({
      users,
      totalRecords,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a specific user by ID
const getUserById = async (req, res) => {
  try {
    const user = await Student.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a user by ID
const updateUserById = async (req, res) => {
  try {
    const updatedUser = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await Student.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const xlsxImport = async (req, res) => {
  const xlsxFilePath = path.join(
    __dirname,
    "..",
    "uploads",
    `${req.file.fieldname}-${req.file.originalname}`
  );

  try {
    if (!req.file) {
      return res.status(400).json({ message: "XLSX file is required" });
    }

    const workbook = xlsx.readFile(xlsxFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert worksheet to JSON
    const rows = xlsx.utils.sheet_to_json(worksheet);

    for (const row of rows) {
      const existingUser = await Student.findOne({ email: row.email });

      if (!existingUser) {
        // If the user doesn't exist, create a new entry
        const newUser = new Student(row);
        await newUser.save();
        console.log(`New user with email ${row.email} created.`);
      } else {
        // If the user exists, update the existing entry with new values
        await Student.updateOne({ email: row.email }, { $set: row });
        console.log(`Student with email ${row.email} updated.`);
      }
    }

    res.status(200).json({ message: "XLSX file imported successfully" });
  } catch (error) {
    console.error("Error importing XLSX:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  xlsxImport,
};
