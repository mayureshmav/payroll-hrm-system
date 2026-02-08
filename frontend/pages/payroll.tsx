import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { API_URL } from "../utils/api";

interface Payroll {
  id: number;
  employeeName: string;
  salary: number;
  month: string;
}

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [form, setForm] = useState({ employeeName: "", salary: 0, month: "" });

  useEffect(() => {
    fetch(`${API_URL}/api/payroll`)
      .then(res => res.json())
      .then(data => setPayrolls(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/payroll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newPayroll = await res.json();
      setPayrolls([...payrolls, newPayroll]);
      setForm({ employeeName: "", salary: 0, month: "" });
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">Payroll Management</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="Employee Name"
          value={form.employeeName}
          onChange={e => setForm({ ...form, employeeName: e.target.value })}
        />
        <input
          className="border p-2"
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={e => setForm({ ...form, salary: Number(e.target.value) })}
        />
        <input
          className="border p-2"
          placeholder="Month"
          value={form.month}
          onChange={e => setForm({ ...form, month: e.target.value })}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      <table className="border-collapse border w-full">
        <thead>
          <tr>
            <th className="border px-2">ID</th>
            <th className="border px-2">Employee</th>
            <th className="border px-2">Salary</th>
            <th className="border px-2">Month</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map(p => (
            <tr key={p.id}>
              <td className="border px-2">{p.id}</td>
              <td className="border px-2">{p.employeeName}</td>
              <td className="border px-2">{p.salary}</td>
              <td className="border px-2">{p.month}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}