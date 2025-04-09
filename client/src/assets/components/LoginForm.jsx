import React, { useState } from "react";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        onLogin(email, password, data.isAdmin);
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl bg-white p-12 rounded-3xl shadow-xl border border-gray-200">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-indigo-700">IIITA Help Desk</h1>
          <h2 className="text-2xl font-medium text-gray-800 mt-4">Welcome Back</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@iiita.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 text-lg rounded-xl hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="text-sm text-center text-gray-600 mt-8">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline font-medium">
            Sign Up
          </a>
        </div>

        <p className="text-xs text-center text-gray-400 mt-3">
          Only authorized IIITA users allowed
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
