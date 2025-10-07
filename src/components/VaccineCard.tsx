"use client";
export default function VaccineCard({ vaccine, onChangeStatus }: { vaccine: any, onChangeStatus: (id: number, status: string) => void }) {
  return (
    <div className="border rounded p-3 flex items-center justify-between">
      <div>
        <div className="font-medium">{vaccine.name}</div>
        <div className="text-sm text-gray-600">Due: {vaccine.dueDate ? new Date(vaccine.dueDate).toLocaleDateString() : "—"}</div>
      </div>

      <div className="flex items-center gap-2">
        <div className={`px-3 py-1 rounded text-sm ${vaccine.status === "done" ? "bg-green-100 text-green-700" : vaccine.status === "missed" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
          {vaccine.status}
        </div>
        <button onClick={() => onChangeStatus(vaccine.vaccineId, "done")} className="px-3 py-1 border rounded">Mark Done</button>
        <button onClick={() => onChangeStatus(vaccine.vaccineId, "missed")} className="px-3 py-1 border rounded">Mark Missed</button>
      </div>
    </div>
  );
}
