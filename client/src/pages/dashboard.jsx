import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [footer, setFooter] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    fetch("http://localhost:3000/api/auth/protected", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setStatus(`Connected as ${data.userId}`))
      .catch(() => navigate("/login"));
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Secure Dashboard</h2>
          <div>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        </div>

        <p className="mb-4">{status ?? "Verifying session..."}</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Header</label>
            <input
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border px-3 py-2 rounded h-32"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Footer</label>
            <input
              value={footer}
              onChange={(e) => setFooter(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
