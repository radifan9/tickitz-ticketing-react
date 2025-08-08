import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// Component
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Auth
import PrivateRoute from "./utils/PrivateRoute.jsx";

// Pages
import SignUp from "./pages/SignUp/SignUp.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import HomeMovieList from "./pages/HomeMovieList/HomeMovieList.jsx";
import OtherHome from "./pages/OtherHome.jsx";
import Subscribe from "./components/Subscribe.jsx";
import Order from "./pages/Order/Order.jsx";
import Home from "./pages/Home/Home.jsx";
import Payment from "./pages/Payment/Payment.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Details from "./pages/Details/Details.jsx";
import Result from "./pages/Result/Result.jsx";

function RouterPages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="">
          {/* Home, movies selection */}
          <Route element={<RouteHomeLayout />}>
            <Route index element={<Home />} />
            <Route>
              <Route path="movies" element={<HomeMovieList />} />
              <Route path="details" element={<Details />} />
            </Route>
          </Route>

          {/* Sign Up and Sign In */}
          <Route element={<RouteAuthLayout />}>
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
          </Route>

          {/* Order, payment */}
          <Route element={<RouteOrderLayout />}>
            <Route path="order" element={<Order />} />
            <Route path="payment" element={<Payment />} />
          </Route>

          {/* Ticket Result */}
          <Route element={<RouteResultLayout />}>
            <Route path="result" element={<Result />} />
          </Route>

          {/* User Profile, Settings */}
          <Route element={<RouteProfile />}>
            {/* <PrivateRoute redirectTo={<SignIn />}> */}
            <Route path="profile" element={<Profile />} />
            {/* </PrivateRoute> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function RouteHomeLayout() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <div className="flex flex-col gap-8 px-8">
        <Outlet />
        <Subscribe />
        <Footer />
      </div>
    </main>
  );
}

function RouteOrderLayout() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-[#A0A3BD33] px-8 py-4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

function RouteResultLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function RouteProfile() {
  return (
    <>
      <Navbar />

      <div className="bg-[#f5f6f8]">
        <Outlet />
      </div>
    </>
  );
}

function RouteAuthLayout() {
  return <Outlet />;
}

export default RouterPages;
