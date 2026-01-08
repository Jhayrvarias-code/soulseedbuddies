// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function RegisterPage() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [birthdate, setBirthdate] = useState("");
//   const [gender, setGender] = useState("");
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const navigate = useNavigate();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError(null);
//     if (submitting) return; // prevent duplicate submits
//     setSubmitting(true);
//     // Client-side age check
//     if (!birthdate) {
//       setError("Birthdate is required");
//       return;
//     }
//     const bd = new Date(birthdate);
//     const today = new Date();
//     let age = today.getFullYear() - bd.getFullYear();
//     const m = today.getMonth() - bd.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < bd.getDate())) age--;
//     if (age < 18) {
//       setError("You must be at least 18 years old to register");
//       return;
//     }
//     try {
//       const res = await fetch("http://localhost:3000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           firstName,
//           lastName,
//           email,
//           password,
//           confirmPassword,
//           birthdate,
//           gender,
//         }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         // If server returned structured validation errors
//         if (data && data.errors) {
//           const first = Object.values(data.errors)[0];
//           throw new Error(first || "Registration failed");
//         }
//         throw new Error(data.error || "Registration failed");
//       }
//       // After register, navigate to login
//       navigate("/login");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">Register</h1>
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div className="grid grid-cols-2 gap-2">
//             <input
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               type="text"
//               placeholder="First Name"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//               required
//             />
//             <input
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               type="text"
//               placeholder="Last Name"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Birthdate</label>
//             <input
//               value={birthdate}
//               onChange={(e) => setBirthdate(e.target.value)}
//               type="date"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//               required
//             />
//           </div>
//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             type="email"
//             placeholder="Email"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//             required
//           />
//           <input
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             placeholder="Password"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//             required
//           />
//           <input
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             type="password"
//             placeholder="Repeat Password"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//             required
//           />
//           <button
//             type="submit"
//             disabled={submitting}
//             className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition ${
//               submitting ? "opacity-60 cursor-not-allowed" : ""
//             }`}
//           >
//             {submitting ? "Registering..." : "Register"}
//           </button>
//           {error && <p className="text-red-600">{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// }
