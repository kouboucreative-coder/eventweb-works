export default function OrderCompletePage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm p-8 md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 px-4 py-2 text-sm font-semibold">
            ✅ 送信完了
          </div>

          <h1 className="mt-6 text-3xl md:text-4xl font-bold text-blue-700">
            ご依頼を受け付けました！
          </h1>

          <p className="mt-4 text-zinc-700 leading-relaxed">
            内容を確認し、<span className="font-semibold">24時間以内</span>にご連絡します。
            ご依頼いただきありがとうございます。
          </p>

          {/* 次の流れ */}
          <div className="mt-10 grid gap-4">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm font-semibold text-zinc-900">次に起きること</p>
              <ol className="mt-3 space-y-2 text-zinc-700">
                <li>1. 内容を確認（不足があれば追加で質問します）</li>
                <li>2. 打ち合わせ日程の調整（Zoom / Meet / LINE / Discord）</li>
                <li>3. 方針決定 → 制作開始</li>
              </ol>
            </div>

            {/* 🔽 メール受信のお願い（追加部分） */}
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-800">
                メール受信設定のご確認をお願いします
              </p>

              <p className="mt-3 text-zinc-700 leading-relaxed">
                ご連絡は、以下のメールアドレスからお送りします。
                迷惑メール対策や受信制限を設定されている場合は、
                <span className="font-semibold">受信を許可</span>していただけると確実です。
              </p>

              <div className="mt-4 rounded-lg bg-white border border-blue-200 px-4 py-3 font-mono text-blue-700 text-sm">
                koubou.creative@gmail.com
              </div>

              <ul className="mt-4 text-zinc-700 text-sm space-y-1">
                <li>・迷惑メールフォルダに振り分けられていないか</li>
                <li>・ドメイン / アドレスの受信拒否設定がないか</li>
                <li>・Gmail / キャリアメールをご利用の場合は特にご確認ください</li>
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <p className="text-sm font-semibold text-zinc-900">ご連絡が来ない場合</p>
              <p className="mt-3 text-zinc-700 leading-relaxed">
                24時間以上経っても連絡がない場合は、
                メールの受信状況をご確認のうえ、再度ご連絡ください。
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              href="/"
              className="w-full sm:w-auto text-center rounded-lg bg-blue-700 text-white font-semibold px-6 py-3 hover:bg-blue-800 transition"
            >
              トップへ戻る
            </a>

            <a
              href="/flow"
              className="w-full sm:w-auto text-center rounded-lg border-2 border-blue-700 text-blue-700 font-semibold px-6 py-3 bg-white hover:bg-blue-50 transition"
            >
              制作の流れを見る
            </a>

            <a
              href="/order"
              className="w-full sm:w-auto text-center rounded-lg border border-zinc-300 text-zinc-800 font-semibold px-6 py-3 bg-white hover:bg-zinc-50 transition"
            >
              もう一度送信する
            </a>
          </div>

          <p className="mt-8 text-xs text-zinc-500 leading-relaxed">
            ※このページは送信完了後に表示されます。ブラウザの戻る操作で再送信が発生する可能性があるため、
            追加のご依頼は「もう一度送信する」からお願いします。
          </p>
        </div>
      </div>
    </main>
  );
}