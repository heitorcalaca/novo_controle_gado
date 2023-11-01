"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import TailWindNavbar from "@/components/TailWindNavbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html className="h-full bg-gray-100" lang="en">
      <body className="h-full">
        <div>
          <TailWindNavbar />
          {children}
        </div>
      </body>
    </html>
  );
}
