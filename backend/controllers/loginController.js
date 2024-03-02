const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userModel.js");

dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { email: user.email, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "48h",
      }
    );
    res.status(200).json({ message: "Logged in.", token });
  } else {
    res.status(401).json({ message: "Invalid email or password." });
  }
};

const logout = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.status(401).json({ message: "Invalid token" });
        } else {
          // TO DO: Add token to blacklist or revocation list here
          res.status(200).json({ message: "Logged out successfully" });
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Error logging out" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    res.status(400).json({ message: "Email already in use." });
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({ message: "User created." });
  } else {
    res.status(500).json({ message: "Error creating user." });
  }
};

module.exports = { login, logout, register };
