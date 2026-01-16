"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseAuth"; // ★後で説明します

export default function AdminLoginPage() {
  const router = useRouter();

  // すでにログインしていたら /admin に移動
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/admin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Googleログイン
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/admin");
    } catch (error) {
      console.error("Googleログインエラー:", error);
      alert("ログインに失敗しました");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="p-8 rounded-xl border shadow-sm max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold text-blue-700">管理者ログイン</h1>
        <p className="mt-2 text-zinc-600">Googleアカウントでログインしてください。</p>

        <button
          onClick={loginWithGoogle}
          className="mt-6 w-full rounded-lg border border-blue-700 bg-white px-6 py-3 
                     text-blue-700 font-medium shadow-sm hover:bg-blue-50 transition"
        >
          Googleでログイン
        </button>
      </div>
    </main>
  );
}