import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

// Regex for validation
const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
const regexMin8 = /^.{8,}$/;
const regexMinSmall = /[a-z]/;
const regexMinLarge = /[A-Z]/;
const regexMinSpecialChar = /[!@#$%^&*/()]/;

export default function SignUp() {
  // const isCheckedTermsCon = false;
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

  // Hooks
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

  // If there's no error
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !emailError &&
      passwordErrors.isMin8 &&
      passwordErrors.isMinSmall &&
      passwordErrors.isMinLarge &&
      passwordErrors.isMinSpecial
    ) {
      localStorage.setItem("user1", JSON.stringify({ email, password }));
      // window.location.replace("./login.html");
      navigate("/signin");
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

        <main className="z-2 mx-auto flex w-[546px] flex-col gap-6 rounded-lg bg-white px-8 pt-12 md:p-12 md:pt-4">
          {/* Step */}
          <div className="my-8 hidden items-center justify-center gap-6 md:flex">
            <span className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-white">
                1
              </div>
              <p className="whitespace-nowrap text-[#4E4B66]">Fill Form</p>
            </span>
            <span className="w-16 border-b border-dashed border-[#a0a3bd]"></span>
            <span className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#a0a3bd] text-white">
                2
              </div>
              <p className="whitespace-nowrap text-[#a0a3bd]">Activate</p>
            </span>
            <span className="w-16 border-b border-dashed border-[#a0a3bd]"></span>
            <span className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#a0a3bd] text-white">
                3
              </div>
              <p className="whitespace-nowrap text-[#a0a3bd]">Done</p>
            </span>
          </div>

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

            {/* Terms & Conditions */}
            <div className="flex items-center gap-3">
              <input
                name="tAndC"
                id="tAndC"
                type="checkbox"
                className="h-6 w-6"
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
              className="block h-16 w-full rounded border-none bg-blue-700 text-base font-semibold text-white"
            >
              Join For Free Now
            </button>
          </form>

          <div className="flex justify-center gap-2 text-base">
            <span className="text-[#6E7191]">Already have an account?</span>
            {/* <a
              href="./login.html"
              className="font-semibold text-blue-700 hover:underline"
            >
              Log in
            </a> */}
            <Link to="/signin">Log in</Link>
          </div>

          <div className="flex items-center justify-center gap-6">
            <span className="w-full border-b border-[#a0a3bd]"></span>
            <span className="text-xs text-[#a0a3bd]">Or</span>
            <span className="w-full border-b border-[#a0a3bd]"></span>
          </div>

          {/* Login using other method */}
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
