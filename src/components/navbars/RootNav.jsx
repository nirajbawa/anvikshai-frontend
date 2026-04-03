import { useState, useEffect } from "react";
import { BrainCog, Menu, X, Sun, Moon } from "lucide-react";
import { Link } from "react-router";
import useAuthStore from "../../store/useAuthStore";
import { jwtDecode } from "jwt-decode";

const RootNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { token } = useAuthStore();
  const [decodedToken, setDecodedToken] = useState(null);

  const decode = () => {
    try {
      const dt = jwtDecode(token);
      setDecodedToken(dt);
    } catch (e) {
      console.log(e);
    }
  };

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    decode();
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white dark:bg-gray-900 shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/">
          <div className="flex items-center space-x-2">
            <BrainCog className="h-8 w-8 text-purple-700 dark:text-purple-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-500 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              AnvikshAI
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-gray-800 dark:text-gray-200">
          <Link
            to="/"
            className="font-medium hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="font-medium hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact-us"
            className="font-medium hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
          >
            Contact Us
          </Link>
          {decodedToken == null ? (
            <>
              <Link
                to="/login"
                className="font-medium hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
              >
                Sign In
              </Link>
              <Link to="/signup">
                <button className="btn-primary">Sign Up</button>
              </Link>
            </>
          ) : (
            <Link
              to={
                decodedToken?.role === "admin"
                  ? "/admin/dashboard"
                  : decodedToken?.role === "expert"
                  ? "/expert/dashboard"
                  : "/dashboard"
              }
            >
              <button className="btn-primary">Dashboard</button>
            </Link>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors focus:outline-none"
            title="Toggle Dark Mode"
          >
            {theme === "dark" ? <Sun className="h-[20px] w-[20px]" /> : <Moon className="h-[20px] w-[20px]" />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors focus:outline-none"
            title="Toggle Dark Mode"
          >
            {theme === "dark" ? <Sun className="h-[20px] w-[20px]" /> : <Moon className="h-[20px] w-[20px]" />}
          </button>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-800 dark:text-white" />
            ) : (
              <Menu className="h-6 w-6 text-gray-800 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg absolute top-full left-0 w-full py-4 px-6 flex flex-col space-y-4 text-gray-800 dark:text-gray-200">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="font-medium hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="font-medium hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact-us"
            onClick={() => setMobileMenuOpen(false)}
            className="font-medium hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
          >
            Contact Us
          </Link>
          {token == null ? (
            <>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <button className="btn-primary w-full">Sign Up</button>
              </Link>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="btn-primary w-full">Sign In</button>
              </Link>
            </>
          ) : (
            <Link to="/dashboard">
              <button
                className="btn-primary w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default RootNav;
