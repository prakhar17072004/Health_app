"use client";
import { useEffect, useState } from "react";
import ChildCard from "@/components/ChildCard";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [children, setChildren] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Hardcoded userId=1 for MVP; integrate auth to get real id
    fetch("/api/children?userId=1")
      .then((r) => r.json())
      .then(setChildren)
      .catch(() => setChildren([]));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div>
          <button onClick={() => router.push("/add-child")} className="px-4 py-2 bg-blue-600 text-white rounded">
            Add Child
          </button>
          <button onClick={() => router.push("/info-library")} className="ml-2 px-4 py-2 border rounded">
            Info Library
          </button>
        </div>
      </div>

      {children.length === 0 ? (
        <p>No children yet. Click "Add Child".</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {children.map((c) => (
            <ChildCard key={c.id} child={c} />
          ))}
        </div>
      )}
    </div>
  );
}
