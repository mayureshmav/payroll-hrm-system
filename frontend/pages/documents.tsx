import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { API_URL } from "../utils/api";

interface Document {
  id: number;
  employeeName: string;
  title: string;
  filePath: string;
}

export default function DocumentsPage() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [form, setForm] = useState({ employeeName: "", title: "", filePath: "" });

  useEffect(() => {
    fetch(`${API_URL}/api/documents`)
      .then(res => res.json())
      .then(data => setDocs(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/documents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newDoc = await res.json();
      setDocs([...docs, newDoc]);
      setForm({ employeeName: "", title: "", filePath: "" });
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">Documents</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="Employee Name"
          value={form.employeeName}
          onChange={e => setForm({ ...form, employeeName: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="File Path"
          value={form.filePath}
          onChange={e => setForm({ ...form, filePath: e.target.value })}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      <table className="border-collapse border w-full">
        <thead>
          <tr>
            <th className="border px-2">ID</th>
            <th className="border px-2">Employee</th>
            <th className="border px-2">Title</th>
            <th className