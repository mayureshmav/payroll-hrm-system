import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { API_URL } from "../utils/api";

interface Attendance {
  id: number;
  employeeName: string;
  date: string;
  present: boolean;
}

export default function AttendancePage() {
  const [records, setRecords] = useState<Attendance[]>([]);
  const [form, setForm] = useState({ employeeName: "", date: "", present: true });

  useEffect(() => {
    fetch(`${API_URL}/api/attendance`)
      .then(res => res.json())
      .then(data => setRecords(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/attendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newRecord = await res.json();
      setRecords([...records, newRecord]);
      setForm({ employeeName: "", date: "", present: true });
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">Attendance</h1>
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
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
        />
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={form.present}
            onChange={e => setForm({ ...form, present: e.target.checked })}
          />
          Present
        </label>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      <table className="border-collapse border w-full">
        <thead>
          <tr>
            <th className="border px-2">ID</th>
            <th className="border px-2">Employee</th>
            <th className="border px-2">Date</th>
            <th className="border px-2">Present</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r.id}>
              <td className="border px-2">{r.id}</td>
              <td className="border px-2">{r.employeeName}</td>
              <td className="border px-2">{r.date}</td>
              <td className="border px-2">{r.present ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}