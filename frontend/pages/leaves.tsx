import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { API_URL } from "../utils/api";

interface Leave {
  id: number;
  employeeName: string;
  startDate: string;
  endDate: string;
  reason: string;
}

export default function LeavesPage() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [form, setForm] = useState({ employeeName: "", startDate: "", endDate: "", reason: "" });

  useEffect(() => {
    fetch(`${API_URL}/api/leaves`)
      .then(res => res.json())
      .then(data => setLeaves(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/leaves`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newLeave = await res.json();
      setLeaves([...leaves, newLeave]);
      setForm({ employeeName: "", startDate: "", endDate: "", reason: "" });
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">Leave Management</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="Employee Name"
          value={form.employeeName}
          onChange={e => setForm({ ...form, employeeName: e.target.value })}
        />
        <input
          className="border p-2"
          type="date"
          value={form.startDate}
          onChange={e => setForm({ ...form, startDate: e.target.value })}
        />
        <input
          className="border p-2"
          type="date"
          value={form.endDate}
          onChange={e => setForm({ ...form, endDate: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Reason"
          value={form.reason}
          onChange={e => setForm({ ...form, reason: e.target.value })}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      <table className="border-collapse border w-full">
        <thead>
          <tr>
            <th className="border px-2">ID</th>
            <th className="border px-2">Employee</th>
            <th className="border px-2">Start Date</th>
            <th className="border px-2">End Date</th>
            <th className="border px-2">Reason</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(l => (
            <tr key={l.id}>
              <td className="border px-2">{l.id}</td>
              <td className="border px-2">{l.employeeName}</td>
              <td className="border px-2">{l.startDate}</td>
              <td className="border px-2">{l.endDate}</td>
              <td className="border px-2">{l.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}