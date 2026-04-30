import "./globals.css";
import type { Metadata } from "next";
import SupabaseProvider from "@/components/SupabaseProvider";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Resume Analyzer AI",
  description: "AI-powered resume scoring and feedback system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <SupabaseProvider>
          {/* 🌐 GLOBAL WRAPPER */}
          <div className="min-h-screen flex flex-col">

            {/* 🧠 OPTIONAL TOP NAVBAR */}
            <Header />

          {/* 📦 PAGE CONTENT */}
          <main className="flex-1">
            {children}
          </main>

          {/* 🦶 FOOTER */}
          <footer className="border-t bg-white">
            <div className="max-w-6xl mx-auto p-4 text-sm text-gray-500">
              Built with Next.js + Supabase
            </div>
          </footer>

        </div>
        </SupabaseProvider>
      </body>
    </html>
  );
}