// app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | EventWeb Works",
  description:
    "EventWeb Works のプライバシーポリシーです。注文フォームで取得した個人情報の取り扱いについて記載しています。",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        プライバシーポリシー
      </h1>

      <p className="text-zinc-700 leading-relaxed mb-6">
        EventWeb Works（以下、「当サービス」といいます）は、
        本サービスの提供にあたり取得した個人情報を、関係法令およびガイドラインを遵守して適切に取り扱います。
        本ページでは、当サービスにおける個人情報の取り扱いについてご説明します。
      </p>

      {/* 1. 事業者情報 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          1. 事業者情報
        </h2>
        <p className="text-zinc-700 leading-relaxed">
          運営者名：EventWeb Works（個人運営）
          <br />
          連絡先メールアドレス：koubou.creative@gmail.com
        </p>
      </section>

      {/* 2. 取得する情報 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          2. 取得する個人情報
        </h2>
        <p className="text-zinc-700 leading-relaxed mb-2">
          当サービスの注文フォーム等を通じて、主に以下の情報を取得します。
        </p>
        <ul className="list-disc pl-6 text-zinc-700 space-y-1">
          <li>お名前</li>
          <li>メールアドレス</li>
          <li>電話番号</li>
          <li>打ち合わせ方法（Zoom / Google Meet / LINE / Discord など）</li>
          <li>ご依頼内容・ご相談内容</li>
          <li>
            技術的に取得される情報（IPアドレス、ブラウザ情報、reCAPTCHA による判定情報 など）
          </li>
        </ul>
      </section>

      {/* 3. 利用目的 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          3. 個人情報の利用目的
        </h2>
        <p className="text-zinc-700 leading-relaxed mb-2">
          取得した個人情報は、以下の目的の範囲内で利用します。
        </p>
        <ul className="list-disc pl-6 text-zinc-700 space-y-1">
          <li>お問い合わせ・ご注文内容への回答や確認のご連絡</li>
          <li>イベント企画・Webサイト制作など、当サービスの提供および運営のため</li>
          <li>打ち合わせの日程調整や、制作進行に関するご連絡のため</li>
          <li>不正アクセス・スパム送信の検知および防止のため</li>
          <li>サービス品質向上のための分析（統計情報として利用する場合、個人を特定できない形に加工します）</li>
        </ul>
      </section>

      {/* 4. 第三者提供 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          4. 第三者への提供について
        </h2>
        <p className="text-zinc-700 leading-relaxed">
          取得した個人情報は、次の場合を除き、本人の同意なく第三者に提供することはありません。
        </p>
        <ul className="list-disc pl-6 text-zinc-700 space-y-1 mt-2">
          <li>法令に基づく場合</li>
          <li>人の生命・身体・財産の保護のために必要がある場合で、本人の同意を得ることが困難なとき</li>
          <li>利用目的の達成に必要な範囲で業務委託を行う場合</li>
        </ul>
      </section>

      {/* 5. 業務委託 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          5. 業務委託先の管理
        </h2>
        <p className="text-zinc-700 leading-relaxed">
          当サービスは、必要に応じて一部業務を外部の事業者に委託する場合があります。
          この場合、委託先に対して適切な契約や管理を行い、個人情報が安全に取り扱われるよう努めます。
        </p>
      </section>

      {/* 6. 安全管理措置 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          6. 個人情報の管理
        </h2>
        <p className="text-zinc-700 leading-relaxed">
          当サービスは、個人情報への不正アクセス、紛失、改ざん、漏洩などを防止するため、
          適切な安全管理措置を講じます。
          また、個人情報を必要以上の期間保有せず、利用目的の達成に不要となった場合には
          適切な方法で削除・廃棄します。
        </p>
      </section>

      {/* 7. 開示・訂正・削除 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          7. 開示・訂正・削除等のご請求
        </h2>
        <p className="text-zinc-700 leading-relaxed">
          ご本人から、ご自身の個人情報の開示・訂正・利用停止・削除などのご希望があった場合は、
          ご本人確認のうえ、合理的な範囲で速やかに対応いたします。
          その際は、下記のお問い合わせ窓口までご連絡ください。
        </p>
      </section>

      {/* 8. 改定 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          8. プライバシーポリシーの変更
        </h2>
        <p className="text-zinc-700 leading-relaxed">
          本ポリシーの内容は、法令の改正やサービス内容の変更などに応じて、事前の予告なく改定される場合があります。
          重要な変更がある場合は、本サイト上でお知らせします。
        </p>
      </section>

      {/* 9. お問い合わせ窓口 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          9. お問い合わせ窓口
        </h2>
        <p className="text-zinc-700 leading-relaxed">
          本ポリシーに関するお問い合わせは、以下のメールアドレスまでご連絡ください。
          <br />
          メールアドレス：koubou.creative@gmail.com
        </p>
      </section>

      <p className="text-sm text-zinc-500 mt-8">
        制定日：2025年1月15日
      </p>
    </main>
  );
}