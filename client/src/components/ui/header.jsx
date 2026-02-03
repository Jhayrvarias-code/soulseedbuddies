import React from "react";
import Nav from "./link-btn";
import { useAuth } from "@/context/AuthContext";

const Header = ({ type = "protected" }) => {
  const { token, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-600">Soul Seed</h1>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-6">
          {type === "public" ? (
            <>
              <li>
                <Nav to="/" variant="nav">
                  Home
                </Nav>
              </li>
              <li>
                <Nav to="/about" variant="nav">
                  About
                </Nav>
              </li>
              <li>
                <Nav to="/login" variant="primary">
                  Sign In
                </Nav>
              </li>
              <li>
                <Nav to="/register" variant="secondary">
                  Sign Up
                </Nav>
              </li>
            </>
          ) : (
            <>
              <li>
                <Nav to="/dashboard" variant="nav">
                  Dashboard
                </Nav>
              </li>
              <li>
                <Nav to="/profile" variant="nav">
                  Profile
                </Nav>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
