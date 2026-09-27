import nodemailer from 'nodemailer';

const json = (statusCode, body) => new Response(JSON.stringify(body), { status: statusCode, headers: { 'content-type': 'application/json' } });
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async (request) => {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed.' });
  const { email, role = 'Member', note = '' } = await request.json().catch(() => ({}));
  const safeEmail = String(email || '').trim().toLowerCase();
  if (!emailPattern.test(safeEmail)) return json(400, { error: 'Enter a valid email address.' });
  if (!process.env.ZOHO_SMTP_USER || !process.env.ZOHO_SMTP_PASS) return json(503, { error: 'Email service is not configured. Add the Zoho SMTP variables in Netlify.' });
  const transporter = nodemailer.createTransport({ host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com', port: Number(process.env.ZOHO_SMTP_PORT || 465), secure: String(process.env.ZOHO_SMTP_SECURE || 'true') === 'true', auth: { user: process.env.ZOHO_SMTP_USER, pass: process.env.ZOHO_SMTP_PASS } });
  try {
    await transporter.sendMail({
      from: `${process.env.ZOHO_FROM_NAME || 'Aster'} <${process.env.ZOHO_FROM_ADDRESS || process.env.ZOHO_SMTP_USER}>`,
      to: safeEmail,
      subject: 'You are invited to join our workspace',
      text: `You have been invited to join the workspace as ${role}.${note ? `\n\n${note}` : ''}\n\nCreate your account at ${process.env.APP_BASE_URL || 'https://blossomss.in'}/sign-up`,
      html: `<div style="font-family:Arial,sans-serif;max-width:580px;margin:auto;padding:28px;border:1px solid #e2e8f0;border-radius:16px"><h2>You’re invited to join the workspace</h2><p>You’ve been invited to collaborate as a <strong>${String(role).replace(/[<>]/g, '')}</strong>.</p>${note ? `<p>${String(note).replace(/[<>]/g, '')}</p>` : ''}<a href="${process.env.APP_BASE_URL || 'https://blossomss.in'}/sign-up">Create your account</a></div>`,
    });
    return json(200, { ok: true, email: safeEmail, role });
  } catch (error) {
    console.error('Invite email error', error);
    return json(500, { error: 'We could not send the invitation email.' });
  }
};
