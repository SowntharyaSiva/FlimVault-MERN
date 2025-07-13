import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_BASE_URL;


export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const text = await response.text(); // first read raw text
    console.log("Raw login response text:", text); // optional debugging

    if (!response.ok) {
      // Try to parse error message if any
      let errorData;
      try {
        errorData = JSON.parse(text);
      } catch (e) {
        errorData = { message: "Login failed. Server returned no error message." };
      }
      setError(errorData.message || "Login failed");
      return;
    }

    // Parse the JSON if ok
    const data = JSON.parse(text);

    if (data.success && data.user) {
      const userInfo = {
        userId: data.user._id,
        username: data.user.username
      };

      setUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));
      //localStorage.setItem("moviesApp", JSON.stringify(data.user.watchlist || []));
      navigate("/home");
    } else {
      setError(data.message || "Login failed");
    }

  } catch (err) {
    console.error("Login error:", err.message);
    setError("Something went wrong. Try again.");
  }
};


  return (
    <div className="flex justify-center items-center h-screen bg-blue-100 text-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-blue-300">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">🎬 FilmVault Login</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
