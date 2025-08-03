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
  const [passwordEye, setPasswordEye] = useState("closed");
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
      navigate("/");
    } else {
      setLoginError("Email atau password salah.");
    }
  };

  const handleEye = () => {
    console.log("Eye clicked!");
    console.log(passwordEye);
    setPasswordEye((now) => {
      if (now === "closed") {
        return "opened";
      }
      return "closed";
    });
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
              <div className="flex items-center rounded border border-[#dedede]">
                <input
                  onChange={handlePasswordChange}
                  className="block h-16 w-full px-6 py-2 text-base font-normal focus:outline-none"
                  name="password"
                  type={passwordEye === "closed" ? "password" : "text"}
                  id="password"
                  placeholder="Enter your password"
                />
                {/* <!-- Eye opened --> */}
                {/* <!-- Here we have both opened and closed eye --> */}
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

                {/* <!-- Eye closed --> */}
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
