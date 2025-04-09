import React, { useState } from "react";
import { Building2, UserCircle } from "lucide-react";
import LoginForm from "./assets/components/LoginForm";
import ComplaintForm from "./assets/components/ComplaintForm";
import AdminDashboard from "./assets/components/AdminDashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">IIITA Help Desk</h1>
            </div>
            {isLoggedIn && (
              <div className="flex items-center space-x-2 text-white">
                <UserCircle className="h-6 w-6" />
                <span>{isAdmin ? "Admin" : "Student"}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto">
            <LoginForm onLogin={handleLogin} />
          </div>
        ) : isAdmin ? (
          <AdminDashboard />
        ) : (
          <ComplaintForm />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-sm">&copy; 2025 IIITA Help Desk. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-indigo-400 transition duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-400 transition duration-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
