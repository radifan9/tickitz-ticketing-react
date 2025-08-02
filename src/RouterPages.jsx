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
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import Details from "./pages/Details/Details.jsx";

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

          {/* User Profile, Settings */}
          <Route>
            {/* <PrivateRoute redirectTo={<SignIn />}> */}
            <Route path="profile" element={<ProfilePage />} />
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
      <Outlet />
      <Subscribe />
      <Footer />
    </main>
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
