import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
const Dashboard = lazy(() => import("./pages/dashboard.jsx"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
