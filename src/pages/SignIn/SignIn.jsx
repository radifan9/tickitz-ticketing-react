import React, { useState } from "react";
import { useNavigate } from "react-router";

const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
const regexMin8 = /^.{8,}$/;
const regexMinSmall = /[a-z]/;
const regexMinLarge = /[A-Z]/;
const regexMinSpecialChar = /[!@#$%^&*/()]/;

export default function SignIn() {
  const [isInputedEmail, setIsInputedEmail] = useState(false);
  const [isInputedPassword, setIsInputedPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({
    isMin8: false,
    isMinSmall: false,
    isMinLarge: false,
    isMinSpecial: false,
  });
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  // Handler functions
  const handleEmailChange = (e) => {
    setIsInputedEmail(true);
    const value = e.target.value;
    setEmail(value);
    if (!value.trim()) {
      setEmailError("Email tidak boleh kosong");
    } else if (!emailRegex.test(value)) {
      setEmailError("Tolong masukkan input email yang valid");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setIsInputedPassword(true);
    const value = e.target.value;
    setPassword(value);
    setPasswordErrors({
      isMin8: regexMin8.test(value),
      isMinSmall: regexMinSmall.test(value),
      isMinLarge: regexMinLarge.test(value),
      isMinSpecial: regexMinSpecialChar.test(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError("");

    // Validation
    if (emailError) return setLoginError(emailError);
    if (
      !passwordErrors.isMin8 ||
      !passwordErrors.isMinSmall ||
      !passwordErrors.isMinLarge ||
      !passwordErrors.isMinSpecial
    ) {
      return setLoginError("Password tidak memenuhi syarat.");
    }

    // Get user from localStorage
    const userLocalStorage = JSON.parse(localStorage.getItem("user1"));
    if (
      userLocalStorage &&
      email === userLocalStorage.email &&
      password === userLocalStorage.password
    ) {
      // Success
      localStorage.setItem("activeUser", JSON.stringify({ email }));
      // window.location.replace("./home.html");
      navigate("/home");
    } else {
      setLoginError("Email atau password salah.");
    }
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

        <main className="z-2 mx-auto flex w-[546px] flex-col gap-6 rounded-lg bg-white px-8 pt-6 md:p-12">
          {/* Welcome Back */}
          <div className="mt-14 flex flex-col gap-4">
            <h1 className="text-3xl font-semibold text-[#14142B]">
              Welcome Back👋
            </h1>
            <p className="text-lg font-normal text-[#A0A3BD]">
              Sign in with your data that you entered during your registration
            </p>
          </div>

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
              />
              <div
                className={`text-sm ${emailError ? "text-red-500" : "text-green-600"}`}
              >
                {isInputedEmail &&
                  (emailError
                    ? "Tolong masukkan input email yang valid"
                    : "Email valid")}
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 text-[#4E4B66]">
              <label className="font-medium" htmlFor="password">
                Password
              </label>
              <input
                onChange={handlePasswordChange}
                className="block h-16 w-full rounded border border-[#dedede] px-6 py-2 text-base font-normal"
                name="password"
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
              />
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

            <div className="flex justify-end gap-2 text-base text-[#1D4ED8]">
              <a href="#" className="hover:underline">
                Forgot your password?
              </a>
            </div>

            <button
              className="block h-16 w-full items-center justify-center rounded border-none bg-blue-700 text-base font-semibold text-white"
              type="submit"
            >
              Login
            </button>
            {loginError && (
              <div className="mt-2 text-center text-red-500">{loginError}</div>
            )}
          </form>

          <div className="flex items-center justify-center gap-6">
            <span className="w-full border-b border-[#a0a3bd]"></span>
            <span className="text-xs text-[#a0a3bd]">Or</span>
            <span className="w-full border-b border-[#a0a3bd]"></span>
          </div>

          <div className="mb-4 flex justify-center gap-12">
            <a
              href="#"
              className="flex items-center gap-5 rounded px-8 py-4 text-[#a0a3bd] shadow-md hover:font-bold"
            >
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="google-logo"
                className="h-6 w-6"
              />
              <span className="hidden md:inline">Google</span>
            </a>

            <a
              href="#"
              className="flex items-center gap-5 rounded px-8 py-4 text-[#a0a3bd] shadow-md hover:font-bold"
            >
              <img
                width="24"
                height="24"
                src="/facebook-circled.png"
                alt="facebook-circled"
                className="h-6 w-6"
              />
              <span className="hidden md:inline">Facebook</span>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
