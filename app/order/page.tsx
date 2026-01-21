"use client";

import Script from "next/script";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const CREATE_ORDER_URL =
  "https://asia-northeast1-ankensite.cloudfunctions.net/createOrder";

// .env.local に入れた Site key（公開鍵）
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export default function OrderPage() {
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false); // ✅ 同意チェック用
  const router = useRouter();

  // reCAPTCHA v3 のトークン取得
  const getRecaptchaToken = async (): Promise<string> => {
    if (!SITE_KEY) {
      throw new Error(
        "reCAPTCHA の Site key が設定されていません。（.env.local を確認してください）"
      );
    }

    const w = window as any;

    if (!w.grecaptcha || !w.grecaptcha.execute) {
      throw new Error(
        "reCAPTCHA の読み込みに失敗しました。ページを再読み込みするか、広告ブロッカー等を確認してください。"
      );
    }

    // ★ Functions 側の RECAPTCHA_ACTION = "create_order" と合わせる
    const token = await w.grecaptcha.execute(SITE_KEY, {
      action: "create_order",
    });
    return token;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const order = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      type: formData.get("type"),
      budgetRange: formData.get("budgetRange"),
      deadline: formData.get("deadline"),
      meeting: formData.get("meeting"),
      details: formData.get("details"),
    };

    try {
      // ① reCAPTCHA トークン取得
      const recaptchaToken = await getRecaptchaToken();

      // ② Cloud Functions(createOrder)へ送信
      const res = await fetch(CREATE_ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recaptchaToken, order }),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok || !json || json.ok === false) {
        const blocked = json?.blocked;

        if (blocked) {
          alert(
            "セキュリティ判定により送信を完了できませんでした。\n時間をおいて再度お試しください。\n送信できない場合はメール（koubou.creative@gmail.com）へご連絡ください。"
          );
        } else {
          alert("送信中にエラーが発生しました。時間をおいて再度お試しください。");
        }
        console.error("createOrder error:", json);
        setLoading(false);
        return;
      }

      // 成功
      form.reset();
      setAgreed(false); // ✅ チェックもリセット
      router.push("/order/complete");
    } catch (err) {
      alert("送信中にエラーが発生しました。");
      console.error(err);
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      {/* reCAPTCHA v3 のスクリプトを読み込み */}
      {SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}

      <h1 className="text-3xl font-bold text-blue-700 text-center">
        注文フォーム
      </h1>

      <p className="text-center text-zinc-600 mt-3">
        必要事項をご入力ください。送信後、24時間以内にご連絡します。
      </p>

      {!SITE_KEY && (
        <p className="mt-4 rounded bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
          開発者向けメッセージ：NEXT_PUBLIC_RECAPTCHA_SITE_KEY が設定されていません。
          .env.local を確認して、開発サーバーを再起動してください。
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        {/* 名前 */}
        <div>
          <label className="font-semibold">お名前 *</label>
          <input
            type="text"
            name="name"
            required
            className="mt-2 w-full border rounded px-4 py-2"
          />
        </div>

        {/* メール */}
        <div>
          <label className="font-semibold">メールアドレス *</label>
          <input
            type="email"
            name="email"
            required
            className="mt-2 w-full border rounded px-4 py-2"
          />
        </div>

        {/* 電話番号 */}
        <div>
          <label className="font-semibold">電話番号 *</label>
          <input
            type="tel"
            name="phone"
            required
            className="mt-2 w-full border rounded px-4 py-2"
          />
        </div>

        {/* 注文種別 */}
        <div>
          <label className="font-semibold">注文種別 *</label>
          <select
            name="type"
            required
            className="mt-2 w-full border rounded px-4 py-2"
          >
            <option value="">選択してください</option>
            <option value="イベント企画">イベント企画</option>
            <option value="Web制作">Web制作</option>
            <option value="両方">両方</option>
          </select>
        </div>

        {/* 予算の目安 */}
        <div>
          <label className="font-semibold">予算の目安 *</label>
          <select
            name="budgetRange"
            required
            className="mt-2 w-full border rounded px-4 py-2"
          >
            <option value="">選択してください</option>
            <option value="5000-10000">¥5,000〜¥10,000</option>
            <option value="10000-20000">¥10,000〜¥20,000</option>
            <option value="20000-30000">¥20,000〜¥30,000</option>
            <option value="30000over">¥30,000以上</option>
          </select>
        </div>

        {/* 希望納期 */}
        <div>
          <label className="font-semibold">希望納期 *</label>
          <select
            name="deadline"
            required
            className="mt-2 w-full border rounded px-4 py-2"
          >
            <option value="">選択してください</option>
            <option value="no-rush">急ぎではない</option>
            <option value="1week">1週間以内</option>
            <option value="2week">2週間以内</option>
            <option value="1month">1ヶ月以内</option>
            <option value="other">その他（詳細欄に記入）</option>
          </select>
        </div>

        {/* 打ち合わせ方法 */}
        <div>
          <label className="font-semibold">打ち合わせ方法 *</label>
          <div className="mt-2 space-y-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="meeting" value="Zoom" required /> Zoom
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="meeting" value="Google Meet" /> Google
              Meet
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="meeting" value="LINE" /> LINE
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="meeting" value="Discord" /> Discord
            </label>
          </div>
        </div>

        {/* 詳細内容 */}
        <div>
          <label className="font-semibold">詳細内容（依頼内容） *</label>
          <textarea
            name="details"
            required
            rows={6}
            className="mt-2 w-full border rounded px-4 py-2"
            placeholder="例：50人規模のオフ会イベントを企画したいです。テーマは〇〇で、場所は△△を予定しています…"
          />
        </div>

        {/* プライバシーポリシー同意 */}
        <div className="mt-4">
          <label className="flex items-start gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              className="mt-1"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
            />
            <span>
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline"
              >
                プライバシーポリシー
              </a>
              に同意します
            </span>
          </label>
        </div>

        {/* 送信ボタン */}
        <button
          type="submit"
          disabled={loading || !SITE_KEY || !agreed}
          className="mt-6 w-full rounded-lg bg-blue-700 text-white font-semibold py-3 hover:bg-blue-800 transition disabled:opacity-60"
        >
          {loading ? "送信中..." : "送信する"}
        </button>

        <p className="text-xs text-zinc-500 mt-2">
          ※送信できない場合はメール（koubou.creative@gmail.com）へご連絡ください。
        </p>
      </form>
    </main>
  );
}