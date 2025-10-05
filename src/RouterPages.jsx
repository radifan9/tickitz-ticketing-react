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
import Forget from "./pages/Auth/Forget/Forget.jsx";
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
import { AdminAddMovie } from "./pages/AdminAddMovie/AdminAddMovie.jsx";
import { AdminEditMovie } from "./pages/AdminEditMovie/AdminEditMovie.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

// Lib

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
            <Route path="forget" element={<Forget />} />
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
          <Route
            element={
              <PrivateRoute redirectTo="/signin" authorizeRole={["user"]}>
                <RouteProfile />
              </PrivateRoute>
            }
          >
            <Route path="profile" element={<Profile />} />
            <Route path="history" element={<History />} />
          </Route>

          {/* Admin page */}
          <Route
            path="admin"
            element={
              <PrivateRoute redirectTo="/" authorizeRole={["admin"]}>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="movie">
              <Route index element={<AdminMovie />} />
              <Route path="add" element={<AdminAddMovie />} />
              <Route path=":id/edit" element={<AdminEditMovie />} />
            </Route>
          </Route>

          <Route path="*" element={<RouteHomeLayout />}>
            <Route path="*" element={<NotFound />} />
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
      <div className="flex flex-col gap-8 px-[var(--small-pad)] md:px-[var(--medium-pad)]">
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
      <div className="flex flex-col gap-8 px-[var(--small-pad)] md:px-[var(--medium-pad)]">
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
      <div className="flex flex-col bg-[#A0A3BD33] px-[var(--small-pad)] py-4 md:px-[var(--medium-pad)]">
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

function RouteResultLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <div className="px-[var(--small-pad)] py-4 md:px-[var(--medium-pad)]">
        <Footer />
      </div>
    </>
  );
}

function RouteProfile() {
  return (
    <>
      <Navbar />

      <div className="bg-[#f5f6f8] px-[var(--small-pad)] md:px-[var(--medium-pad)]">
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
      <div className="flex flex-col items-center bg-[#f5f6f8] px-[var(--small-pad)] md:px-[var(--medium-pad)]">
        <Outlet />
      </div>
    </>
  );
}

export default RouterPages;
