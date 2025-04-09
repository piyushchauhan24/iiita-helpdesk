import React from "react";
import { Building2, UserCircle } from "lucide-react";

const Header = ({ isLoggedIn, isAdmin }) => {
  return (
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
  );
};

export default Header;
