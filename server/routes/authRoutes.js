const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  verifyOTP,
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile,
  deleteAccount,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.delete(
  "/delete-account",
  protect,
  deleteAccount
);
router.put(
  "/change-password",
  protect,
  changePassword
);

router.put(
  "/profile",
  protect,
  updateProfile
);

module.exports = router;