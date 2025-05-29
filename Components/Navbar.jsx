"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image
            src="/task.jpeg"
            alt="Logo"
            width={32}
            height={32}
            className="rounded"
          />
          <h1 className="text-xl font-bold">Tasky</h1>
        </div>

        <div className="hidden sm:flex items-center gap-6 text-sm sm:text-base font-medium">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/history" className="hover:underline">
            History
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-white text-2xl font-bold"
          aria-label="Toggle menu"
        >
          ...
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden px-4 pb-3 space-y-2">
          <Link
            href="/"
            className="block py-2 text-sm hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/history"
            className="block py-2 text-sm hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            History
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
