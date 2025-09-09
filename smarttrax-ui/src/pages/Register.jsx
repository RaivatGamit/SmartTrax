import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient  from "../apiClient";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch("http://localhost:5050/api/Auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                setSuccess("Registration successful!");
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
                // Optionally redirect or clear form
            } else {
                setError(data.message || "Registration failed.");
            }
        } catch (err) {
            setError("Network error.");
        }
    };

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-100">Register</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="username">Username</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text" id="username" placeholder="Enter your username"
                            value={username} onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="email" id="email" placeholder="Enter your email"
                            value={email} onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password" id="password" placeholder="Enter your password"
                            value={password} onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
                    {error && <div className="mt-2 text-red-400 text-center">{error}</div>}
                    {success && <div className="mt-2 text-green-400 text-center">{success}</div>}
                    <div className="mt-4 text-center">
                        <Link to="/login" className="text-blue-400 hover:underline">
                            Already have an account? Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;