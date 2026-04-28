import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js"; // Sequelize User model
import { sendOtpEmail } from "../utils/sendOtp.js"; // helper to send OTP via email

// ---------------- SIGNUP ----------------
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "viewer"
    });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await user.update({ otp, otpExpiry: expiry });

    try {
      await sendOtpEmail(email, otp);
    } catch (err) {
      console.error("OTP email failed:", err);
    }

    return res.json({ success: true, message: "Signup successful. Verify OTP sent to email." });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------- LOGIN (Step 1: Password) ----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ success: false, message: "Invalid credentials" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.update({ otp, otpExpiry: expiry });

    try {
      await sendOtpEmail(email, otp);
    } catch (err) {
      console.error("OTP email failed:", err);
    }

    return res.json({ success: true, message: "Password verified. OTP sent to email." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------- VERIFY OTP (Step 2) ----------------
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    if (user.otp !== otp || Date.now() > new Date(user.otpExpiry).getTime()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    await user.update({ otp: null, otpExpiry: null });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ success: true, message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------- ADMIN LOGIN ----------------
export const adminLogin = async (req, res) => {
  try {
    const { user, pass } = req.body;

    if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) {
      return res.json({ success: true, message: "Admin login successful" });
    }

    res.status(400).json({ success: false, message: "Invalid admin credentials" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
