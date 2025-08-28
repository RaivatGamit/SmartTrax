import React from "react";
import { Link } from "react-router-dom";

const Register = () => (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-100">Register</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2" htmlFor="username">Username</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text" id="username" placeholder="Enter your username" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="email" id="email" placeholder="Enter your email" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-700 bg-gray-900 text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="password" id="password" placeholder="Enter your password" />
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
                <div className="mt-4 text-center">
                    <Link to="/register" className="text-blue-400 hover:underline">
                        Already have an account? Login
                    </Link>
                </div>
            </form>
        </div>
    </div>
);
export default Register;