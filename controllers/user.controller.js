const { User } = require("../models");
const { userService } = require("../services");
const { validationResult } = require("express-validator");
const pagination = require("express-paginate");
const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);

    res.cookie('token', user.token, {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'strict'
    })
    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: error.message || "Failed to login user" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res.status(400).json({ Errors: Errors.array() });
    }
    const { email } = req.body;
    const user = await userService.forgotPassword(email);
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    res.status(500).json({ error: "User not found" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res.status(400).json({ Errors: Errors.array() });
    }
    const { ResetToken, Password } = req.body;
    const user = await userService.resetPassword(ResetToken, Password);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: error.message || "Failed to reset password" });
  }
};

const createUser = async (req, res) => {
  console.log("create ....");
  try {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res.status(400).json({ Errors: Errors.array() });
    }
    const userExit = await User.findOne({ email: req.body.email });
    if (userExit) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await userService.createUser(req.body);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

const getUser = async (req, res) => {
  try {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res.status(400).json({ Errors: Errors.array() });
    }
    const userId = req.params.id;
    const user = await userService.getUser(userId);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ user: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const skip = req.skip || 0;
    const index = req.query.page || 1;
    const users = await userService.getAllUser(limit, skip);
    const userCount = await userService.countUser();
    const totalPages = Math.ceil(userCount / limit);
    return res.status(200).json({
      users:users,
      pages: pagination.getArrayPages(req)(limit, totalPages, index),
      nextPage: pagination.hasNextPages(req)(totalPages),
      currentPage: index,
      previousPage: index > 1,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: error.message || "Failed to fetch user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res.status(400).json({ Errors: Errors.array() });
    }

    const userId = req.params.id;
    const updatedUser = await userService.updateUser(userId, req.body);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: error.message || "Failed to update user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      return res.status(400).json({ Errors: Errors.array() });
    }
    const userId = req.params.id;
    const deletedUser = await userService.deleteUser(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "User not found" });
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getAllUser
};
