import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// Component
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Pages
import SignUp from "./pages/SignUp/SignUp.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import HomeMovieList from "./pages/HomeMovieList/HomeMovieList.jsx";
import OtherHome from "./pages/OtherHome.jsx";
import Subscribe from "./components/Subscribe.jsx";
import Order from "./pages/Order/Order.jsx";
import Home from "./pages/Home/Home.jsx";

function RouterPages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RouteHomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="movies" element={<HomeMovieList />} />
          <Route path="order" element={<Order />} />
          <Route path="other" element={<OtherHome />} />
        </Route>

        <Route element={<RouteAuthLayout />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function RouteHomeLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Subscribe />
      <Footer />
    </>
  );
}

function RouteAuthLayout() {
  return <Outlet />;
}

export default RouterPages;
