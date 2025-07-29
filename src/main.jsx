import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// --- CSS
// import "./index.css";
// @import url(../../styles/globals.css);
import "./styles/globals.css";
// @import url(../../styles/navbar.css);
import "./styles/navbar.css";
// @import url(../../styles/footer.css);
import "./styles/footer.css";

// import "./pages/SignIn/SignIn.css";

import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import HomeMovieList from "./pages/HomeMovieList/HomeMovieList.jsx";

createRoot(document.getElementById("root")).render(
  <>
    {/* <App /> */}
    {/* <Navbar /> */}
    {/* <ProfilePage /> */}
    {/* <SignUp /> */}
    <SignIn />
    {/* <HomeMovieList /> */}
  </>
);
