"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function ResponsiveNavbar() {
  const router = useRouter();
  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    // add more links as needed
  ];

  return (
    <nav className="bg-blue-500 p-4">
      <h1 className="text-white text-2xl">
        {links.find((link) => link.path === router.pathname)?.name || "Page"}
      </h1>
      <ul className="flex space-x-4">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              href={link.path}
              className={`text-white ${
                router.pathname === link.path ? "font-bold" : ""
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
