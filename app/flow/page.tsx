import Image from "next/image";

export default function FlowPage() {
  const steps = [
    {
      title: "ヒアリング（ご依頼 → 初回打ち合わせ）",
      desc: "注文フォーム送信後、24時間以内にご連絡し、初回打ち合わせを行います。Zoom / Google Meet / LINE / Discord からお選びいただけます。",
      img: "/flow/step1.png",
    },
    {
      title: "企画立案 / 要件整理",
      desc: "イベント企画ではコンセプト・日程・規模などを整理し、Web制作では画面構成・機能・デザイン案をまとめて最適なプランをご提案します。",
      img: "/flow/step2.png",
    },
    {
      title: "お見積もり",
      desc: "ヒアリング内容をもとに料金・納期を明確にしたお見積もりを提示します。ご納得いただければ正式に制作へ進行します。",
      img: "/flow/step3.png",
    },
    {
      title: "制作 / 企画構築",
      desc: "イベント企画では当日の運営資料や構成を制作し、Web制作ではデザイン→開発→テストの順で進めます。進捗は随時共有します。",
      img: "/flow/step4.png",
    },
    {
      title: "納品 / 実施",
      desc: "イベントでは運営に必要な資料を納品し、Web制作では完成したサービスを納品します。必要に応じて操作説明・サポートも行います。",
      img: "/flow/step5.png",
    },
    {
      title: "アフターサポート",
      desc: "納品後も軽微な修正・追加依頼・相談などに対応します。運営や改善についての継続的なサポートも可能です。",
      img: "/flow/step6.png",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-zinc-900 px-6 py-16">
      {/* Hero セクション */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-blue-700">作成の流れ</h1>
        <p className="mt-4 text-zinc-600">
          ご依頼から納品までのプロセスをわかりやすくご紹介します。
        </p>
      </section>

      {/* ステップ一覧 */}
      <div className="mx-auto max-w-5xl space-y-20">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* 画像 */}
            <div className="w-full md:w-1/2">
              <Image
                src={step.img}
                width={800}
                height={500}
                alt={step.title}
                className="rounded-xl border shadow-sm"
              />
            </div>

            {/* テキスト */}
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-700 text-white font-semibold shadow">
                  {i + 1}
                </div>
                <h2 className="text-2xl font-semibold text-blue-700">
                  {step.title}
                </h2>
              </div>
              <p className="text-zinc-700 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 注文フォームへの導線 */}
      <div className="text-center mt-20">
        <a
          href="/order"
          className="inline-block rounded-lg border border-blue-700 bg-white px-8 py-3
                     text-lg font-medium text-blue-700 shadow-sm
                     hover:bg-blue-50 active:bg-blue-100 transition"
        >
          注文フォームへ進む
        </a>
      </div>
    </main>
  );
}