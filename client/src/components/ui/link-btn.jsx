import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Nav = ({ children, variant = "primary", className, ...props }) => {
  const baseStyles = "transition-all duration-200 font-medium";

  const variants = {
    primary: `${baseStyles} px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-md active:scale-95`,
    secondary: `${baseStyles} px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 hover:shadow-md active:scale-95`,
    tertiary: `${baseStyles} px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg`,
    nav: `${baseStyles} text-gray-700 hover:text-blue-600 hover:underline underline-offset-4`,
  };

  return (
    <RouterLink
      className={`${variants[variant]} ${className || ""}`}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

export default Nav;
