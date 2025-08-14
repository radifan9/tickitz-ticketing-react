import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

// --- Component
import { StepOne } from "./StepOne";
import { AuthOtherMethod } from "../AuthOtherMethod";

// --- External libraries
import { toast } from "sonner";

// --- Custom hooks
import useLocalStorage from "../../../hooks/useLocalStorage";

// --- Validation patterns
const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
const regexMin8 = /^.{8,}$/;
const regexMinSmall = /[a-z]/;
const regexMinLarge = /[A-Z]/;
const regexMinSpecialChar = /[!@#$%^&*/()]/;

// --- Utility Functions

/**
 * Generates a unique ID for new users based on existing users
 * @param {Array} existingUsers - Array of existing users
 * @returns {string} - New unique ID as string
 */
const generateId = (existingUsers) => {
  const maxId = Math.max(...existingUsers.map((user) => parseInt(user.id)), 0);
  return (maxId + 1).toString();
};

// Helper function to hash password
const hashPassword = (password) => {
  return `$2b$10$${btoa(password)
    .replace(/[^a-zA-Z0-9]/g, "")
    .substring(0, 22)}==`;
};

// --- Default User Data
const DEFAULT_USERS = [
  {
    id: "1",
    email: "alice@example.com",
    password: "$2b$10$eImiTXuWVxfM37uY4JANjQ==", // This should be properly hashed
    role: "admin",
    full_name: "Admin",
    phone_number: "911",
    created_at: "2025-08-13T14:32:00Z",
    updated_at: "2025-08-13T14:32:00Z",
  },
  {
    id: "2",
    email: "bob@example.com",
    password: "$2b$10$u0a7d.qfG1P3QYvFZUNQpO==", // This should be properly hashed
    role: "user",
    full_name: "Bob The Builder",
    phone_number: "911",
    created_at: "2025-08-13T15:00:00Z",
    updated_at: "2025-08-13T15:00:00Z",
  },
];

// --- MAIN COMPONENT
export default function SignUp() {
  // --- --- State management

  // User data stored in localStorage
  const [users, setUsers] = useLocalStorage("usersDB", () => DEFAULT_USERS);

  // --- --- Form input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // --- --- UI states
  const [isInputedEmail, setIsInputedEmail] = useState(false);
  const [isInputedPassword, setIsInputedPassword] = useState(false);
  const [passwordEye, setPasswordEye] = useState("closed");
  const [isLoading, setIsLoading] = useState(false);

  // --- --- Validation states
  const [emailError, setEmailError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({
    isMin8: false,
    isMinSmall: false,
    isMinLarge: false,
    isMinSpecial: false,
  });

  // --- --- Hooks
  const navigate = useNavigate();

  // --- --- Event handlers

  /**
   * Handles email input changes and validates email format
   * @param {Event} e - Input change event
   */
  const handleEmailChange = (e) => {
    setIsInputedEmail(true);
    const value = e.target.value;
    setEmail(value);

    // Email validation
    if (!value.trim()) {
      setEmailError("Email tidak boleh kosong");
    } else if (!emailRegex.test(value)) {
      setEmailError("Tolong masukkan input email yang valid");
    } else {
      setEmailError("");
    }
  };

  /**
   * Handles password input changes and validates password criteria
   * @param {Event} e - Input change event
   */
  const handlePasswordChange = (e) => {
    setIsInputedPassword(true);
    const value = e.target.value;
    setPassword(value);

    // Password validation against all criteria
    setPasswordErrors({
      isMin8: regexMin8.test(value),
      isMinSmall: regexMinSmall.test(value),
      isMinLarge: regexMinLarge.test(value),
      isMinSpecial: regexMinSpecialChar.test(value),
    });
  };

  /**
   * Checks if email exists and registers new user if not
   * @returns {Promise<boolean>} - Success status of registration
   */
  const checkEmailAndRegister = async () => {
    try {
      setIsLoading(true);

      // Check if email already exists
      const existingUser = users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase(),
      );

      if (existingUser) {
        toast.error("Email sudah terdaftar. Silakan gunakan email lain.");
        setEmailError("Email sudah terdaftar");
        return false;
      }

      // Create new user object
      const newUser = {
        id: generateId(users),
        email: email.toLowerCase(),
        password: hashPassword(password), // Hash the password
        role: "user",
        full_name: "", // You can add a name field to the form if needed
        phone_number: "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Add new user using the useLocalStorage setter
      setUsers([...users, newUser]);

      console.log("New user successfully added:", newUser);
      toast.success("Registrasi berhasil! Silakan login.");
      return true;
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Terjadi kesalahan saat registrasi. Silakan coba lagi.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if terms are agreed to
    if (!agreeToTerms) {
      toast.error("Mohon setujui syarat dan ketentuan terlebih dahulu.");
      return;
    }

    // Check if all validations pass
    if (
      !emailError &&
      passwordErrors.isMin8 &&
      passwordErrors.isMinSmall &&
      passwordErrors.isMinLarge &&
      passwordErrors.isMinSpecial &&
      email &&
      password
    ) {
      const registrationSuccess = await checkEmailAndRegister();

      if (registrationSuccess) {
        navigate("/signin");
      }
    } else {
      toast.error("Mohon lengkapi semua field dengan benar.");
    }
  };

  /**
   * Toggles password visibility
   */
  const handleEye = () => {
    setPasswordEye((now) => {
      if (now === "closed") {
        return "opened";
      }
      return "closed";
    });
  };

  /**
   * Handles terms and conditions checkbox change
   * @param {Event} e - Checkbox change event
   */
  const handleTermsChange = (e) => {
    setAgreeToTerms(e.target.checked);
  };

  return (
    <div className="relative min-h-screen bg-black bg-[url('/avengers.png')] bg-cover bg-top bg-no-repeat pb-16 font-['Mulish',Arial]">
      {/* Masking */}
      <div className="absolute inset-0 z-1 bg-black/40"></div>
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <img
          className="z-2 mt-20"
          src="/tickitz-white.png"
          alt=""
          width="276px"
        />

        <main className="z-2 mx-auto flex w-[546px] flex-col gap-6 rounded-lg bg-white px-8 pt-12 md:p-12 md:pt-4">
          {/* Step */}
          <StepOne />

          {/* Email, Password, Button */}
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="flex flex-col gap-1 text-[#4E4B66]">
              <label className="font-medium" htmlFor="email">
                Email
              </label>
              <input
                onChange={handleEmailChange}
                className="block h-16 w-full rounded border border-[#dedede] px-6 py-2 text-base font-normal"
                name="email"
                type="text"
                id="email"
                placeholder="Enter your email"
                value={email}
                disabled={isLoading}
              />
              <div
                className={`text-sm ${emailError ? "text-red-500" : "text-green-600"}`}
              >
                {isInputedEmail && (emailError ? emailError : "Email valid")}
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 text-[#4E4B66]">
              <label className="font-medium" htmlFor="password">
                Password
              </label>
              <div className="flex items-center rounded border border-[#dedede]">
                <input
                  onChange={handlePasswordChange}
                  className="block h-16 w-full px-6 py-2 text-base font-normal focus:outline-none"
                  name="password"
                  type={passwordEye === "closed" ? "password" : "text"}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  disabled={isLoading}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`opened mr-5 size-6 cursor-pointer ${passwordEye === "closed" ? "hidden" : "inline"}`}
                  onClick={handleEye}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`closed mr-5 size-6 cursor-pointer ${passwordEye === "closed" ? "inline" : "hidden"}`}
                  onClick={handleEye}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </div>

              <div className="text-sm">
                <div
                  className={
                    passwordErrors.isMin8 ? "text-green-600" : "text-red-500"
                  }
                >
                  {isInputedPassword &&
                    (passwordErrors.isMin8
                      ? "✅ Minimum 8 characters"
                      : "❌ Minimum 8 characters")}
                </div>
                <div
                  className={
                    passwordErrors.isMinSmall
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {isInputedPassword &&
                    (passwordErrors.isMinSmall
                      ? "✅ Minimum 1 small character"
                      : "❌ Minimum 1 small character")}
                </div>
                <div
                  className={
                    passwordErrors.isMinLarge
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {isInputedPassword &&
                    (passwordErrors.isMinLarge
                      ? "✅ Minimum 1 large character"
                      : "❌ Minimum 1 large character")}
                </div>
                <div
                  className={
                    passwordErrors.isMinSpecial
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {isInputedPassword &&
                    (passwordErrors.isMinSpecial
                      ? "✅ Minimum 1 special character !@#$%^&*/()"
                      : "❌ Minimum 1 special character !@#$%^&*/()")}
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center gap-3">
              <input
                name="tAndC"
                id="tAndC"
                type="checkbox"
                className="h-6 w-6 accent-[#1D4ED8]"
                checked={agreeToTerms}
                onChange={handleTermsChange}
                disabled={isLoading}
              />
              <label
                htmlFor="tAndC"
                className="text-lg font-normal text-[#696f79]"
              >
                I agree to terms & conditions
              </label>
            </div>

            <button
              type="submit"
              className="block h-16 w-full rounded border-none bg-blue-700 text-base font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Join For Free Now"}
            </button>
          </form>

          <div className="flex justify-center gap-2 text-base">
            <span className="text-[#6E7191]">Already have an account?</span>
            <Link
              to="/signin"
              className="font-semibold text-blue-700 hover:underline"
            >
              Log in
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6">
            <span className="w-full border-b border-[#a0a3bd]"></span>
            <span className="text-xs text-[#a0a3bd]">Or</span>
            <span className="w-full border-b border-[#a0a3bd]"></span>
          </div>

          {/* Login using other method */}
          <AuthOtherMethod />
        </main>
      </div>
    </div>
  );
}
