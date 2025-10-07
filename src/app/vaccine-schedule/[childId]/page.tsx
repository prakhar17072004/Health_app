"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import VaccineCard from "@/components/VaccineCard";

export default function VaccineSchedulePage() {
  const params = useParams() as { childId: string };
  const childId = params.childId;
  const [list, setList] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!childId) return;
    fetch(`/api/vaccines/${childId}`)
      .then((r) => r.json())
      .then(setList)
      .catch(() => setList([]));
  }, [childId]);

  const updateStatus = async (vaccineId: number, status: string) => {
    await fetch(`/api/vaccines/${childId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vaccineId, status })
    });
    setList((l) => l.map((it) => (it.vaccineId === vaccineId ? { ...it, status } : it)));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Vaccine Schedule</h1>
        <button onClick={() => router.push("/")} className="px-3 py-1 border rounded">Back</button>
      </div>

      {list.length === 0 ? (
        <p>No vaccine records. (If child was recently added, seed may still run.)</p>
      ) : (
        <div className="space-y-3">
          {list.map((v) => (
            <VaccineCard key={v.id} vaccine={v} onChangeStatus={updateStatus} />
          ))}
        </div>
      )}
    </div>
  );
}
