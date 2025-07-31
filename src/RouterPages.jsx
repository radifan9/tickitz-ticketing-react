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
import Payment from "./pages/Payment/Payment.jsx";

function RouterPages() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Sign Up and Sign In */}
        <Route element={<RouteAuthLayout />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>

        {/* Home, movies selection */}
        <Route element={<RouteHomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="movies" element={<HomeMovieList />} />
        </Route>

        {/* Order, payment */}
        <Route element={<RouteOrderLayout />}>
          <Route path="order" element={<Order />} />
          <Route path="payment" element={<Payment />} />
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

function RouteOrderLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function RouteAuthLayout() {
  return <Outlet />;
}

export default RouterPages;
