"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace("/resume");
      }
    };

    checkSession();
  }, [router]);

  async function signUp() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) return alert(error.message);

    alert("Account created! Check your email to confirm, then sign in.");
  }

  async function signIn() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) return alert(error.message);

    router.push("/resume");
  }

  return (
    <div className="p-10 flex flex-col gap-4 max-w-md mx-auto">
      <input
        placeholder="email"
        className="border p-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        className="border p-2"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={signIn}
        disabled={loading}
        className="bg-black text-white p-2 disabled:opacity-50"
      >
        {loading ? "Working..." : "Sign In"}
      </button>

      <button
        onClick={signUp}
        disabled={loading}
        className="bg-gray-500 text-white p-2 disabled:opacity-50"
      >
        {loading ? "Working..." : "Sign Up"}
      </button>
    </div>
  );
}