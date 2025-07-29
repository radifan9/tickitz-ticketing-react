import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";

createRoot(document.getElementById("root")).render(
  <>
    {/* <App /> */}
    <Navbar />
    <ProfilePage />
  </>
);
