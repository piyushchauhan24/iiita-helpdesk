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
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
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
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
        }

        .page-wrapper {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .heading {
          font-size: 36px;
          font-weight: 800;
          color: white;
          text-align: center;
          margin-bottom: 30px;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
          letter-spacing: 1px;
        }

        .login-card {
          background-color: #ffffff;
          border-radius: 16px;
          padding: 40px 30px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          animation: fadeIn 0.5s ease-in-out;
        }

        .login-card h2 {
          font-size: 22px;
          margin-bottom: 25px;
          color: #1f2937;
          text-align: center;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 6px;
          color: #4b5563;
          font-weight: 600;
        }

        .form-group input {
          width: 100%;
          padding: 12px;
          border: 1px solid #cbd5e0;
          border-radius: 8px;
          font-size: 15px;
          transition: border-color 0.3s;
        }

        .form-group input:focus {
          border-color: #6366f1;
          outline: none;
        }

        .login-button {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          font-weight: 600;
          background-color: #6366f1;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .login-button:hover {
          background-color: #4f46e5;
        }

        .login-footer {
          text-align: center;
          margin-top: 15px;
          font-size: 13px;
          color: #6b7280;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 30px 20px;
          }

          .heading {
            font-size: 28px;
          }
        }
      `}</style>

      <div className="page-wrapper">
        <div className="heading">IIITA Help Desk</div>
        <div className="login-card">
          <h2>Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@iiita.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="login-button" type="submit">Login</button>
          </form>
          <div className="login-footer">Only authorized IIITA users allowed</div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
