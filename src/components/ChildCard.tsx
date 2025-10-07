"use client";
import Link from "next/link";

export default function ChildCard({ child }: { child: any }) {
  return (
    <div className="border rounded p-4 shadow-sm">
      <h3 className="text-lg font-medium">{child.name}</h3>
      <p>DOB: {new Date(child.dob).toLocaleDateString()}</p>
      <div className="mt-3">
        <Link href={`/vaccine-schedule/${child.id}`}>
          <button className="px-3 py-1 bg-indigo-600 text-white rounded mr-2">View Vaccines</button>
        </Link>
      </div>
    </div>
  );
}
