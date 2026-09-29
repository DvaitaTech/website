/* POST /api/contact, a Cloudflare Pages Function.

   Posts the contact form to a Google Chat space through an incoming webhook.
   Set this on the Pages project (Settings > Variables and secrets), as a secret:

     CHAT_WEBHOOK_URL   required, the space's webhook URL
                        (Space > Apps & integrations > Webhooks > Add webhook)

   Without it the function answers 503, and the page tells the visitor to email
   instead, so nothing is ever silently dropped. */

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

// Card text is Chat's small HTML subset, so visitor input is escaped before it
// goes in. Newlines become <br> after escaping.
const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const html = (s) => escape(s).replace(/\r?\n/g, "<br>");

// The plain `text` field (the notification preview) reads <users/all> and
// <url|label> as markup, so angle brackets are dropped there.
const plain = (s) => String(s).replace(/[<>]/g, "");

const clip = (s, n) => String(s ?? "").trim().slice(0, n);

const row = (label, value) => ({ decoratedText: { topLabel: label, text: html(value), wrapText: true } });

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Expected JSON" }, 400);
  }

  // The hidden "website" field is for bots. Pretend it worked.
  if (clip(data.website, 200)) return json({ ok: true });

  const name = clip(data.name, 200);
  const email = clip(data.email, 320);
  const company = clip(data.company, 200);
  const message = clip(data.message, 8000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Name, a valid email and a message are needed" }, 400);
  }

  if (!env.CHAT_WEBHOOK_URL) return json({ error: "Chat is not set up yet" }, 503);

  const who = company ? `${name}, ${company}` : name;
  const res = await fetch(env.CHAT_WEBHOOK_URL, {
    signal: AbortSignal.timeout(10_000),
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      text: `New project enquiry from ${plain(who)}`,
      cardsV2: [
        {
          cardId: "enquiry",
          card: {
            header: { title: "New project enquiry", subtitle: "dvaitatech.com/contact" },
            sections: [
              { widgets: [row("Name", name), row("Email", email), ...(company ? [row("Company", company)] : [])] },
              { header: "Message", widgets: [{ textParagraph: { text: html(message) } }] },
            ],
          },
        },
      ],
    }),
  }).catch((err) => {
    console.error("chat webhook", err);
    return null;
  });

  if (!res) return json({ error: "Could not send" }, 502);
  if (!res.ok) {
    console.error("chat webhook", res.status, await res.text());
    return json({ error: "Could not send" }, 502);
  }
  return json({ ok: true });
}
