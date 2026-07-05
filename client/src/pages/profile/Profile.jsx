import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  changePassword,
  updateProfile,
  deleteAccount
} from "../../services/authService";
import toast from "react-hot-toast";


const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [savingProfile, setSavingProfile] = useState(false);
const [changingPassword, setChangingPassword] = useState(false);
const [loggingOut, setLoggingOut] = useState(false);
const [deletingAccount, setDeletingAccount] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = async () => {
    setSavingProfile(true);

    try {
      const res = await updateProfile({
        name: profileData.name,
      });

      localStorage.setItem(
        "user",
        JSON.stringify(res.user)
      );

      toast.success(res.message);

      window.location.reload();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to update profile"
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    setLoggingOut(true);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    toast.success("Logged out successfully!");

    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setChangingPassword(true);

    try {
      const res = await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      toast.success(res.message);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to change password"
      );
    } finally {
      setChangingPassword(false);
    }
  };
  const handleDeleteAccount = async () => {
  try {
    setDeletingAccount(true);

    const res = await deleteAccount();

    toast.success(res.message);

    localStorage.clear();
    sessionStorage.clear();

    navigate("/");

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Failed to delete account"
    );

  } finally {

    setDeletingAccount(false);
    setShowDeleteModal(false);

  }
};
  return (
    <div className="max-w-5xl mx-auto space-y-8">

      <h1 className="text-2xl sm:text-3xl font-bold">
        My Profile
      </h1>

      {/* Profile Card */}

      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">

        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 mb-8 text-center sm:text-left">

          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl sm:text-4xl font-bold flex-shrink-0">
            {profileData.name
              ? profileData.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div className="min-w-0 w-full">

            <h2 className="text-2xl sm:text-3xl font-bold break-words">
              {profileData.name}
            </h2>

            <p className="text-gray-500 text-sm sm:text-lg break-all">
              {profileData.email}
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>

            <label className="block mb-2 font-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              className="w-full border rounded-xl p-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Email
            </label>

            <input
              type="email"
              value={profileData.email}
              readOnly
              className="w-full border rounded-xl p-3 bg-gray-100 cursor-not-allowed"
            />

          </div>

        </div>

        <button
          onClick={handleSaveProfile}
          disabled={savingProfile}
          className="mt-8 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {savingProfile
            ? "Saving..."
            : "Save Changes"}
        </button>

      </div>

      {/* Change Password */}

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-6">
          Change Password
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />

          <button
            type="submit"
            disabled={changingPassword}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {changingPassword
              ? "Updating..."
              : "Update Password"}
          </button>

        </form>

      </div>

      {/* Logout */}

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-4">
          Logout
        </h2>

        <p className="text-gray-500 mb-6">
          Securely logout from your FinanceFlow account.
        </p>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {loggingOut
            ? "Logging out..."
            : "Logout"}
        </button>

      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-200">

  <h2 className="text-2xl font-bold text-red-600 mb-4">
    Delete Account
  </h2>

  <p className="text-gray-500 mb-6">
    Permanently delete your FinanceFlow account.
    This action cannot be undone.
  </p>

  <button
  onClick={() => setShowDeleteModal(true)}
    disabled={deletingAccount}
    className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-xl disabled:opacity-60"
  >
    {deletingAccount
      ? "Deleting..."
      : "Delete My Account"}
  </button>

</div>
{showDeleteModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-[fadeIn_.2s_ease]">

      <div className="flex justify-center mb-4">

        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-3xl">
          ⚠️
        </div>

      </div>

      <h2 className="text-2xl font-bold text-center text-red-600">
        Delete Account?
      </h2>

      <p className="text-gray-500 text-center mt-3">
        This will permanently delete your account,
        transactions, budgets and goals.
      </p>

      <p className="text-center text-red-500 font-medium mt-2">
        This action cannot be undone.
      </p>

      <div className="flex gap-3 mt-8">

        <button
          onClick={() => setShowDeleteModal(false)}
          className="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleDeleteAccount}
          disabled={deletingAccount}
          className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition disabled:opacity-60"
        >
          {deletingAccount
            ? "Deleting..."
            : "Delete"}
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );
};

export default Profile;