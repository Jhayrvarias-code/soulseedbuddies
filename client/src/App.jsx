import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Call the backend test endpoint to confirm server + MongoDB status
    fetch("http://localhost:3000/api/test")
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend test response:", data);
        if (data && data.db && data.db.status === "connected") {
          console.log("Frontend: Backend reports MongoDB is connected.");
        } else {
          console.warn("Frontend: Backend reports MongoDB is NOT connected.");
        }
      })
      .catch((err) =>
        console.error("Failed to reach backend test endpoint:", err)
      );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Soul Seed Buddies
        </h1>
        <p className="text-gray-600 mb-6">Welcome to your application</p>
        <nav className="flex gap-4">
          <a
            href="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </a>
          <a
            href="/register"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Register
          </a>
        </nav>
      </div>
    </div>
  );
}

export default App;
