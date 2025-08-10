import { BrowserRouter, Routes, Route, Outlet } from "react-router";

// Component
import Navbar from "./components/Navbar.jsx";
import NavbarAdmin from "./components/NavbarAdmin.jsx";

import Footer from "./components/Footer.jsx";

// Auth
import PrivateRoute from "./utils/PrivateRoute.jsx";

// Pages
import SignUp from "./pages/Auth/SignUp/SignUp.jsx";
import SignIn from "./pages/Auth//SignIn/SignIn.jsx";
import MovieList from "./pages/MovieList/MovieList.jsx";
import Subscribe from "./components/Subscribe.jsx";
import Order from "./pages/Order/Order.jsx";
import Home from "./pages/Home/Home.jsx";
import Payment from "./pages/Payment/Payment.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Details from "./pages/Details/Details.jsx";
import Result from "./pages/Result/Result.jsx";
import History from "./pages/History/History.jsx";
import { AdminDashboard } from "./pages/AdminDashboard/AdminDashboard.jsx";
import { AdminMovie } from "./pages/AdminMovie/AdminMovie.jsx";

// Lib
import { Toaster, toast } from "sonner";

function RouterPages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="">
          {/* Home, movies selection */}
          <Route element={<RouteHomeLayout />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<MovieList />} />
          </Route>
          <Route path="details" element={<RouteDetailsLayout />}>
            <Route index element={<Details />} />
          </Route>

          {/* Auth: SignUp and SignIn */}
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
            <Route path="history" element={<History />} />
            {/* </PrivateRoute> */}
          </Route>

          {/* Admin page */}
          {/* admin prefix */}
          <Route path="admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="movie" element={<AdminMovie />} />
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
      <InsideHomeLayout />
      <div className="flex flex-col gap-8 px-8 md:px-72">
        <Subscribe />
        <Footer />
      </div>
    </main>
  );
}

function InsideHomeLayout() {
  return <Outlet />;
}

function RouteDetailsLayout() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <Outlet />
      <div className="flex flex-col gap-8 px-8 md:px-72">
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
      <div className="flex flex-col items-center bg-[#A0A3BD33] px-8 py-4 md:px-72">
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

function AdminLayout() {
  return (
    <>
      <NavbarAdmin />
      <div className="flex flex-col items-center bg-[#f5f6f8]">
        <Outlet />
      </div>
    </>
  );
}

export default RouterPages;
