import React from 'react'
import { useEffect, useState } from "react";

interface Payroll {
  id: number;
  employeeName: string;
  salary: number;
  month: string;
}

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [form, setForm] = useState({ employeeName: "", salary: "", month: "" });

  useEffect(() => {
    fetch("http://localhost:8081/api/payroll")
      .then(res => res.json())
      .then(data => setPayrolls(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8081/api/payroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const newPayroll = await res.json();
    setPayrolls([...payrolls, newPayroll]);
    setForm({ employeeName: "", salary: "", month: "" });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Payroll Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Employee Name"
          value={form.employeeName}
          onChange={e => setForm({ ...form, employeeName: e.target.value })}
        />
        <input
          placeholder="Salary"
          type="number"
          value={form.salary}
          onChange={e => setForm({ ...form, salary: e.target.value })}
        />
        <input
          placeholder="Month"
          value={form.month}
          onChange={e => setForm({ ...form, month: e.target.value })}
        />
        <button type="submit">Add Payroll</button>
      </form>

      <table border={1} style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Salary</th>
            <th>Month</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.employeeName}</td>
              <td>{p.salary}</td>
              <td>{p.month}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}