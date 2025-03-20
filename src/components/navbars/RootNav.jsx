import { useState, useEffect } from "react";
import { BrainCog, Menu, X } from "lucide-react";
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
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/">
          <div className="flex items-center space-x-2">
            <BrainCog className="h-8 w-8 text-purple-700" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-500 text-transparent bg-clip-text">
              AnvikshAI
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="font-medium hover:text-purple-700 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="font-medium hover:text-purple-700 transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact-us"
            className="font-medium hover:text-purple-700 transition-colors"
          >
            Contact Us
          </Link>
          {decodedToken == null ? (
            <>
              <Link
                to="/login"
                className="font-medium hover:text-purple-700 transition-colors"
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
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-800" />
            ) : (
              <Menu className="h-6 w-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full py-4 px-6 flex flex-col space-y-4">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="font-medium hover:text-purple-700 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="font-medium hover:text-purple-700 transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact-us"
            onClick={() => setMobileMenuOpen(false)}
            className="font-medium hover:text-purple-700 transition-colors"
          >
            Contact Us
          </Link>
          {token == null ? (
            <>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <button className="btn-primary">Sign Up</button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <button className="btn-primary">Sign In</button>
              </Link>
            </>
          ) : (
            <Link to="/dashboard">
              <button
                className="btn-primary"
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
