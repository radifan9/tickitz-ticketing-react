// Get register form
const form = document.querySelector("form");
const emailInputElement = form.querySelector(".user-input");
const passwordInputElement = form.querySelector(".input-password");
const emailErrorMsg = form.querySelector(".emailError");
const passwordErrorMsg = form.querySelector(".passwordError");

// Email condition
let isEmailValid = false;

// Password condition
let isMin8 = false;
let isMinSmall = false;
let isMinLarge = false;
let isMinSpecialChar = false;

// Regex
const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
const regexMin8 = /^.{8,}$/;
const regexMinSmall = /[a-z]/;
const regexMinLarge = /[A-Z]/;
const regexMinSpecialChar = /[!@#$%^&*/()]/;

// Input user
let userPassInput;
let userEmailInput;

// User Data
const user = {};

// Email requirement validation check
const checkEmail = (userEmailInput) => {
  console.log("Event email triggered");

  if (userEmailInput.trim() === "") {
    emailErrorMsg.textContent = "Email tidak boleh kosong";
  }

  if (!emailRegex.test(userEmailInput)) {
    console.log(userEmailInput);
    emailErrorMsg.textContent = "Tolong masukkan input email yang valid";
  } else {
    console.log("Email valid");
    isEmailValid = true;
    console.log({ isEmailValid });
    emailErrorMsg.textContent = "";
  }
};

// Password requirement validation check
const checkPassword = (userPassInput) => {
  isMin8 = regexMin8.test(userPassInput);
  isMinSmall = regexMinSmall.test(userPassInput);
  isMinLarge = regexMinLarge.test(userPassInput);
  isMinSpecialChar = regexMinSpecialChar.test(userPassInput);

  if (isMin8) {
    const min8Msg = document.querySelector(".min8Char");
    min8Msg.textContent = "✅ Minimum 8 characters";
  } else {
    const min8Msg = document.querySelector(".min8Char");
    min8Msg.textContent = "❌ Minimum 8 characters";
  }

  if (isMinSmall) {
    const minSmallMsg = document.querySelector(".min1Small");
    minSmallMsg.textContent = "✅ Minimum 1 small character";
  } else {
    const minSmallMsg = document.querySelector(".min1Small");
    minSmallMsg.textContent = "❌ Minimum 1 small character";
  }

  if (isMinLarge) {
    const minSmallMsg = document.querySelector(".min1Large");
    minSmallMsg.textContent = "✅ Minimum 1 large character";
  } else {
    const minSmallMsg = document.querySelector(".min1Large");
    minSmallMsg.textContent = "❌ Minimum 1 large character";
  }

  if (isMinSpecialChar) {
    const minSmallMsg = document.querySelector(".min1SpecialChar");
    minSmallMsg.textContent = "✅ Minimum 1 special character !@#$%^&*/()";
  } else {
    const minSmallMsg = document.querySelector(".min1SpecialChar");
    minSmallMsg.textContent = "❌ Minimum 1 special character !@#$%^&*/()";
  }
};

// Email check on change event
emailInputElement.addEventListener("change", (event) => {
  userEmailInput = event.target.value;
  checkEmail(userEmailInput);
});

// Password check on change  event
passwordInputElement.addEventListener("change", (event) => {
  userPassInput = event.target.value;
  checkPassword(userPassInput);
});

// Event Listener form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.type === "text") {
      userEmailInput = input.value;
    }
    if (input.type === "password") {
      userPassInput = input.value;
    }
  });

  checkEmail(userEmailInput);
  checkPassword(userPassInput);

  if (isEmailValid && isMin8 && isMinSmall && isMinLarge && isMinSpecialChar) {
    Object.assign(user, { email: userEmailInput, password: userPassInput });

    // Show user registered email and password
    console.log("User registered :");
    console.log(user);

    window.localStorage.setItem("user1", JSON.stringify(user));
    window.location.replace("./login.html");
  }
});
