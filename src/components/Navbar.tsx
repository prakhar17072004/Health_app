"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b p-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/">
          <span className="font-bold text-lg">Vaccination Reminder</span>
        </Link>
        <div className="space-x-3">
          <Link href="/" className="text-sm">Dashboard</Link>
          <Link href="/info-library" className="text-sm">Info</Link>
        </div>
      </div>
    </nav>
  );
}
