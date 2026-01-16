"use client";

import Image from "next/image";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Home() {
  // Google ログイン
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

          {/* ログインボタン */}
          <button
            onClick={handleLogin}
            className="rounded-lg border-2 border-blue-700 text-blue-700 font-semibold px-4 py-2 bg-white hover:bg-blue-50 transition"
          >
            ログイン
          </button>
        </div>
      </header>

      {/* ナビ固定分の余白 */}
      <div className="h-16"></div>

      {/* ===================== */}
      {/*        HERO           */}
      {/* ===================== */}
      <section className="px-6 pt-20 pb-16 text-center">

        <div className="mx-auto max-w-3xl">
          <Image
            src="/hero/hero.png"
            alt="イベント企画とWeb制作"
            width={1200}
            height={800}
            className="w-full h-auto mx-auto"
            priority
          />
        </div>

        <h1 className="mt-10 text-4xl md:text-5xl font-bold text-blue-700 leading-tight">
          イベント企画 × Webサービス制作
        </h1>

        <p className="mt-4 text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto">
          企画から運用まで、あなたのアイデアを形にするワンストップ制作。
        </p>

        {/* HERO ボタン */}
        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/order"
            className="rounded-lg border-2 border-blue-700 text-blue-700 font-semibold px-6 py-3 bg-white hover:bg-blue-50 transition"
          >
            注文ページへ
          </a>

          <a
            href="/flow"
            className="rounded-lg border-2 border-blue-700 text-blue-700 font-semibold px-6 py-3 bg-white hover:bg-blue-50 transition"
          >
            作成の流れを見る
          </a>
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
          目的に合わせて最適な企画・制作をご提案します。
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="rounded-xl border border-zinc-200 p-8 shadow hover:shadow-lg transition">
            <Image src="/icons/event.png" alt="イベントアイコン" width={80} height={80} className="mb-4" />
            <h3 className="text-2xl font-semibold text-blue-700">イベント企画</h3>
            <p className="mt-3 text-zinc-700 leading-relaxed">
              オフ会・交流会・大型イベントなどの企画立案から、
              当日の運営マニュアル作成まで一貫して支援します。
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 p-8 shadow hover:shadow-lg transition">
            <Image src="/icons/web.png" alt="Webサービスアイコン" width={80} height={80} className="mb-4" />
            <h3 className="text-2xl font-semibold text-blue-700">Webサービス制作</h3>
            <p className="mt-3 text-zinc-700 leading-relaxed">
              予約サイト、管理アプリ、LP制作など、
              あなた専用のWebツールを設計から開発・運用までサポートします。
            </p>
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/*      初回特典        */}
      {/* ===================== */}
      <section className="bg-blue-50 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-blue-700">初回特典</h2>
        <p className="mt-4 text-lg text-zinc-700">
          初回ご依頼のお客様は制作費を
          <span className="font-bold text-blue-700"> 10% OFF </span>
          にて提供いたします。
        </p>
      </section>

      {/* ===================== */}
      {/*      返金保証         */}
      {/* ===================== */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-blue-700">安心の保証</h2>
        <div className="mt-10 rounded-xl border border-zinc-200 shadow-md p-8 bg-white">
          <h3 className="text-2xl font-semibold text-blue-700">全額返金保証</h3>
          <p className="mt-4 text-zinc-700 leading-relaxed">
            初回制作にご満足いただけなかった場合、制作費を全額返金いたします。
          </p>
        </div>
      </section>

      {/* ===================== */}
      {/*      料金プラン       */}
      {/* ===================== */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-blue-700">料金プラン</h2>

        <p className="mt-4 text-center text-zinc-600">
          初めての方でも安心してご依頼いただける料金設定です。
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* イベント企画 */}
          <div className="rounded-xl border border-zinc-200 shadow-md p-8 bg-white hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-blue-700">イベント企画プラン</h3>
            <p className="mt-4 text-4xl font-bold text-blue-700">
              ¥8,000<span className="text-lg font-normal text-zinc-500">〜</span>
            </p>
            <p className="mt-4 text-zinc-700 leading-relaxed">
              小規模イベント・オフ会などの企画書作成、打ち合わせサポートを含むプランです。
            </p>

            <a
              href="/order"
              className="mt-8 inline-block rounded-lg border-2 border-blue-700 text-blue-700 font-semibold px-6 py-3 bg-white hover:bg-blue-50 transition"
            >
              注文ページへ
            </a>
          </div>

          {/* Web制作 */}
          <div className="rounded-xl border border-zinc-200 shadow-md p-8 bg-white hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-blue-700">Web制作プラン</h3>
            <p className="mt-4 text-4xl font-bold text-blue-700">
              ¥15,000<span className="text-lg font-normal text-zinc-500">〜</span>
            </p>
            <p className="mt-4 text-zinc-700 leading-relaxed">
              予約サイト、Webアプリ、オーダーメイド機能などを制作するプランです。
            </p>

            <a
              href="/order"
              className="mt-8 inline-block rounded-lg border-2 border-blue-700 text-blue-700 font-semibold px-6 py-3 bg-white hover:bg-blue-50 transition"
            >
              注文ページへ
            </a>
          </div>

        </div>
      </section>

      {/* ===================== */}
      {/*    制作の流れ         */}
      {/* ===================== */}
      <section className="bg-zinc-50 py-20 px-6">
        <h2 className="text-3xl font-bold text-blue-700 text-center">制作の流れ（3ステップ）</h2>

        <div className="mx-auto max-w-4xl mt-12 space-y-10">
          {[
            { title: "1. 依頼 → 初回打ち合わせ", desc: "フォーム送信後、24時間以内にご連絡します。" },
            { title: "2. 企画・制作スタート", desc: "ヒアリング内容をもとに制作を開始します。" },
            { title: "3. 納品 → アフターサポート", desc: "納品後の運用サポートも可能です。" },
          ].map((step, i) => (
            <div key={i} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-md">
              <h3 className="text-xl font-semibold text-blue-700">{step.title}</h3>
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
          イベント企画・Web制作の両方に対応しています。
        </p>

        <a
          href="/order"
          className="mt-8 inline-block rounded-lg border-2 border-blue-700 text-blue-700 font-semibold px-8 py-3 bg-white hover:bg-blue-50 transition"
        >
          注文ページへ進む
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