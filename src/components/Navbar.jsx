import { Link, useNavigate } from "react-router";
import ListItem from "./ListItem";
import { useEffect, useState } from "react";

function Navbar() {
  const navBtn = [
    { text: "Home", route: "/" },
    { text: "Movies", route: "/movies" },
    { text: "Buy Ticket", route: "/" },
  ];

  // Hooks
  const [activeUser, setActiveUser] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userFromStorage = window.localStorage.getItem("activeUser");
    const isUserActive = userFromStorage !== null && userFromStorage !== "";
    setActiveUser(isUserActive);
    console.log("From localStorage:", userFromStorage);
    console.log("Is user active?", isUserActive);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("activeUser");
    setActiveUser(false);
    setIsProfileDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isProfileDropdownOpen &&
        !event.target.closest(".profile-dropdown-container")
      ) {
        closeProfileDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  return (
    <>
      {activeUser ? (
        // When there's a user
        <header className="relative z-50 flex items-center px-8 py-4 shadow-sm md:px-16">
          <img className="" src="/tickitz-blue.png" alt="" />
          <nav className="ml-auto">
            <ul className="hidden gap-16 text-sm md:flex">
              {navBtn.map((nav, idx) => {
                return (
                  <ListItem key={idx} to={nav.route} listText={nav.text} />
                );
              })}
            </ul>
          </nav>
          <div className="ml-auto hidden items-center gap-4 text-base md:flex">
            <div>Location</div>
            <img src="/arrow-down.png" alt="Arrow Down Button" />
            <img src="/search.png" alt="Search Button" />

            {/* Profile Picture with Dropdown */}
            <div className="profile-dropdown-container relative">
              <button
                onClick={toggleProfileDropdown}
                className="focus:outline-none"
                aria-label="Profile menu"
              >
                <img
                  src="/profile-pic-small.png"
                  alt="Small Profile Picture"
                  className="cursor-pointer transition-opacity hover:opacity-80"
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white py-2 shadow-lg">
                  <button
                    onClick={() => {
                      // Go to profile
                      navigate("/profile");
                    }}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            className="relative z-60 ml-4 md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <img src="/hamburger-menu.png" alt="Hamburger Menu" />
          </button>
        </header>
      ) : (
        // When there's no user
        <header className="relative z-50 flex items-center px-8 py-4 shadow-sm md:px-16">
          <img className="" src="/tickitz-blue.png" alt="" />
          <nav className="ml-auto">
            <ul className="hidden gap-16 text-sm md:flex">
              {navBtn.map((nav, idx) => {
                return (
                  <ListItem key={idx} to={nav.route} listText={nav.text} />
                );
              })}
            </ul>
          </nav>
          <div className="ml-auto flex gap-4">
            <Link
              to="/signin"
              className="hidden rounded-md border-[1px] border-solid px-5 py-2 text-[#1D4ED8] md:flex"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="hidden rounded-md border-[1px] border-solid bg-[#1D4ED8] px-5 py-2 text-white md:flex"
            >
              Sign Up
            </Link>
          </div>
          <button
            className="relative z-60 ml-4 md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <img src="/hamburger-menu.png" alt="Hamburger Menu" />
          </button>
        </header>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          {/* Mobile Navigation */}
          <nav className="fixed top-0 right-0 z-40 h-full w-80 bg-white shadow-lg">
            <div className="p-6">
              {/* Navigation Links */}
              <ul className="mb-8 space-y-6 pt-16">
                {navBtn.map((nav, idx) => (
                  <li key={idx}>
                    <Link
                      to={nav.route}
                      className="block text-lg text-gray-800 hover:text-[#1D4ED8]"
                      onClick={closeMobileMenu}
                    >
                      {nav.text}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* User-specific content */}
              {activeUser ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-gray-700">
                    <img
                      src="/arrow-down.png"
                      alt="Arrow Down Button"
                      className="h-4 w-4"
                    />
                    <span>Location</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <img
                      src="/search.png"
                      alt="Search Button"
                      className="h-6 w-6"
                    />
                    <Link to="/profile">
                      <img
                        src="/profile-pic-small.png"
                        alt="Small Profile Picture"
                        className="h-8 w-8"
                      />
                    </Link>
                  </div>
                  {/* Mobile Logout Button */}
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="block w-2/3 rounded-md border-[1px] border-solid border-red-500 px-5 py-3 text-center text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Link
                    to="/signin"
                    className="block w-2/3 rounded-md border-[1px] border-solid px-5 py-3 text-center text-[#1D4ED8] hover:bg-gray-50"
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-2/3 rounded-md border-[1px] border-solid bg-[#1D4ED8] px-5 py-3 text-center text-white hover:bg-blue-700"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

export default Navbar;
