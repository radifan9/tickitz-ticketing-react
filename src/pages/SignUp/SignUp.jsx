import React, { useState } from "react";
import "./SignUp.css";

// Regex for validation
const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
const regexMin8 = /^.{8,}$/;
const regexMinSmall = /[a-z]/;
const regexMinLarge = /[A-Z]/;
const regexMinSpecialChar = /[!@#$%^&*/()]/;

export default function SignUp() {
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
    console.log("Masuk handle submit");
    if (
      !emailError &&
      passwordErrors.isMin8 &&
      passwordErrors.isMinSmall &&
      passwordErrors.isMinLarge &&
      passwordErrors.isMinSpecial
    ) {
      // Save to localStorage
      console.log("✅ Register succesful!");
      console.log({ email, password });
      localStorage.setItem("user1", JSON.stringify({ email, password }));
      // Redirect or show success
      window.location.replace("./login.html");
    }
  };

  return (
    <>
      <div className="container">
        <div className="logo">
          <img src="/tickitz-white.png" alt="" width="276px" />
        </div>

        <main className="register">
          {/* <!-- Step --> */}
          <div className="steps">
            <span className="outer-steps">
              <div className="steps-num">1</div>
              <p className="steps-text">Fill Form</p>
            </span>
            <span></span>
            <span className="outer-steps">
              <div className="steps-num steps-num-off">2</div>
              <p className="steps-text steps-text-off">Activate</p>
            </span>
            <span></span>
            <span className="outer-steps">
              <div className="steps-num steps-num-off">3</div>
              <p className="steps-text steps-text-off">Done</p>
            </span>
          </div>

          {/* <!-- Email, Password, Button --> */}
          <form className="form-register" onSubmit={handleSubmit}>
            {/* <!-- Email --> */}
            <div>
              <label className="user-label" htmlFor="email">
                Email
              </label>{" "}
              <br />
              <input
                onChange={handleEmailChange}
                className="user-input"
                name="email"
                type="text"
                id="email"
                placeholder="Enter your email"
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

            {/*  Password  */}
            <div>
              <label className="user-label" htmlFor="password">
                Password
              </label>{" "}
              <br />
              <input
                onChange={handlePasswordChange}
                className="user-input input-password"
                name="password"
                type="password"
                id="password"
                placeholder="Enter your password"
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

            {/*  Button & Link  */}
            <div className="container-tAndC">
              <input name="tAndC" id="tAndC" type="checkbox" />
              <label htmlFor="tAndC">I agree to terms & conditions</label>
            </div>

            <button type="submit" className="btn-register">
              Join For Free Now
            </button>
          </form>

          <div className="already-have">
            <span>Already have an account?</span>
            <a href="./login.html">Log in</a>
          </div>

          <div className="or">
            <span></span>
            <span>Or</span>
            <span></span>
          </div>

          {/* <!-- Login using other method --> */}
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
                src="/facebook-circled.png
                "
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
