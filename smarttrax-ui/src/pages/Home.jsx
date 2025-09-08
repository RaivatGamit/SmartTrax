import React, { useEffect, useState } from "react";
import apiClient  from "../apiClient";

const Home = () => {

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please login.");
      return;
    }

    // Example endpoint: /api/Auth/me
    apiClient.get("/Auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setUser(res.data))
      .catch((err) => setError("Failed to fetch user details."));
  }, []);

  if (error) return <div className="text-red-400">{error}</div>;
  if (!user) return <div>Loading user details...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h2>
      <div>Email: {user.email}</div>
      {/* Add more user info as needed */}
    </div>
  )
}

export default Home;