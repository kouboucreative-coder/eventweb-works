"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const ADMIN_UID = "ajzzRAmUreOMqQpzcrje7aAw43k2"; // 管理者UID

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<any>(null);
  const [checking, setChecking] = useState(true);

  // ① 管理者チェック
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.uid !== ADMIN_UID) {
        router.push("/");
        return;
      }
      setChecking(false);
    });

    return () => unsubscribe();
  }, [router]);

  // ② Firestore から1件取得
  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      const ref = doc(db, "orders", id as string);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        alert("データが見つかりません。");
        router.push("/admin");
        return;
      }

      setOrder({ id: snap.id, ...snap.data() });
    };

    fetchOrder();
  }, [id, router]);

  // ローディング
  if (checking) {
    return (
      <main className="p-10 text-center text-zinc-600">
        権限を確認しています…
      </main>
    );
  }

  if (!order) {
    return (
      <main className="p-10 text-center text-zinc-600">
        読み込み中…
      </main>
    );
  }

  // コピペ用要約
  const summary = `【注文情報】
名前：${order.name}
メール：${order.email}
電話番号：${order.phone}
種別：${order.type}
予算：${order.budgetRange}
希望納期：${order.deadline}
打ち合わせ方法：${order.meeting}

【詳細内容】
${order.details}
`;

  const copySummary = () => {
    navigator.clipboard.writeText(summary);
    alert("内容をコピーしました！");
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">注文の詳細</h1>

      {/* まとめコピー */}
      <button
        onClick={copySummary}
        className="mb-6 rounded-lg bg-blue-600 text-white font-semibold px-5 py-2 hover:bg-blue-700 transition"
      >
        内容をまとめてコピー
      </button>

      {/* 基本情報 */}
      <div className="space-y-6">

        {/* カード1：基本情報 */}
        <div className="rounded-xl border border-zinc-300 p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">基本情報</h2>

          <p><strong>名前：</strong> {order.name}</p>

          <p>
            <strong>メール：</strong>{" "}
            <a href={`mailto:${order.email}`} className="text-blue-600 underline">
              {order.email}
            </a>
          </p>

          <p>
            <strong>電話番号：</strong>{" "}
            <a href={`tel:${order.phone}`} className="text-blue-600 underline">
              {order.phone}
            </a>
          </p>
        </div>

        {/* カード2：注文条件 */}
        <div className="rounded-xl border border-zinc-300 p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">注文内容</h2>

          <p><strong>種別：</strong> {order.type}</p>
          <p><strong>予算：</strong> {order.budgetRange}</p>
          <p><strong>希望納期：</strong> {order.deadline}</p>
          <p><strong>打ち合わせ方法：</strong> {order.meeting}</p>
        </div>

        {/* カード3：詳細内容 */}
        <div className="rounded-xl border border-zinc-300 p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">詳細内容</h2>

          <p className="whitespace-pre-wrap bg-zinc-50 border rounded p-4">
            {order.details}
          </p>
        </div>

        {/* カード4：注文日時 */}
        <div className="rounded-xl border border-zinc-300 p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">注文日時</h2>
          <p>
            {order.createdAt
              ? new Date(order.createdAt.seconds * 1000).toLocaleString()
              : "-"}
          </p>
        </div>
      </div>

      {/* 戻るボタン */}
      <button
        onClick={() => router.push("/admin")}
        className="mt-10 rounded-lg border border-blue-700 text-blue-700 font-semibold px-6 py-3 hover:bg-blue-50 transition"
      >
        一覧へ戻る
      </button>
    </main>
  );
}