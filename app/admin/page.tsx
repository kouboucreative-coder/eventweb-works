"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const ADMIN_UID = "ajzzRAmUreOMqQpzcrje7aAw43k2"; // ← あなたのUID

type Order = {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  budgetRange: string;
  deadline: string;
  meeting: string;
  details: string;
  createdAt?: { seconds: number; nanoseconds: number };
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  // ① 管理者チェック（Hooks順序を守るため常に実行される）
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.uid !== ADMIN_UID) {
        router.push("/"); // 権限NG → トップへ
        return;
      }
      setChecking(false); // 権限OK
    });

    return () => unsubscribe();
  }, [router]);

  // ② Firestoreから注文取得（checking の変更にだけ反応）
  useEffect(() => {
    if (checking) return; // Hooks の順序を守ったまま処理だけ止める

    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: Order[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Order, "id">;
        return {
          id: doc.id,
          ...data,
        };
      });
      setOrders(list);
    });

    return () => unsubscribe();
  }, [checking]);

  // ③ 権限チェック中画面（Hooks の後に return → OK）
  if (checking) {
    return (
      <main className="p-10 text-center text-zinc-600">
        権限を確認しています…
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        管理画面：注文一覧
      </h1>

      {/* データがないとき */}
      {orders.length === 0 && (
        <p className="text-zinc-600">注文はまだありません。</p>
      )}

      {/* テーブル */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border border-zinc-300">
          <thead className="bg-blue-50">
            <tr>
              <th className="border px-4 py-2">名前</th>
              <th className="border px-4 py-2">種別</th>
              <th className="border px-4 py-2">予算</th>
              <th className="border px-4 py-2">納期</th>
              <th className="border px-4 py-2">打ち合わせ</th>
              <th className="border px-4 py-2">日時</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr
                key={o.id}
                className="hover:bg-zinc-100 cursor-pointer"
                onClick={() => router.push(`/admin/order/${o.id}`)}
              >
                <td className="border px-4 py-2">{o.name}</td>
                <td className="border px-4 py-2">{o.type}</td>
                <td className="border px-4 py-2">{o.budgetRange}</td>
                <td className="border px-4 py-2">{o.deadline}</td>
                <td className="border px-4 py-2">{o.meeting}</td>
                <td className="border px-4 py-2">
                  {o.createdAt
                    ? new Date(o.createdAt.seconds * 1000).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}