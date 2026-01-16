"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

const ADMIN_UID = "ajzzRAmUreOMqQpzcrje7aAw43k2";

type Status = "未対応" | "進行中" | "完了";

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
  status?: Status;
  adminMemo?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

function badgeClass(status: Status) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border";
  if (status === "未対応")
    return `${base} bg-red-50 text-red-700 border-red-200`;
  if (status === "進行中")
    return `${base} bg-amber-50 text-amber-700 border-amber-200`;
  return `${base} bg-emerald-50 text-emerald-700 border-emerald-200`;
}

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<Status>("未対応");
  const [memo, setMemo] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(true);

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

  // ② 注文を1件読み込み
  useEffect(() => {
    if (checking) return;
    if (!id) return;

    const fetchOrder = async () => {
      setLoadingOrder(true);
      try {
        const ref = doc(db, "orders", id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          alert("データが見つかりませんでした。");
          router.push("/admin");
          return;
        }

        const data = { id: snap.id, ...(snap.data() as Omit<Order, "id">) };
        setOrder(data);

        const st = (data.status ?? "未対応") as Status;
        setStatus(st);
        setMemo(data.adminMemo ?? "");
      } catch (e) {
        console.error(e);
        alert("読み込みに失敗しました。権限やネットワークを確認してください。");
      } finally {
        setLoadingOrder(false);
      }
    };

    fetchOrder();
  }, [checking, id, router]);

  const createdText = useMemo(() => {
    if (!order?.createdAt) return "-";
    return new Date(order.createdAt.seconds * 1000).toLocaleString();
  }, [order?.createdAt]);

  const updatedText = useMemo(() => {
    if (!order?.updatedAt) return "-";
    return new Date(order.updatedAt.seconds * 1000).toLocaleString();
  }, [order?.updatedAt]);

  const summaryText = useMemo(() => {
    if (!order) return "";
    return `【注文情報】
ステータス：${status}
名前：${order.name}
メール：${order.email}
電話番号：${order.phone}
種別：${order.type}
予算：${order.budgetRange}
希望納期：${order.deadline}
打ち合わせ方法：${order.meeting}

【詳細内容】
${order.details}

【管理者メモ】
${memo || "-"}
`;
  }, [order, status, memo]);

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      alert("内容をコピーしました！");
    } catch (e) {
      console.error(e);
      alert("コピーに失敗しました。");
    }
  };

  const save = async () => {
    if (!order) return;
    setSaving(true);

    try {
      const ref = doc(db, "orders", order.id);
      await updateDoc(ref, {
        status,
        adminMemo: memo,
        updatedAt: serverTimestamp(),
      });

      // 画面側も updatedAt を更新（次のリロードまでの見た目用）
      setOrder((prev) =>
        prev
          ? {
              ...prev,
              status,
              adminMemo: memo,
              // updatedAt は serverTimestamp なので即時値は不明。
              // 表示はリロードor次回取得で反映されるのでここはそのままでOK。
            }
          : prev
      );

      alert("保存しました！");
    } catch (e) {
      console.error(e);
      alert("保存に失敗しました（ルールが update を許可しているか確認してください）");
    } finally {
      setSaving(false);
    }
  };

  if (checking) {
    return (
      <main className="p-10 text-center text-zinc-600">
        権限を確認しています…
      </main>
    );
  }

  if (loadingOrder) {
    return (
      <main className="p-10 text-center text-zinc-600">読み込み中…</main>
    );
  }

  if (!order) {
    return (
      <main className="p-10 text-center text-zinc-600">
        データがありません。
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">注文の詳細</h1>
          <p className="text-zinc-600 mt-2 text-sm">注文ID：{order.id}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={copySummary}
            className="rounded-lg bg-blue-600 text-white font-semibold px-4 py-2 hover:bg-blue-700 transition"
          >
            まとめをコピー
          </button>
          <button
            onClick={() => router.push("/admin")}
            className="rounded-lg border border-blue-700 text-blue-700 font-semibold px-4 py-2 hover:bg-blue-50 transition"
          >
            一覧へ戻る
          </button>
        </div>
      </div>

      {/* ステータス / 保存 */}
      <div className="mt-10 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold">ステータス</span>
            <select
              className="border rounded-lg px-3 py-2"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
            >
              <option value="未対応">未対応</option>
              <option value="進行中">進行中</option>
              <option value="完了">完了</option>
            </select>
            <span className={badgeClass(status)}>{status}</span>
          </div>

          <button
            onClick={save}
            disabled={saving}
            className="rounded-lg bg-zinc-900 text-white font-semibold px-5 py-2 hover:bg-zinc-800 transition disabled:opacity-60"
          >
            {saving ? "保存中..." : "保存する"}
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {/* 基本情報 */}
          <div className="rounded-lg border border-zinc-200 p-4 bg-zinc-50">
            <h2 className="font-semibold text-zinc-900 mb-3">基本情報</h2>
            <p className="mb-1">
              <strong>名前：</strong> {order.name}
            </p>
            <p className="mb-1">
              <strong>メール：</strong>{" "}
              <a
                href={`mailto:${order.email}`}
                className="text-blue-600 underline"
              >
                {order.email}
              </a>
            </p>
            <p className="mb-1">
              <strong>電話番号：</strong>{" "}
              <a href={`tel:${order.phone}`} className="text-blue-600 underline">
                {order.phone}
              </a>
            </p>
            <p className="mb-1">
              <strong>注文日時：</strong> {createdText}
            </p>
            <p className="mb-1 text-sm text-zinc-600">
              <strong>最終更新：</strong> {updatedText}
            </p>
          </div>

          {/* 注文内容 */}
          <div className="rounded-lg border border-zinc-200 p-4 bg-zinc-50">
            <h2 className="font-semibold text-zinc-900 mb-3">注文内容</h2>
            <p className="mb-1">
              <strong>種別：</strong> {order.type}
            </p>
            <p className="mb-1">
              <strong>予算：</strong> {order.budgetRange}
            </p>
            <p className="mb-1">
              <strong>希望納期：</strong> {order.deadline}
            </p>
            <p className="mb-1">
              <strong>打ち合わせ：</strong> {order.meeting}
            </p>
          </div>
        </div>

        {/* 詳細 */}
        <div className="mt-6 rounded-lg border border-zinc-200 p-4 bg-white">
          <h2 className="font-semibold text-zinc-900 mb-3">詳細内容</h2>
          <p className="whitespace-pre-wrap bg-zinc-50 border rounded p-4">
            {order.details}
          </p>
        </div>

        {/* メモ */}
        <div className="mt-6 rounded-lg border border-zinc-200 p-4 bg-white">
          <h2 className="font-semibold text-zinc-900 mb-3">管理者メモ</h2>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            rows={6}
            className="w-full border rounded-lg px-4 py-3"
            placeholder="例：次回はGoogle Meet希望。見積りは〇〇円で提案。要確認：会場候補…"
          />
          <p className="text-xs text-zinc-500 mt-2">
            ※「保存する」を押すと Firestore に保存されます。
          </p>
        </div>
      </div>
    </main>
  );
}