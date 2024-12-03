const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth=require('../middleware/auth');
const nodemailer = require("nodemailer");
const otp = Math.floor(1000 + Math.random() * 9000);

const signup = async (req, res) => {
  const { name, email, password, country, state } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, country,state });
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "72h" });
    
    sendEmail(email, otp);
    res.status(201).json({ message: "User created successfully", user, token, id: user._id, otp });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "72h" });

    // Send the token and user details (if needed) to the frontend
    res.status(200).json({ 
      message: "Login successful", 
      token, 
      user: { id: user._id, name: user.name, email: user.email, country: user.country, state: user.state ,bio:user.bio }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updatedetails = async (req, res) => {
  const { name, email, country, state, bio } = req.body;
  // Validate request body
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  try {
    // Update user details in the database
    const user = await User.findByIdAndUpdate(
      req.user.userId, // User ID from authentication middleware
      { name, email, country, state, bio },
      { new: true } // Return updated document
    );
    
    console.log("User details updated:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User details updated successfully", user });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};


const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  logger: true,
  debug: true,
  secureConnection: false,
  auth: {
   user: 'akshideveloper@gmail.com',
   pass: 'hslbodzctvyvyvry'
  },
  tls: {
    rejectUnauthorized: false,
   },

 });

 const sendEmail = (email, token) => {
  const mailOptions = {
   from: 'akshideveloper@gmail.com',
   to: email,
   subject: 'Email verification',
      html: `<h1>Email Verification</h1>
      <h2>Hello User</h2>
      <p>Thanks for registering into our website</p>
      <p>Please enter this OTP to verify your email</p>
      <h1>${token}</h1>
      </div>`,
 };

 transporter.sendMail(mailOptions, function (error, info) {
   if (error) {
     console.log('Error in sending email  ' + error);
     return true;
   } else {
    console.log('Email sent: ' + info.response);
    return false;
   }
  });
 };

  const resendotp = async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User .findOne({
        email,
      });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      sendEmail(email, otp);
      res.status(200).json({ message: "OTP sent successfully", otp });
    }
    catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
    
  };



 const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Email received for verification:", email); // Debugging log
    const user = await User.findOneAndUpdate(
      { email },
      { verified: true },
      { new: true } // Return the updated document
    );
    if (user) {
      console.log("User after update:", user); // Log updated user
      res.status(200).json({ message: "Email verified successfully" });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error in verifyEmail:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




module.exports = { signup, login ,updatedetails,verifyEmail,resendotp};
