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
    <div className="max-w-md mx-auto mt-10 p-6