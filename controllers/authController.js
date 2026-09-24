import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    console.log("🔍 Checking if user exists:", email, "=>", userExists); // Debug

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Basic validation
    if (!name || !email || !password) {
      console.log("⚠️ Missing fields:", { name, email, password }); // Debug
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      console.log("⚠️ Password too short:", password); // Debug
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
    });
    console.log("✅ User registered:", user); // Debug

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    console.error("❌ Register error:", error); // Debug
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("🔑 Login attempt:", { email, password });

    const user = await User.findOne({ email });
    console.log("🔍 User found:", user);

    if (user) {
      console.log("🔑 Stored hash:", user.password);
      const isMatch = await user.matchPassword(password);
      console.log("✅ Password match result:", isMatch);

      if (isMatch) {
        console.log("🎉 Login successful for:", user.email);
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id, user.role),
        });
      }
    }

    console.log("❌ Login failed for:", email);
    res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
