import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse incoming bodies as JSON
  app.use(express.json());

  // API route to accept incoming lead inquiry form submissions
  app.post("/api/inquiry", async (req, res) => {
    const inquiry = req.body;
    console.log("📥 [Perkins Backend] Received lead inquiry:", inquiry);

    const recipientEmail = process.env.RECIPIENT_EMAIL || "info@perkinspublisher.com";
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const servicesText = inquiry.services && inquiry.services.length > 0 
      ? inquiry.services.join(", ") 
      : "Publishing Main Track";
      
    const isExpress = inquiry.expressService || inquiry.expressCallback;
    const emailSubject = `${isExpress ? "🚨 [EXPRESS CALLBACK] " : "🔥 "}NEW AUTHOR LEAD: ${inquiry.name} (${inquiry.genre.toUpperCase()})`;
    
    const emailHtml = `
      <div style="font-family: 'Inter', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1e293b; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <div style="background-color: #0b0f19; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 25px; border-bottom: 3px solid #f59e0b;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 0.15em; font-weight: normal;">
            PERKINS PUBLISHER
          </h1>
          <p style="color: #f59e0b; margin: 5px 0 0 0; font-size: 10px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase;">
            INCOMING BESTSELLER PROSPECTUS ${isExpress ? "- PRIORITY CALL BACK" : ""}
          </p>
        </div>

        ${isExpress ? `
        <div style="background-color: #fef2f2; border: 1px solid #fee2e2; border-left: 5px solid #ef4444; padding: 16px; border-radius: 10px; font-size: 13px; line-height: 1.5; color: #991b1b; margin-bottom: 25px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">
          🚨 ATTENTION: The author specifically requested an immediate telephone callback! Contact them at <a href="tel:${inquiry.phone}" style="color: #ef4444; font-weight: 900; text-decoration: underline;">${inquiry.phone}</a> within 15 minutes.
        </div>
        ` : ""}
        
        <p style="font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 20px;">
          An author has just finalized an inquiry spec on the brand portal. Below are the draft credentials and computed quote metrics:
        </p>

        <div style="border: 1px solid #f1f5f9; border-radius: 12px; overflow: hidden; margin-bottom: 25px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 12px 16px; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; width: 35%;">Author Name</td>
              <td style="padding: 12px 16px; font-size: 14px; font-weight: bold; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${inquiry.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Email Address</td>
              <td style="padding: 12px 16px; font-size: 14px; border-bottom: 1px solid #f1f5f9;">
                <a href="mailto:${inquiry.email}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${inquiry.email}</a>
              </td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 12px 16px; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Phone Contact</td>
              <td style="padding: 12px 16px; font-size: 14px; border-bottom: 1px solid #f1f5f9;">
                <a href="tel:${inquiry.phone}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${inquiry.phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Book Genre</td>
              <td style="padding: 12px 16px; font-size: 14px; color: #0f172a; border-bottom: 1px solid #f1f5f9; text-transform: capitalize;">${inquiry.genre}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 12px 16px; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Word Count</td>
              <td style="padding: 12px 16px; font-size: 14px; font-weight: bold; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${(inquiry.wordCount || 0).toLocaleString()} words</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Target Services</td>
              <td style="padding: 12px 16px; font-size: 12px; font-weight: bold; color: #4f46e5; border-bottom: 1px solid #f1f5f9; text-transform: uppercase;">${servicesText}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 12px 16px; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Estimated Invest</td>
              <td style="padding: 12px 16px; font-size: 16px; font-weight: 900; color: #ca8a04; border-bottom: 1px solid #f1f5f9;">$${(inquiry.estimatedPrice || 0).toLocaleString()}</td>
            </tr>
            <tr style="background-color: #ffffff;">
              <td style="padding: 12px 16px; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Priority Status</td>
              <td style="padding: 12px 16px; font-size: 13px; font-weight: bold; color: ${isExpress ? '#b91c1c' : '#475569'}; border-bottom: 1px solid #f1f5f9;">
                ${isExpress ? '🔴 HIGH PRIORITY (15-MIN CALL BACK REQUESTED)' : '🟢 STANDARD'}
              </td>
            </tr>
            ${inquiry.message ? `
            <tr>
              <td style="padding: 12px 16px; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; vertical-align: top;">Author Story Plan</td>
              <td style="padding: 12px 16px; font-size: 13px; line-height: 1.5; color: #334155; white-space: pre-line;">${inquiry.message}</td>
            </tr>` : ""}
          </table>
        </div>

        <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 15px; border-radius: 8px; font-size: 12px; line-height: 1.5; color: #1e40af; margin-bottom: 25px;">
          <strong>💼 Quick Action Recommendation:</strong> Click the author's contact buttons above to connect directly and schedule a bestseller design session.
        </div>

        <div style="text-align: center; border-top: 1px solid #f1f5f9; padding-top: 20px; font-size: 11px; color: #94a3b8;">
          <p style="margin: 0;">This email dispatch was originated via Perkins Publishing Web Integration.</p>
          <p style="margin: 4px 0 0 0;">Secure server instance © ${new Date().getFullYear()} Perkins</p>
        </div>
      </div>
    `;

    // Strict SMTP Dispatch Verification
    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("❌ [Perkins Backend] Missing SMTP configuration. Cannot deliver email.");
      return res.status(500).json({
        status: "error",
        message: "SMTP configuration is incomplete. Please enter valid email SMTP details.",
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort) || 587,
        secure: Number(smtpPort) === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"Perkins Lead Pipeline" <${smtpUser}>`,
        to: recipientEmail,
        subject: emailSubject,
        html: emailHtml,
      });

      console.log("📨 [Perkins Backend] Lead successfully dispatched to", recipientEmail, "MsgId:", info.messageId);
      return res.json({
        status: "success",
        message: `Your inquiry has been successfully sent directly to our business email!`,
        messageId: info.messageId
      });
    } catch (err: any) {
      console.error("❌ [Perkins Backend] Nodemailer dispatch failed:", err);
      return res.status(500).json({
        status: "error",
        message: "Real-time email dispatch failed. Please verify your SMTP credential settings.",
        error: err.message
      });
    }
  });

  // Serve static assets or mount Vite HMR middleware depending on NODE_ENV
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("🚀 [Perkins Backend] Vite HMR Service mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("📦 [Perkins Backend] Static Production assets mounted.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🟢 [Perkins Backend] Running seamlessly on port ${PORT}`);
  });
}

startServer();
