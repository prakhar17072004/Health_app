"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddChildPage() {
  const [form, setForm] = useState({ name: "", dob: "" });
  const router = useRouter();
  const handle = async () => {
    // Hardcoded userId = 1 — replace with logged in userId
    const res = await fetch("/api/children", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId: 1 })
    });
    if (res.ok) {
      alert("Child added");
      router.push("/");
    } else {
      const err = await res.json();
      alert(err.error || "Error");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Child</h2>
      <label className="block mb-2">Name</label>
      <input className="w-full border p-2 mb-3" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <label className="block mb-2">DOB</label>
      <input className="w-full border p-2 mb-3" placeholder="YYYY-MM-DD" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
      <button onClick={handle} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
    </div>
  );
}
