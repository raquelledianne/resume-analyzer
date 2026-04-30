"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setLoggedIn(!!session);
    };

    checkSession();

    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <div>
          <Link href="/" className="font-bold text-lg">
            Resume AI
          </Link>
        </div>

        <nav className="space-x-4 text-sm flex items-center">
          <Link href="/resume" className="hover:underline">
            Analyze
          </Link>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
