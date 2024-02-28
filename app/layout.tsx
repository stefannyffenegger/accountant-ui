import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PrelineScript from "@/app/components/preline";
import Sidebar from "./components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Accountant",
  description: "Private budgeting made easy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <PrelineScript />
      <body className={inter.className}>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
