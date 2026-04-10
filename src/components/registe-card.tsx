"use client";

import { useState } from "react";
import { useAuth } from "@/src/app/context";
import { registerUser } from "@/src/services/user-service";

export default function RegisterCard() {
    const { login } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setSubmitted(true);
        setError("");

        if (!name || !email || !password) {
            setError("All fields are required.");
            return;
        }

        try {
            const data = await registerUser(name, email, password);

            login(data.token, data.user);
            window.location.href = "/posts";
        } catch (err) {
            console.error(err);
            setError("Error creating account. Try again.");
        }
    };

    return (
        <div className="w-full max-w-md bg-[#140a25] text-white rounded-3xl shadow-2xl p-8 space-y-6 border border-purple-900">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Create Account</h2>
                <p className="text-sm text-gray-400">Register to continue</p>
            </div>

            <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                    <label className="text-sm text-gray-300">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Your name"
                        className={`w-full px-4 py-3 rounded-xl bg-[#1c1033] border text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-purple-600 transition
            ${submitted && !name ? "border-red-500" : "border-purple-900"}`}
                    />
                    {submitted && !name && (
                        <span className="text-xs text-red-400">Name is required</span>
                    )}
                </div>
                <div className="flex flex-col space-y-1">
                    <label className="text-sm text-gray-300">Email</label>
                    <input
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Your password"
                        className={`w-full px-4 py-3 rounded-xl bg-[#1c1033] border text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-purple-600 transition
            ${submitted && !password ? "border-red-500" : "border-purple-900"}`}
                    />
                    {submitted && !password && (
                        <span className="text-xs text-red-400">
                            Password is required
                        </span>
                    )}
                </div>
            </div>
            {error && (
                <div className="text-sm text-red-400 text-center">{error}</div>
            )}

            <button
                onClick={handleSubmit}
                className="w-full bg-purple-700 hover:bg-purple-800 transition py-3 rounded-xl font-semibold shadow-lg"
            >
                Register
            </button>
        </div>
    );
}