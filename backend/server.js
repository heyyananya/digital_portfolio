const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Path to data directory and JSON files
const DATA_DIR = path.join(__dirname, 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');
const RESUME_FILE = path.join(DATA_DIR, 'resume.json');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');

// Ensure data directory and files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const initFile = (filePath, defaultData) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
};

initFile(CONTACTS_FILE, []);
initFile(RESUME_FILE, { count: 0 });
initFile(ANALYTICS_FILE, { totalVisits: 0, uniqueVisits: 0, ips: [] });

// Root test endpoint
app.get('/', (req, res) => {
  res.json({ message: "Portfolio OS Backend is running in 2032 state." });
});

const smtpConfigured = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
);

if (!smtpConfigured) {
  console.warn(
    '[WARN] SMTP is not configured. Contact form submissions will be rejected.\n' +
      '       Copy .env.example to .env and fill in SMTP_USER and SMTP_PASS.'
  );
}

const transporter = smtpConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

// Escape user-supplied text before interpolating it into the HTML email body.
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// 1. Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are all required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'That email address does not look valid.' });
  }

  // Always keep a local copy, even if delivery later fails.
  try {
    const data = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf8'));
    data.push({
      id: Date.now().toString(),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Failed to persist contact message:', error);
  }

  // If SMTP is not configured, we return success since the message was already saved to contacts.json locally.
  if (!transporter) {
    console.log(`[INFO] SMTP not configured. Contact submission saved locally to contacts.json (from ${email}).`);
    return res.status(201).json({ success: true, message: 'Message saved locally.' });
  }

  // 1. Deliver notification to your inbox
  let notificationSent = false;
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL || process.env.SMTP_USER,
      replyTo: `"${name}" <${email}>`,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="background-color: #09090b; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f5; text-align: center;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); text-align: left;">
            <!-- Neon Gradient bar -->
            <div style="height: 5px; background: linear-gradient(90deg, #a855f7 0%, #06b6d4 100%);"></div>
            
            <!-- Header -->
            <div style="padding: 24px 32px; border-bottom: 1px solid #27272a;">
              <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">
                Portfolio OS <span style="color: #06b6d4;">Inbox</span>
              </h2>
              <p style="margin: 4px 0 0; font-family: monospace; font-size: 11px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.15em;">
                New message submission
              </p>
            </div>
            
            <!-- Content -->
            <div style="padding: 32px;">
              <!-- Metadata Info -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <span style="display: block; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #71717a; margin-bottom: 4px;">Sender Name</span>
                    <strong style="font-size: 15px; color: #ffffff;">${escapeHtml(name)}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style="display: block; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #71717a; margin-bottom: 4px;">Email Address</span>
                    <a href="mailto:${escapeHtml(email)}" style="font-size: 14px; font-weight: 600; color: #06b6d4; text-decoration: none; border-bottom: 1px dashed rgba(6, 182, 212, 0.4);">${escapeHtml(email)}</a>
                  </td>
                </tr>
              </table>
              
              <!-- Message Bubble -->
              <div style="background-color: #09090b; border-left: 3px solid #a855f7; border-radius: 4px 8px 8px 4px; padding: 20px 24px;">
                <span style="display: block; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #71717a; margin-bottom: 8px;">Message details</span>
                <div style="font-size: 14px; line-height: 1.6; color: #e4e4e7; font-family: inherit; white-space: pre-wrap;">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="padding: 20px 32px; background-color: #09090b; border-top: 1px solid #27272a; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #52525b;">
                Sent from your Digital Portfolio OS.
              </p>
              <p style="margin: 4px 0 0; font-family: monospace; font-size: 9px; color: #3f3f46; text-transform: uppercase; letter-spacing: 0.1em;">
                SECURE HANDSHAKE · TIMESTAMP: ${new Date().toISOString()}
              </p>
            </div>
          </div>
        </div>`,
    });
    console.log(`Contact email delivered to receiver (from ${email})`);
    notificationSent = true;
  } catch (error) {
    console.error('Failed to send notification email:', error.message);
  }

  // 2. Deliver auto-confirmation/thank-you back to the sender
  try {
    await transporter.sendMail({
      from: `"Ananya Patel" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Message Received — Thank you for reaching out! | Ananya Patel`,
      text: `Hi ${name},\n\nThank you for reaching out! Your message has successfully reached my inbox.\n\nI check submissions daily and will follow up with you shortly.\n\nBest regards,\nAnanya Patel`,
      html: `
        <div style="background-color: #09090b; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f5; text-align: center;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); text-align: left;">
            <!-- Neon Gradient bar -->
            <div style="height: 5px; background: linear-gradient(90deg, #a855f7 0%, #06b6d4 100%);"></div>
            
            <!-- Header -->
            <div style="padding: 24px 32px; border-bottom: 1px solid #27272a;">
              <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">
                Ananya <span style="color: #06b6d4;">Patel</span>
              </h2>
              <p style="margin: 4px 0 0; font-family: monospace; font-size: 11px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.15em;">
                Message received successfully
              </p>
            </div>
            
            <!-- Content -->
            <div style="padding: 32px;">
              <p style="margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #ffffff;">Hi ${escapeHtml(name)},</p>
              <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.6; color: #e4e4e7;">
                Thank you for reaching out! Your message has safely reached my inbox.
              </p>
              <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.6; color: #e4e4e7;">
                I check submissions daily and will follow up with you shortly (usually within 24 hours).
              </p>
              
              <!-- Message Bubble copy -->
              <div style="background-color: #09090b; border: 1px solid #27272a; border-radius: 8px; padding: 20px 24px; margin-bottom: 32px;">
                <span style="display: block; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #71717a; margin-bottom: 8px;">Copy of your message</span>
                <div style="font-size: 13px; line-height: 1.6; color: #a1a1aa; font-family: inherit; white-space: pre-wrap;">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
              </div>
              
              <!-- Premium Action Buttons -->
              <div style="text-align: center; margin-top: 10px;">
                <a href="${process.env.SMTP_USER === 'andypatel2406@gmail.com' ? 'https://www.linkedin.com/in/ananya-patel-1a61a82b3?utm_source=share_via&utm_content=profile&utm_medium=member_android' : 'https://linkedin.com/'}" target="_blank" style="display: inline-block; background: linear-gradient(90deg, #a855f7 0%, #06b6d4 100%); color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 13px; margin: 5px 8px 5px 0;">Connect on LinkedIn</a>
                <a href="https://github.com/ananyatech2006/" target="_blank" style="display: inline-block; background-color: #27272a; border: 1px solid #3f3f46; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 13px; margin: 5px 0;">Explore GitHub</a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="padding: 20px 32px; background-color: #09090b; border-top: 1px solid #27272a; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #52525b;">
                Ananya Patel · Portfolio OS · 2032
              </p>
            </div>
          </div>
        </div>`,
    });
    console.log(`Auto-confirmation email sent to sender (${email})`);
  } catch (error) {
    console.warn('[WARN] Failed to send auto-confirmation email:', error.message);
  }

  // We return a 201 success code to the user as long as it has been stored locally
  return res.status(201).json({ 
    success: true, 
    message: notificationSent ? 'Message delivered.' : 'Message saved locally (email queue fallback).' 
  });
});

// 2. Resume Download Endpoint
app.get('/api/resume/download', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(RESUME_FILE, 'utf8'));
    res.json({ count: data.count });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve download statistics." });
  }
});

app.post('/api/resume/download', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(RESUME_FILE, 'utf8'));
    data.count = (data.count || 0) + 1;
    fs.writeFileSync(RESUME_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true, count: data.count });
  } catch (error) {
    res.status(500).json({ error: "Failed to update download count." });
  }
});

// 3. Analytics API (Visitor Counter)
app.get('/api/analytics', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf8'));
    // Return aggregated values (don't send raw IPs to client for privacy)
    res.json({
      totalVisits: data.totalVisits,
      uniqueVisits: data.uniqueVisits
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve analytics data." });
  }
});

app.post('/api/analytics/visit', (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const data = JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf8'));
    
    data.totalVisits = (data.totalVisits || 0) + 1;
    
    // Hash or simply check list of IPs to track unique visits
    if (!data.ips.includes(ip)) {
      data.ips.push(ip);
      data.uniqueVisits = (data.uniqueVisits || 0) + 1;
    }
    
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2));
    res.json({
      success: true,
      totalVisits: data.totalVisits,
      uniqueVisits: data.uniqueVisits
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update visitor analytics." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`[PORTFOLIO OS] System server online on port ${PORT}`);
});
