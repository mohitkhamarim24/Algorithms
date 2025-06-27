"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, password });
    // Add API registration logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-black text-white rounded-3xl shadow-2xl p-8 w-full max-w-md border border-gray-800"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-1">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-xl"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}
