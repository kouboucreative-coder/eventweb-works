const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp();

const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");

// Secrets
const LINE_TOKEN = defineSecret("LINE_TOKEN");
const RECAPTCHA_SECRET = defineSecret("RECAPTCHA_SECRET");

// 表示用変換
const formatBudget = (value) => {
  switch (value) {
    case "5000-10000":
      return "¥5,000〜¥10,000";
    case "10000-20000":
      return "¥10,000〜¥20,000";
    case "20000-30000":
      return "¥20,000〜¥30,000";
    case "30000over":
      return "¥30,000以上";
    default:
      return value || "-";
  }
};

const formatDeadline = (value) => {
  switch (value) {
    case "no-rush":
      return "急ぎではない";
    case "1week":
      return "1週間以内";
    case "2week":
      return "2週間以内";
    case "1month":
      return "1ヶ月以内";
    case "other":
      return "その他（詳細欄参照）";
    default:
      return value || "-";
  }
};

// 文字列を安全に整形（undefined/null対策 + trim）
const asCleanString = (v) => {
  if (v === null || v === undefined) return "";
  return String(v).trim();
};

// reCAPTCHA v3 検証
async function verifyRecaptcha(token, remoteip) {
  const secret = RECAPTCHA_SECRET.value();
  const params = new URLSearchParams();
  params.set("secret", secret);
  params.set("response", token);
  if (remoteip) params.set("remoteip", remoteip);

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const json = await res.json();
  return json; // { success, score, action, challenge_ts, hostname, "error-codes": [] }
}

/**
 * ✅ 注文受付 API（reCAPTCHA検証 → OKならFirestore保存）
 * POST /createOrder
 * body: { recaptchaToken, order: { name,email,phone,type,budgetRange,deadline,meeting,details } }
 */
exports.createOrder = onRequest(
  {
    region: "asia-northeast1",
    secrets: [RECAPTCHA_SECRET],
    cors: true, // Next.js から呼べるように
  },
  async (req, res) => {
    try {
      if (req.method !== "POST") {
        return res.status(405).json({ ok: false, error: "Method not allowed" });
      }

      const recaptchaToken = asCleanString(req.body?.recaptchaToken);
      const order = req.body?.order || {};

      if (!recaptchaToken) {
        return res
          .status(400)
          .json({ ok: false, error: "Missing recaptchaToken" });
      }

      // reCAPTCHA 検証
      const remoteip =
        req.headers["x-forwarded-for"]?.toString()?.split(",")[0]?.trim() || "";
      const verify = await verifyRecaptcha(recaptchaToken, remoteip);

      // スコアしきい値（真人間を弾きにくい設定）
      const score = typeof verify.score === "number" ? verify.score : 0;
      const success = !!verify.success;

      if (!success || score < 0.3) {
        return res.status(403).json({
          ok: false,
          blocked: true,
          reason: "recaptcha",
          score,
        });
      }

      // 入力値を整形（最低限）
      const data = {
        name: asCleanString(order.name),
        email: asCleanString(order.email),
        phone: asCleanString(order.phone),
        type: asCleanString(order.type),
        budgetRange: asCleanString(order.budgetRange),
        deadline: asCleanString(order.deadline),
        meeting: asCleanString(order.meeting),
        details: asCleanString(order.details),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        recaptchaScore: score, // 管理者の参考（不要なら消してOK）
      };

      // 必須チェック（空なら弾く）
      const requiredKeys = [
        "name",
        "email",
        "phone",
        "type",
        "budgetRange",
        "deadline",
        "meeting",
        "details",
      ];
      for (const k of requiredKeys) {
        if (!data[k] || data[k].length === 0) {
          return res.status(400).json({ ok: false, error: `Missing ${k}` });
        }
      }

      // Firestore 保存（ここで orders が作成される → 既存のLINE通知が動く）
      const ref = await admin.firestore().collection("orders").add(data);

      return res.status(200).json({ ok: true, id: ref.id });
    } catch (e) {
      console.error("createOrder failed:", e);
      return res.status(500).json({ ok: false, error: "Internal error" });
    }
  }
);

// Firestore: orders に新規追加されたらLINE通知
exports.notifyNewOrder = onDocumentCreated(
  {
    document: "orders/{orderId}",
    region: "asia-northeast1",
    secrets: [LINE_TOKEN],
  },
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    const message = `📩 新しい注文が入りました

名前：${data.name ?? "-"}
種別：${data.type ?? "-"}
予算：${formatBudget(data.budgetRange)}
納期：${formatDeadline(data.deadline)}
`;

    const res = await fetch("https://api.line.me/v2/bot/message/broadcast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LINE_TOKEN.value()}`,
      },
      body: JSON.stringify({
        messages: [{ type: "text", text: message }],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("LINE send failed:", res.status, body);
    }
  }
);