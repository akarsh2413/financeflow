import api from "./api";

// Register
export const registerUser = async (userData) => {
  const response = await api.post(
    "/auth/register",
    userData
  );

  return response.data;
};

// Verify OTP
export const verifyOTP = async (otpData) => {
  const response = await api.post(
    "/auth/verify-otp",
    otpData
  );

  return response.data;
};

// Login
export const loginUser = async (loginData) => {
  const response = await api.post(
    "/auth/login",
    loginData
  );

  return response.data;
};

// Forgot Password
export const forgotPassword = async (emailData) => {
  const response = await api.post(
    "/auth/forgot-password",
    emailData
  );

  return response.data;
};

// Reset Password
export const resetPassword = async (resetData) => {
  const response = await api.post(
    "/auth/reset-password",
    resetData
  );

  return response.data;
};

// Change Password
export const changePassword = async (passwordData) => {
  const response = await api.put(
    "/auth/change-password",
    passwordData
  );

  return response.data;
};

// Update Profile
export const updateProfile = async (profileData) => {
  const response = await api.put(
    "/auth/profile",
    profileData
  );

  return response.data;
};
// Delete Account
export const deleteAccount = async () => {
  const response = await api.delete("/auth/delete-account");
  return response.data;
};