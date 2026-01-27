"use client";

import Image from "next/image";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Home() {
  // Google ログイン（管理者用）
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("ログインしました！");
    } catch (error) {
      console.error(error);
      alert("ログインに失敗しました");
    }
  };

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* ===================== */}
      {/*      ナビゲーション     */}
      {/* ===================== */}
      <header className="w-full border-b border-zinc-200 bg-white fixed top-0 left-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* サイト名 */}
          <div className="text-xl font-bold text-blue-700">
            EventWeb Works
          </div>

          {/* 管理者ログイン */}
          <button
            onClick={handleLogin}
            className="rounded-lg border-2 border-blue-700 text-blue-700 font-semibold px-4 py-2 bg-white hover:bg-blue-50 transition"
          >
            管理者ログイン
          </button>
        </div>
      </header>

      {/* ナビ固定分の余白 */}
      <div className="h-16" />

      {/* ===================== */}
      {/*        HERO           */}
      {/* ===================== */}
      <section className="px-6 pt-16 pb-20">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* 左：テキスト */}
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold text-blue-700">
              イベント企画 × Webサービス制作
            </p>

            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-blue-700 leading-tight">
              オフ会・イベント運営と
              <br className="hidden md:block" />
              Web制作をまとめて相談
            </h1>

            <p className="mt-4 text-lg md:text-xl text-zinc-600 leading-relaxed">
              小規模イベントから、管理しやすいWebツールの制作まで。
              <br className="hidden md:block" />
              企画・設計・制作・運用をワンストップでサポートします。
            </p>

            {/* HERO ボタン */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/order"
                className="w-full sm:w-auto text-center rounded-lg bg-blue-700 text-white font-semibold px-6 py-3 hover:bg-blue-800 transition"
              >
                制作・相談を申し込む
              </a>

              <a
                href="/flow"
                className="w-full sm:w-auto text-center rounded-lg border-2 border-blue-700 text-blue-700 font-semibold px-6 py-3 bg-white hover:bg-blue-50 transition"
              >
                制作の流れを見る
              </a>
            </div>

            <p className="mt-3 text-xs text-zinc-500">
              初回ヒアリング（30〜60分）と概算お見積りのご提示までは無料です。
            </p>
          </div>

          {/* 右：ヒーロー画像 */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-xl">
              <div className="absolute inset-0 rounded-3xl bg-blue-50 blur-2xl opacity-70" />
              <div className="relative rounded-3xl border border-zinc-200 bg-white shadow-lg overflow-hidden">
                <Image
                  src="/hero/hero.png"
                  alt="イベント企画とWeb制作のイメージ"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/*    サービス紹介       */}
      {/* ===================== */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-blue-700">
          提供サービス
        </h2>

        <p className="mt-4 text-center text-zinc-600">
          イベント運営とWeb制作を組み合わせて、
          「やりたいこと」を実現しやすい形に整えます。
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* イベント企画 */}
          <div className="rounded-xl border border-zinc-200 p-8 shadow hover:shadow-lg transition bg-white">
            <Image
              src="/icons/event.png"
              alt="イベントアイコン"
              width={80}
              height={80}
              className="mb-4"
            />
            <h3 className="text-2xl font-semibold text-blue-700">
              イベント企画・運営サポート
            </h3>
            <p className="mt-3 text-zinc-700 leading-relaxed">
              オフ会・交流会・ファンイベントなどの企画立案から、
              当日の運営マニュアル、受付フローの設計まで一貫して支援します。
            </p>
            <p className="mt-3 text-sm text-zinc-500">
              ※会場手配や当日の現地スタッフ手配は別途ご相談となります。
            </p>
          </div>

          {/* Web制作 */}
          <div className="rounded-xl border border-zinc-200 p-8 shadow hover:shadow-lg transition bg-white">
            <Image
              src="/icons/web.png"
              alt="Webサービスアイコン"
              width={80}
              height={80}
              className="mb-4"
            />
            <h3 className="text-2xl font-semibold text-blue-700">
              Webサイト／Webサービス制作
            </h3>
            <p className="mt-3 text-zinc-700 leading-relaxed">
              予約サイト、イベント管理ツール、LP（ランディングページ）など、
              必要な機能に絞った「ちょうどいい」Web制作を行います。
            </p>
            <p className="mt-3 text-sm text-zinc-500">
              使用技術：Next.js／TypeScript／Firebase など
            </p>
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/*      初回特典        */}
      {/* ===================== */}
      <section className="bg-blue-50 py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-700">初回ご依頼特典</h2>
          <p className="mt-4 text-lg text-zinc-700 leading-relaxed">
            初回ご依頼のお客様は、
            <span className="font-bold text-blue-700"> 制作費 50% OFF </span>
            にて対応いたします。
            <br />
            「まずは小さく試したい」という方も歓迎です。
          </p>
        </div>
      </section>

      {/* ===================== */}
      {/*      返金保証         */}
      {/* ===================== */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-blue-700">安心の保証</h2>
        <div className="mt-10 rounded-xl border border-zinc-200 shadow-md p-8 bg-white">
          <h3 className="text-2xl font-semibold text-blue-700">全額返金保証</h3>
          <p className="mt-4 text-zinc-700 leading-relaxed">
            初回制作にご満足いただけなかった場合、
            制作費を全額返金いたします（※詳細はお見積り時にご案内します）。
          </p>
        </div>
      </section>

      {/* ===================== */}
      {/*      料金プラン       */}
      {/* ===================== */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-blue-700">
          料金の目安
        </h2>

        <p className="mt-4 text-center text-zinc-600">
          内容やボリュームにより前後しますが、
          おおよその目安としてご参考ください。
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* イベント企画 */}
          <div className="rounded-xl border border-zinc-200 shadow-md p-8 bg-white hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-blue-700">
              イベント企画プラン
            </h3>
            <p className="mt-4 text-4xl font-bold text-blue-700">
              ¥8,000<span className="text-lg font-normal text-zinc-500">〜</span>
            </p>
            <p className="mt-4 text-zinc-700 leading-relaxed">
              小規模オフ会・交流会などの企画書作成、進行案、オンライン打ち合わせ
              などを含むプランです。
            </p>
            <p className="mt-3 text-xs text-zinc-500">
              ※会場費・飲食代などの実費は含まれません。
            </p>

            <a
              href="/order"
              className="mt-8 inline-block rounded-lg border-2 border-blue-700 text-blue-700 font-semibold px-6 py-3 bg-white hover:bg-blue-50 transition"
            >
              制作・相談を申し込む
            </a>
          </div>

          {/* Web制作 */}
          <div className="rounded-xl border border-zinc-200 shadow-md p-8 bg-white hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-blue-700">
              Web制作プラン
            </h3>
            <p className="mt-4 text-4xl font-bold text-blue-700">
              ¥15,000<span className="text-lg font-normal text-zinc-500">〜</span>
            </p>
            <p className="mt-4 text-zinc-700 leading-relaxed">
              予約サイト、簡易Webアプリ、LP制作など、
              必要な機能に絞ったWebサイト／サービスを制作します。
            </p>
            <p className="mt-3 text-xs text-zinc-500">
              ※複雑なシステムや大規模サービスの場合は、別途お見積りとなります。
            </p>

            <a
              href="/order"
              className="mt-8 inline-block rounded-lg border-2 border-blue-700 text-blue-700 font-semibold px-6 py-3 bg-white hover:bg-blue-50 transition"
            >
              制作・相談を申し込む
            </a>
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/*    制作の流れ         */}
      {/* ===================== */}
      <section className="bg-zinc-50 py-20 px-6">
        <h2 className="text-3xl font-bold text-blue-700 text-center">
          制作の流れ（3ステップ）
        </h2>

        <div className="mx-auto max-w-4xl mt-12 space-y-10">
          {[
            {
              title: "1. フォームからご依頼 → 日程調整",
              desc: "フォーム送信後、24時間以内にご連絡し、オンライン打ち合わせの日程を決めます。",
            },
            {
              title: "2. ヒアリング → 企画・見積り",
              desc: "ご要望をお伺いし、実現方法のご提案とお見積り、スケジュール案をご提示します。",
            },
            {
              title: "3. 制作 → 納品・サポート",
              desc: "内容確定後に制作を進め、納品後の簡単な修正や運用のご相談にも対応します。",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-200 bg-white p-6 shadow-md"
            >
              <h3 className="text-xl font-semibold text-blue-700">
                {step.title}
              </h3>
              <p className="mt-2 text-zinc-700">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/flow"
            className="inline-block rounded-lg border-2 border-blue-700 text-blue-700 font-semibold px-8 py-3 bg-white hover:bg-blue-50 transition"
          >
            詳しい流れを見る
          </a>
        </div>
      </section>

      {/* ===================== */}
      {/*        最後のCTA       */}
      {/* ===================== */}
      <section className="py-20 px-6 bg-gradient-to-b from-blue-600 to-blue-500 text-white text-center">
        <h2 className="text-3xl font-bold">まずはお気軽にご相談ください</h2>
        <p className="mt-4 text-blue-100">
          「こんなことお願いしても大丈夫かな？」という段階でも問題ありません。
          <br />
          一緒に、現実的な形へ落とし込んでいきましょう。
        </p>

        <a
          href="/order"
          className="mt-8 inline-block rounded-lg border-2 border-blue-700 text-blue-700 font-semibold px-8 py-3 bg-white hover:bg-blue-50 transition"
        >
          制作・相談を申し込む
        </a>

        {/* ▼ 管理者ページボタン ▼ */}
        <div className="mt-6">
          <a
            href="/admin"
            className="inline-block rounded-lg border-2 border-white text-white font-semibold px-8 py-3 bg-blue-700 hover:bg-blue-600 transition"
          >
            管理者ページへ
          </a>
        </div>
      </section>
    </main>
  );
}
