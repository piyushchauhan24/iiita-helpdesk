import React, { useState } from "react";

const SignupForm = ({ onSignupSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Signup successful! You can now log in.");
        onSignupSuccess();
      } else {
        alert("Signup failed: " + data.message);
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl bg-white p-12 rounded-3xl shadow-xl border border-gray-200">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-indigo-700">IIITA Help Desk</h1>
          <h2 className="text-2xl font-medium text-gray-800 mt-4">Create an Account</h2>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
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
              placeholder="Create a strong password"
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
            Sign Up
          </button>
        </form>

        <div className="text-sm text-center text-gray-600 mt-8">
          Already have an account?{" "}
          <a href="/" className="text-indigo-600 hover:underline font-medium">
            Login
          </a>
        </div>

        <p className="text-xs text-center text-gray-400 mt-3">
          Use your IIITA email address to register.
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
