import React, { useState } from "react";
import "./SignIn.css";

// Regex for validation
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
      window.location.replace("./home.html");
    } else {
      setLoginError("Email atau password salah.");
    }
  };

  return (
    <>
      <div className="main-page body-sign-in">
        <div className="logo">
          <img src="/tickitz-white.png" alt="" width="276px" />
        </div>

        <main className="register">
          <div className="welcome-screen">
            <h1>Welcome Back👋</h1>
            <p>
              Sign in with your data that you entered during your registration
            </p>
          </div>

          <form className="form-register" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="user-label" htmlFor="email">
                Email
              </label>
              <br />
              <input
                onChange={handleEmailChange}
                className="user-input"
                name="email"
                type="text"
                id="email"
                placeholder="Enter your email"
                value={email}
              />
              <div
                className="emailError"
                style={emailError ? { color: "red" } : { color: "green" }}
              >
                {isInputedEmail &&
                  (emailError
                    ? "Tolong masukkan input email yang valid"
                    : "Email valid")}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="user-label" htmlFor="password">
                Password
              </label>
              <br />
              <input
                onChange={handlePasswordChange}
                className="user-input input-password"
                name="password"
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
              />
              <div className="passwordError">
                <div className="min8Char">
                  {isInputedPassword &&
                    (passwordErrors.isMin8
                      ? "✅ Minimum 8 characters"
                      : "❌ Minimum 8 characters")}
                </div>
                <div className="min1Small">
                  {isInputedPassword &&
                    (passwordErrors.isMinSmall
                      ? "✅ Minimum 1 small character"
                      : "❌ Minimum 1 small character")}
                </div>
                <div className="min1Large">
                  {isInputedPassword &&
                    (passwordErrors.isMinLarge
                      ? "✅ Minimum 1 large character"
                      : "❌ Minimum 1 large character")}
                </div>
                <div className="min1SpecialChar">
                  {isInputedPassword &&
                    (passwordErrors.isMinSpecial
                      ? "✅ Minimum 1 special character !@#$%^&*/()"
                      : "❌ Minimum 1 special character !@#$%^&*/()")}
                </div>
              </div>
            </div>

            <div className="already-have">
              <a href="#">Forgot your password?</a>
            </div>

            <button className="btn-register btn-login" type="submit">
              Login
            </button>
            {loginError && (
              <div style={{ color: "red", marginTop: "10px" }}>
                {loginError}
              </div>
            )}
          </form>

          <div className="or">
            <span></span>
            <span>Or</span>
            <span></span>
          </div>

          <div className="login-other">
            <a href="#" className="login-method">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="google-logo"
                className="login-icon"
              />
              <span>Google</span>
            </a>

            <a href="#" className="login-method">
              <img
                width="48"
                height="48"
                src="/facebook-circled.png"
                alt="facebook-circled"
                className="login-icon"
              />
              <span>Facebook</span>
            </a>
          </div>
        </main>
      </div>
    </>
  );
}
