/* POST /api/contact, a Cloudflare Pages Function.

   Sends the contact form to the team through Resend (resend.com). Set these
   on the Pages project (Settings > Variables and secrets):

     RESEND_API_KEY   required, a Resend API key for a verified dvaitatech.com
     CONTACT_TO       optional, defaults to contact@dvaitatech.com
     CONTACT_FROM     optional, defaults to "Dvaita website <website@dvaitatech.com>"

   Without the key it answers 503, and the page tells the visitor to email
   instead, so nothing is ever silently dropped. */

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const clip = (s, n) => String(s ?? "").trim().slice(0, n);

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

  if (!env.RESEND_API_KEY) return json({ error: "Mail is not set up yet" }, 503);

  const lines = [`From: ${name} <${email}>`];
  if (company) lines.push(`Company: ${company}`);
  const text = [...lines, "", message].join("\n");
  const html = `<p><b>${escape(name)}</b> &lt;${escape(email)}&gt;${company ? `<br>${escape(company)}` : ""}</p><p style="white-space:pre-wrap">${escape(message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.CONTACT_FROM || "Dvaita website <website@dvaitatech.com>",
      to: [env.CONTACT_TO || "contact@dvaitatech.com"],
      reply_to: email,
      subject: `New project enquiry from ${name}${company ? `, ${company}` : ""}`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error("resend", res.status, await res.text());
    return json({ error: "Could not send" }, 502);
  }
  return json({ ok: true });
}
