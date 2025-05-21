import { set } from "mongoose";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // clear previous errors

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 201) {
        // Registered successfully
        navigate("/home");
        localStorage.setItem('isLoggedIn', 'true');

      } else if (response.status === 200) {
        // Login successful
        localStorage.setItem('isLoggedIn', 'true');
        navigate("/home");
      } else if (response.status === 401) {
        // Password mismatch
        setErrorMsg(data.error || "Invalid credentials");
      } else {
        setErrorMsg(data.error || "Something went wrong");
      }
    } catch (error) {
      setErrorMsg("Server error. Try again later.");
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login to Blog
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="********"
              required
            />
            {errorMsg && (
              <p className="text-red-600 mt-1 text-sm">{errorMsg}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
