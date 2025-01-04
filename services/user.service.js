const { User } = require("../models");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await user.isPasswordMatch(password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  const userObject = user.toObject();
  userObject.token = token;

  return userObject;
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  // Generate reset token
  const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Email configuration
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: user.email,
    subject: "Password Reset Request",
    html: `
        <h1>Password Reset Request</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
  };
  console.log(resetToken);
  // Send email
  await transporter.sendMail(mailOptions);

  return {
    message: "Password reset link sent to email",
    resetToken,
  };
};

const resetPassword = async (resetToken, newPassword) => {
  try {
    // Verify reset token
    const decodedToken = jwt.verify(resetToken, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    console.log(userId);
    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    // Update user's password
    user.password = newPassword;
    await user.save();
    return {
      message: "Password reset successful",
    };
  } catch (error) {
    throw new Error("Invalid or expired reset token");
  }
};
const createUser = async (userBody) => {
  return await User.create(userBody);
};

const getUser = async (id) => {
  return await User.findById(id);
};

const getAllUser = async (limit, skip) => {
  return await User.find().sort({ createdAt: -1 }).limit(limit).skip(skip);
};

const countUser = async () => {
  return await User.countDocuments();
};

const updateUser = async (id, updateBody) => {
  return await User.findByIdAndUpdate(id, updateBody, { new: true });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  loginUser,
  forgotPassword,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  resetPassword,
  getAllUser,
  countUser,
};
