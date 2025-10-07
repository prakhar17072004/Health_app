"use client";
import { useState } from "react";

export default function AddChildPage() {
  const [form, setForm] = useState({ name: "", dob: "" });

  async function handleSubmit() {
    await fetch("/api/children", {
      method: "POST",
      body: JSON.stringify({ ...form, userId: 1 }),
    });
    alert("Child added successfully");
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-xl font-semibold mb-4">Add Child</h1>
      <input
        placeholder="Name"
        className="border p-2 w-full mb-3"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Date of Birth (YYYY-MM-DD)"
        className="border p-2 w-full mb-3"
        value={form.dob}
        onChange={(e) => setForm({ ...form, dob: e.target.value })}
      />
      <button onClick={handleSubmit} className="bg-blue-600 text-white p-2 w-full rounded">
        Save
      </button>
    </div>
  );
}
