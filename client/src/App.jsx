import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import LoginForm from "./assets/components/LoginForm";
import SignupForm from "./assets/components/SignupForm";
import ComplaintForm from "./assets/components/ComplaintForm";
import AdminDashboard from "./assets/components/AdminDashboard";
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        setIsAdmin(data.isAdmin);
        setIsLoggedIn(true);
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Server error: " + error.message);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />

        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to={isAdmin ? "/admin" : "/complaint"} />
                ) : (
                  <LoginForm onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/signup"
              element={<SignupForm onSignupSuccess={() => window.location.href = "/"} />}
            />
            <Route
              path="/complaint"
              element={
                isLoggedIn && !isAdmin ? <ComplaintForm /> : <Navigate to="/" />
              }
            />
            <Route
              path="/admin"
              element={
                isLoggedIn && isAdmin ? <AdminDashboard /> : <Navigate to="/" />
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
