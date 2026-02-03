import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import React from "react";
import Nav from "@/components/ui/link-btn";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: "",
    gender: "",
    lookingFor: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <select
            name="lookingFor"
            value={form.lookingFor}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          >
            <option value="">Looking for</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
            Register
          </button>
        </form>
        <div className="flex items-center justify-center mt-4">
          <p>Already have an account?</p>
          <div className="flex justify-center mx-4">
            <Nav to="/login" variant="primary">
              Login
            </Nav>
            <Nav to="/" variant="tertiary">
              Return Home
            </Nav>
          </div>
        </div>
      </div>
    </div>
  );
}
