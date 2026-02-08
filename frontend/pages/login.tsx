import React, { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../utils/api";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const success = await res.json();
      if (success) router.push("/dashboard");
      else setError("Invalid credentials");
    } else {
      setError("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4">HRM Login</h1>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded">Login</button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
}