import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Link, useNavigate, Outlet } from "react-router-dom";
import Nav from "@/components/ui/link-btn";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded shadow w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Login
            </button>
          </form>
          <div className="flex items-center justify-center mt-4">
            <p>Don't have an account?</p>
            <div className="flex justify-center mx-4">
              <Nav to="/register" variant="primary">
                Register
              </Nav>
              <Nav to="/" variant="tertiary">
                Return Home
              </Nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
