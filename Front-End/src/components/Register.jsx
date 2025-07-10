import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_BASE_URL;


export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  try {
    console.log("API_BASE is:", API_BASE);


    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    console.log("Raw response:", res);

    const text = await res.text(); // Try reading raw text
    console.log("Raw response text:", text);

    if (!res.ok) {
      // Try parsing JSON from raw text (if present)
      let errData;
      try {
        errData = JSON.parse(text);
      } catch (e) {
        errData = { message: "Unknown error or empty response" };
      }
      throw new Error(errData.message);
    }

    const data = JSON.parse(text); // Only parse after confirming it's not empty
    console.log("Parsed response:", data);

    setSuccess("Registration successful! Redirecting to login...");
    setTimeout(() => navigate("/"), 2000);
  } catch (err) {
    console.error("Registration error:", err.message);
    setError(err.message || "Something went wrong");
  }
};



  return (
    <div className="flex justify-center items-center h-screen bg-blue-100 text-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-blue-300">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          🎬 FilmVault Register
        </h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            Register
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
