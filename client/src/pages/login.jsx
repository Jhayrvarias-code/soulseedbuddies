// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError(null);
//     try {
//       const res = await fetch("http://localhost:3000//api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Login failed");
//       // Store token and go to dashboard
//       if (data.token) localStorage.setItem("token", data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.message);
//     }
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">Login</h1>
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <Input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             type="email"
//             placeholder="Email"
//           />
//           <Input
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             placeholder="Password"
//           />
//           <Button className="w-full" type="submit">
//             Login
//           </Button>
//           {error && <p className="text-red-600">{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// }
