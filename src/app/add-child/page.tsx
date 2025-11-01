"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddChildPage() {
  const [form, setForm] = useState({ userName: "", childName: "", dob: "" });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.userName || !form.childName || !form.dob) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/children", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Child added successfully");
        router.push("/"); // redirect to home or list page
      } else {
        alert(data.error || "Failed to add child");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-9 p-8 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Add Child</h2>

      <label className="block mb-2 font-medium">Parent Name</label>
      <input
        type="text"
        placeholder="Enter parent name"
        value={form.userName}
        onChange={(e) => setForm({ ...form, userName: e.target.value })}
        className="w-full border p-2 mb-8 rounded"
      />

      <label className="block mb-2 font-medium">Child Name</label>
      <input
        type="text"
        placeholder="Enter child name"
        value={form.childName}
        onChange={(e) => setForm({ ...form, childName: e.target.value })}
        className="w-full border p-2 mb-4 rounded"
      />

      <label className="block mb-2 font-medium">Date of Birth</label>
      <input
        type="date"
        value={form.dob}
        onChange={(e) => setForm({ ...form, dob: e.target.value })}
        className="w-full border p-2 mb-8 rounded"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-2 px-4 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
