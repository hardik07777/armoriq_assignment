import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Sidebar from "../src/components/Sidebar";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ArmorIQ Dashboard",
  description: "Guarded AI Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geist.className} bg-zinc-950 text-white`}
      >
        <div className="flex min-h-screen">
          <Sidebar />

          <main className="flex-1 bg-zinc-900 p-10 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}