import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../apiClient"; // ✅ Import centralized API client

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const isValidEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }
        if (!isValidEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        
        try {
            const { data } = await apiClient.post("/Auth/login", { email, password });

            if (data.token) {
                localStorage.setItem("token", data.token); // Store JWT
                navigate("/home"); // Redirect
            } else {
                setError("Invalid response from server.");
            }
        } catch (err) {
            setError(err.response?.data || "Login failed.");
        }
    };

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-sm">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-100">Login</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
                    {error && <div className="mt-2 text-red-400 text-center">{error}</div>}
                    <div className="mt-4 text-center">
                        <Link to="/register" className="text-blue-400 hover:underline">
                            Don't have an account? Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;