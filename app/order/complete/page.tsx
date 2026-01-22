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
            フォームに入力いただいた内容を受け付けました。
            内容を確認し、
            <span className="font-semibold"> 原則24時間以内 </span>
            にご連絡いたします。
            ご相談・ご依頼ありがとうございます。
          </p>

          {/* 次の流れ */}
          <div className="mt-10 grid gap-4">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm font-semibold text-zinc-900">今後の流れ</p>
              <ol className="mt-3 space-y-2 text-zinc-700">
                <li>1. ご入力内容の確認（不足があれば追加でご質問します）</li>
                <li>2. オンライン打ち合わせの日程調整（Zoom / Meet / LINE / Discord）</li>
                <li>3. 方針・お見積りのご提案 → 問題なければ制作開始</li>
              </ol>
            </div>

            {/* 技術的・スケジュール的に難しい依頼について */}
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <p className="text-sm font-semibold text-zinc-900">
                ご依頼内容・スケジュールについて
              </p>
              <p className="mt-3 text-zinc-700 leading-relaxed">
                内容やご希望の納期によっては、
                <span className="font-semibold">
                  技術的な理由やスケジュールの都合によりお受けできない場合
                </span>
                や、
                <span className="font-semibold">
                  納期・ボリュームの調整をお願いする場合
                </span>
                があります。
              </p>
              <ul className="mt-3 text-sm text-zinc-700 list-disc list-inside space-y-1">
                <li>短期間での大規模開発・大幅な仕様変更を伴う案件</li>
                <li>専門外の技術スタックが必須となる案件</li>
                <li>安全性・規約遵守が難しいと判断した内容</li>
              </ul>
              <p className="mt-3 text-xs text-zinc-500">
                その場合でも、できる限り代替案や現実的な進め方をご提案します。
              </p>
            </div>

            {/* メール受信のお願い */}
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-800">
                メール受信設定のご確認をお願いします
              </p>

              <p className="mt-3 text-zinc-700 leading-relaxed">
                ご連絡は、以下のメールアドレスからお送りします。
                迷惑メール対策や受信制限を設定されている場合は、
                <span className="font-semibold"> 受信を許可 </span>
                していただけると確実です。
              </p>

              <div className="mt-4 rounded-lg bg-white border border-blue-200 px-4 py-3 font-mono text-blue-700 text-sm">
                koubou.creative@gmail.com
              </div>

              <ul className="mt-4 text-zinc-700 text-sm space-y-1">
                <li>・迷惑メールフォルダに振り分けられていないか</li>
                <li>・ドメイン / アドレスの受信拒否設定がないか</li>
                <li>・Gmail やキャリアメールをご利用の場合は特にご確認ください</li>
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <p className="text-sm font-semibold text-zinc-900">
                ご連絡が届かない場合
              </p>
              <p className="mt-3 text-zinc-700 leading-relaxed">
                24時間以上経ってもこちらからのメールが届かない場合は、
                迷惑メールフォルダや受信設定をご確認のうえ、
                <span className="font-semibold"> 再度フォームからご連絡 </span>
                いただくか、
                <span className="font-semibold"> koubou.creative@gmail.com </span>
                まで直接ご連絡ください。
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
              もう一件相談する
            </a>
          </div>

          <p className="mt-8 text-xs text-zinc-500 leading-relaxed">
            ※このページは送信完了後に表示されています。ブラウザの戻るボタンから前の画面に戻ると、
            同じ内容が再送信される場合があります。追加入力がある場合は「もう一件相談する」からお送りください。
          </p>
        </div>
      </div>
    </main>
  );
}