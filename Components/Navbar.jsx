'use client'
import Image from "next/image";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
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
      </div>
    </nav>
  );
}

export default Navbar;
