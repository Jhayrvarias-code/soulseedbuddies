import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import "./index.css";

// Layouts
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";

// Route Guards
import ProtectedRoute from "./routes/ProtectedRoutes";
import AuthRoute from "./routes/AuthRoute";

// import { BASE_URL } from "@/api/axios";

// Pages
import ErrorPage from "./pages/ErrorPage";

// 🔹 Lazy-loaded pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Landing = lazy(() => import("./pages/landingPage"));

// 🔹 Router configuration

import { AuthProvider } from "./context/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./layouts/publicLayout";

function App() {
  const router = createBrowserRouter([
    {
      element: <Outlet />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <PublicLayout />,
          children: [
            {
              index: true,
              element: (
                <Suspense fallback="Loading...">
                  <Landing />
                </Suspense>
              ),
            },
          ],
        },

        {
          element: <AuthRoute />,
          children: [
            {
              element: <AuthLayout />,
              children: [
                {
                  path: "/login",
                  element: (
                    <Suspense fallback="Loading login...">
                      <Login />
                    </Suspense>
                  ),
                },
                {
                  path: "/register",
                  element: (
                    <Suspense fallback="Loading register...">
                      <Register />
                    </Suspense>
                  ),
                },
              ],
            },
          ],
        },

        {
          element: <ProtectedRoute />,
          children: [
            {
              element: <AppLayout />,
              children: [
                {
                  path: "/dashboard",
                  element: (
                    <Suspense fallback="Loading dashboard...">
                      <Dashboard />
                    </Suspense>
                  ),
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
