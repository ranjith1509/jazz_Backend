const User = require("../modal/studentRegister");
require("dotenv").config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // replace with your email
    pass: process.env.EMAIL_PASS, // replace with your email password or use app-specific password
  },
});

const getAllUsers = async (req, res) => {
  try {
    const { page, rows } = req.query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(rows) || 10;
    const skip = (pageNumber - 1) * pageSize;
    const { arrears_count, percentage, department } = req.body;

    const filter = {};
    if (arrears_count) {
      filter.arrears_count = { $lte: arrears_count };
    }
    if (percentage) {
      filter.percentage = { $gte: parseInt(percentage) };
    }

    if (department) {
      filter.department = new RegExp(department, "i");
    }

    const users = await User.find(filter)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(pageSize);
    const totalRecords = await User.countDocuments(filter);

    res.status(200).json({
      users,
      totalRecords,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const emailSender = async (req, res) => {
  try {
    const { to, text } = req.body;

    const mailOptions = {
      from: `Naveenkumar <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "Placement Announcement",
      text: text,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

module.exports = {
  getAllUsers,
  emailSender,
};
