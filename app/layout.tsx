import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "EventWeb Works | イベント企画 × Web制作",
  description: "イベント企画とWebサービス制作をワンストップで提供する制作サービス",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="text-zinc-900">

        {/* ====== Navbar ====== */}
        <header className="w-full border-b bg-white">
          <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-700">
              EventWeb Works
            </Link>

            <div className="flex gap-6 text-zinc-700">
              <Link href="/order" className="hover:text-blue-700 transition">注文</Link>
              <Link href="/flow" className="hover:text-blue-700 transition">作成の流れ</Link>
            </div>
          </nav>
        </header>


        {/* ====== Page Content ====== */}
        <main>{children}</main>


        {/* ====== Footer（企業サイト仕様） ====== */}
        <footer className="mt-20 bg-[#f7f7f7] border-t">
          <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Column 1: Site Name */}
            <div>
              <h3 className="text-xl font-bold text-blue-700">EventWeb Works</h3>
              <p className="mt-3 text-zinc-600 text-sm">
                イベント企画 × Webサービス制作をワンストップで対応。
                企画から運用までまるごとお任せください。
              </p>
            </div>

            {/* Column 2: Services */}
            <div>
              <h4 className="text-lg font-semibold text-zinc-800">サービス</h4>
              <ul className="mt-3 space-y-2 text-zinc-700 text-sm">
                <li>
                  <Link href="/order" className="hover:text-blue-700 transition">
                    イベント企画
                  </Link>
                </li>
                <li>
                  <Link href="/order" className="hover:text-blue-700 transition">
                    Webサービス制作
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h4 className="text-lg font-semibold text-zinc-800">お問い合わせ</h4>
              <ul className="mt-3 space-y-2 text-zinc-700 text-sm">
                <li>
                  <Link href="/order" className="hover:text-blue-700 transition">
                    注文ページへ
                  </Link>
                </li>
                <li>
                  <Link href="/flow" className="hover:text-blue-700 transition">
                    作成の流れを見る
                  </Link>
                </li>
              </ul>

              <p className="mt-4 text-xs text-zinc-500">
                送信後 24 時間以内にご返信いたします。
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t py-4 text-center text-sm text-zinc-500">
            © 2025 EventWeb Works
          </div>
        </footer>

      </body>
    </html>
  );
}