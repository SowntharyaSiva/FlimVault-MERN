import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../movie-media-logo.jpg";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setWatchList([]);
    navigate("/"); 
  };

  return (
    <div className="flex justify-between items-center border px-4 py-4">
      <div className="flex items-center space-x-8">
        <img className="w-[50px]" src={Logo} alt="logo" />
        <Link to="/home" className="text-blue-500 text-2xl">Home</Link>
        <Link to="/watchlist" className="text-blue-500 text-2xl">Watchlist</Link>
      </div>

      <div className="flex items-center space-x-4">
        {user && <span className="text-gray-500 font-semibold text-2xl pr-3">{user.username}</span>}
        <button
          onClick={handleLogout}
          className="text-blue-500 hover:underline text-2xl pr-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
