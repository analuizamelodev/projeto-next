"use client";

import { useState } from "react";
import { useAuth } from "@/src/app/context";
import { apiClient } from "@/src/libs/api";

export default function LoginCard() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!email || !password) {
      return;
    }
    console.log(`Email: ${email}, Password: ${password}`);
    try {
      const response = await apiClient.post("/login", { email, password });
      const data = response.data;
      console.log(data);
      login(data.token, data.user);
      window.location.href = "/posts";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#140a25] text-white rounded-3xl shadow-2xl p-8 space-y-6 border border-purple-900">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Welcome Back</h2>
        <p className="text-sm text-gray-400">Sign in to continue</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col space-y-1">
          <label className="text-sm text-gray-300">Email</label>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="example@email.com"
            className={`w-full px-4 py-3 rounded-xl bg-[#1c1033] border text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-purple-600 transition
            ${submitted && !email ? "border-red-500" : "border-purple-900"}`}
          />
          {submitted && !email && (
            <span className="text-xs text-red-400">Email is required</span>
          )}
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm text-gray-300">Password</label>
          <input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Your password"
            className={`w-full px-4 py-3 rounded-xl bg-[#1c1033] border text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-purple-600 transition
            ${submitted && !password ? "border-red-500" : "border-purple-900"}`}
          />
          {submitted && !password && (
            <span className="text-xs text-red-400">Password is required</span>
          )}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-purple-700 hover:bg-purple-800 transition py-3 rounded-xl font-semibold shadow-lg"
      >
        Login
      </button>
    </div>
  );
}
