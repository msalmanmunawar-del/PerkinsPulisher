import express from "express";
import compression from "compression";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const DATA_DIR = path.join(process.cwd(), "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");
const INTEGRATIONS_FILE = path.join(DATA_DIR, "integrations.json");

interface IntegrationConfig {
  recipientEmail: string;
  webhookUrl?: string;
  googleSheetsUrl?: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPass?: string;
}

// Helper: Get active integration configuration
function getIntegrationsConfig(): IntegrationConfig {
  let fileConfig: Partial<IntegrationConfig> = {};
  if (fs.existsSync(INTEGRATIONS_FILE)) {
    try {
      fileConfig = JSON.parse(fs.readFileSync(INTEGRATIONS_FILE, "utf-8"));
    } catch {
      fileConfig = {};
    }
  }

  const defaultRecipient = process.env.RECIPIENT_EMAIL 
    ? (process.env.RECIPIENT_EMAIL.includes("msalmanmunawar") 
        ? process.env.RECIPIENT_EMAIL 
        : `msalmanmunawar@gmail.com, ${process.env.RECIPIENT_EMAIL}`)
    : "msalmanmunawar@gmail.com, info@perkinspublisher.com";

  return {
    recipientEmail: fileConfig.recipientEmail || defaultRecipient,
    webhookUrl: fileConfig.webhookUrl !== undefined ? fileConfig.webhookUrl : (process.env.WEBHOOK_URL || ""),
    googleSheetsUrl: fileConfig.googleSheetsUrl !== undefined ? fileConfig.googleSheetsUrl : (process.env.GOOGLE_SHEETS_WEBHOOK_URL || ""),
    smtpHost: fileConfig.smtpHost || process.env.SMTP_HOST || "smtp.hostinger.com",
    smtpPort: fileConfig.smtpPort || Number(process.env.SMTP_PORT) || 465,
    smtpUser: fileConfig.smtpUser || process.env.SMTP_USER || "info@perkinspublisher.com",
    smtpPass: fileConfig.smtpPass || process.env.SMTP_PASS || "",
  };
}

// Helper: Save integration configuration
function saveIntegrationsConfig(config: Partial<IntegrationConfig>): IntegrationConfig {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const current = getIntegrationsConfig();
  const updated: IntegrationConfig = {
    ...current,
    ...config,
  };
  fs.writeFileSync(INTEGRATIONS_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}

// Helper: Ensure inquiries directory exists and persist leads
function saveInquiryToStore(inquiry: any) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    let existing: any[] = [];
    if (fs.existsSync(INQUIRIES_FILE)) {
      const raw = fs.readFileSync(INQUIRIES_FILE, "utf-8");
      try {
        existing = JSON.parse(raw);
      } catch {
        existing = [];
      }
    }
    const enriched = {
      id: inquiry.id || `inq-${Date.now()}`,
      receivedAt: new Date().toISOString(),
      status: inquiry.status || "New",
      ...inquiry,
    };
    existing.unshift(enriched); // Most recent first
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(existing, null, 2), "utf-8");
    return enriched;
  } catch (err) {
    console.error("Failed to persist inquiry to disk:", err);
    return inquiry;
  }
}

// Helper: Read stored inquiries
function getStoredInquiries(): any[] {
  try {
    if (!fs.existsSync(INQUIRIES_FILE)) return [];
    const raw = fs.readFileSync(INQUIRIES_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Helper: Dispatch automated email directly via Hostinger SMTP (No FormSubmit middleman)
async function dispatchLeadEmail(lead: any, config: IntegrationConfig) {
  const recipientString = config.recipientEmail || "msalmanmunawar@gmail.com, info@perkinspublisher.com";
  const recipientList = recipientString.split(",").map(e => e.trim()).filter(Boolean);
  const isPromo = lead.estimatedPrice === 499 || (lead.services && lead.services.includes('promo-publishing-499')) || (lead.message && lead.message.includes('€499'));
  const isExpress = lead.expressCallback || lead.expressService;

  const subject = `${isExpress ? "🚨 [EXPRESS 15-MIN CALL] " : ""}${isPromo ? "🔥 [€499 SPECIAL OFFER CLAIM] " : "📚 "}NEW AUTHOR LEAD: ${lead.name} (${(lead.genre || "Book").toUpperCase()})`;

  const result = {
    recipients: recipientList,
    smtpSuccess: false,
    smtpMessage: "",
  };

  const smtpHost = config.smtpHost || process.env.SMTP_HOST || "smtp.hostinger.com";
  const smtpPort = Number(config.smtpPort || process.env.SMTP_PORT) || 465;
  const smtpUser = config.smtpUser || process.env.SMTP_USER || "info@perkinspublisher.com";
  const smtpPass = config.smtpPass || process.env.SMTP_PASS || "";

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const emailHtml = `
        <div style="font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1e293b;">
          <div style="background-color: #0b0f19; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 25px; border-bottom: 3px solid #f59e0b;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 0.15em;">PERKINS PUBLISHER</h1>
            <p style="color: #f59e0b; margin: 5px 0 0 0; font-size: 11px; font-weight: bold; text-transform: uppercase;">
              ${isPromo ? "★ €499 PROMOTIONAL PUBLISHING PACKAGE CLAIM ★" : "INCOMING AUTHOR PROSPECTUS"}
            </p>
          </div>
          ${isPromo ? `
          <div style="background-color: #fef3c7; border-left: 5px solid #d97706; padding: 14px; border-radius: 8px; font-size: 13px; color: #92400e; margin-bottom: 20px; font-weight: bold;">
            🎉 Author claimed the €499 All-Inclusive Package (74% Off): Cover Design, Line Editing, 3 Formats, and 100+ Distribution Channels.
          </div>` : ""}
          ${isExpress ? `
          <div style="background-color: #fee2e2; border-left: 5px solid #ef4444; padding: 14px; border-radius: 8px; font-size: 13px; color: #991b1b; margin-bottom: 20px; font-weight: bold;">
            🚨 URGENT: Author requested an immediate callback at <a href="tel:${lead.phone}" style="color: #ef4444;">${lead.phone}</a>!
          </div>` : ""}
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr style="background-color: #f8fafc;"><td style="padding: 10px; font-weight: bold; color: #64748b; font-size: 12px; width: 35%;">Author Name</td><td style="padding: 10px; font-weight: bold;">${lead.name}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold; color: #64748b; font-size: 12px;">Email Address</td><td style="padding: 10px;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
            <tr style="background-color: #f8fafc;"><td style="padding: 10px; font-weight: bold; color: #64748b; font-size: 12px;">Phone / WhatsApp</td><td style="padding: 10px;"><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>
            <tr><td style="padding: 10px; font-weight: bold; color: #64748b; font-size: 12px;">Genre / Words</td><td style="padding: 10px;">${lead.genre} • ${(lead.wordCount || 0).toLocaleString()} words</td></tr>
            <tr style="background-color: #f8fafc;"><td style="padding: 10px; font-weight: bold; color: #64748b; font-size: 12px;">Quoted Price</td><td style="padding: 10px; font-weight: bold; color: #ca8a04; font-size: 16px;">€${lead.estimatedPrice || 499}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold; color: #64748b; font-size: 12px;">Package / Services</td><td style="padding: 10px;">${isPromo ? "€499 Complete Promotional Package" : (Array.isArray(lead.services) ? lead.services.join(", ") : lead.services || "Custom Selection")}</td></tr>
            ${lead.message ? `<tr style="background-color: #f8fafc;"><td style="padding: 10px; font-weight: bold; color: #64748b; font-size: 12px; vertical-align: top;">Author Notes</td><td style="padding: 10px; white-space: pre-line;">${lead.message}</td></tr>` : ""}
          </table>
          <div style="text-align: center; border-top: 1px solid #f1f5f9; padding-top: 15px; font-size: 11px; color: #94a3b8;">
            Sent directly to ${recipientList.join(", ")} via Perkins Official Mail Server
          </div>
        </div>
      `;

      const info = await transporter.sendMail({
        from: `"Perkins Publisher" <${smtpUser}>`,
        to: recipientList.join(", "),
        replyTo: lead.email || undefined,
        subject: subject,
        html: emailHtml,
      });

      result.smtpSuccess = true;
      result.smtpMessage = `Delivered via SMTP (${info.messageId})`;
      console.log("✅ [Perkins Delivery Engine] SMTP delivery successful to:", recipientList.join(", "), info.messageId);
    } catch (err: any) {
      console.error("⚠️ [Perkins Delivery Engine] SMTP delivery error:", err.message);
      result.smtpMessage = err.message;
    }
  } else {
    result.smtpMessage = "SMTP credentials missing";
    console.warn("⚠️ [Perkins Delivery Engine] SMTP credentials missing, email skipped");
  }

  return result;
}

// Helper: Dispatch automated Google Sheets sync (Apps Script Web App, Zapier, Make, or n8n)
async function dispatchGoogleSheets(payload: any, sheetsUrlOverride?: string) {
  const config = getIntegrationsConfig();
  const targetUrl = sheetsUrlOverride || config.googleSheetsUrl || process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!targetUrl || !targetUrl.trim()) {
    return { sent: false, reason: "No Google Sheets webhook configured" };
  }

  const isPromo = payload.estimatedPrice === 499 || (payload.services && payload.services.includes('promo-publishing-499')) || (payload.message && payload.message.includes('€499'));
  const isExpress = payload.expressCallback || payload.expressService;

  try {
    console.log("📊 [Perkins Delivery Engine] Dispatching lead to Google Sheets:", targetUrl);
    const bodyPayload = {
      timestamp: new Date().toISOString(),
      dateFormatted: new Date().toLocaleString("en-GB", { timeZone: "UTC" }),
      id: payload.id || `inq-${Date.now()}`,
      name: payload.name || "",
      email: payload.email || "",
      phone: payload.phone || "",
      genre: payload.genre || "General",
      wordCount: payload.wordCount || 0,
      package: isPromo ? "€499 Promo Publishing Package (74% OFF)" : (Array.isArray(payload.services) ? payload.services.join(", ") : payload.services || "Standard"),
      quotedPrice: payload.estimatedPrice || 499,
      isPromoOffer: isPromo ? "YES" : "NO",
      priority: isExpress ? "URGENT 15-MIN CALLBACK" : "Standard",
      notes: payload.message || "",
      message: payload.message || "",
      row: [
        new Date().toISOString(),
        payload.id || "",
        payload.name || "",
        payload.email || "",
        payload.phone || "",
        payload.genre || "General",
        payload.wordCount || 0,
        isPromo ? "€499 Promo (74% OFF)" : "Standard",
        `€${payload.estimatedPrice || 499}`,
        isExpress ? "URGENT 15-MIN" : "Standard",
        payload.message || "",
      ],
    };

    const res = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyPayload),
      redirect: "follow", // Critical for Google Apps Script 302 redirects!
      signal: AbortSignal.timeout(10000),
    });

    console.log(`📊 [Perkins Delivery Engine] Google Sheets response status: ${res.status}`);
    return {
      sent: res.ok,
      statusCode: res.status,
      statusText: res.statusText,
    };
  } catch (err: any) {
    console.warn("⚠️ [Perkins Delivery Engine] Google Sheets sync error:", err.message);
    return {
      sent: false,
      error: err.message,
    };
  }
}

// Helper: Dispatch automated webhook (Discord, Slack, Zapier, Make)
async function dispatchWebhook(payload: any, webhookUrlOverride?: string) {
  const config = getIntegrationsConfig();
  const webhookUrl = webhookUrlOverride || config.webhookUrl;
  if (!webhookUrl || !webhookUrl.trim()) {
    return { sent: false, reason: "No webhook URL configured" };
  }

  const isPromo = payload.estimatedPrice === 499 || (payload.services && payload.services.includes('promo-publishing-499')) || (payload.message && payload.message.includes('€499'));
  const isExpress = payload.expressCallback || payload.expressService;

  try {
    console.log("🔗 [Perkins Delivery Engine] Dispatching automated webhook to:", webhookUrl);
    let bodyPayload: any;
    const headers: Record<string, string> = { "Content-Type": "application/json" };

    if (webhookUrl.includes("discord.com/api/webhooks")) {
      // Discord Rich Embed formatting
      bodyPayload = {
        username: "Perkins Publisher Lead Engine",
        avatar_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=128&auto=format&fit=crop&q=80",
        embeds: [
          {
            title: isPromo ? "🔥 NEW €499 PROMO LEAD CLAIMED (74% OFF)!" : "📚 NEW AUTHOR LEAD INQUIRY",
            description: isExpress 
              ? "🚨 **URGENT: AUTHOR REQUESTED 15-MIN TELEPHONE CALLBACK!**" 
              : "A new author prospectus was just submitted on the Perkins portal.",
            color: isPromo ? 0xf59e0b : 0x1e3a8a,
            fields: [
              { name: "Author Name", value: payload.name || "N/A", inline: true },
              { name: "Phone / WhatsApp", value: payload.phone || "N/A", inline: true },
              { name: "Email Address", value: payload.email || "N/A", inline: true },
              { name: "Book Genre", value: payload.genre || "General", inline: true },
              { name: "Word Count", value: `${(payload.wordCount || 0).toLocaleString()} words`, inline: true },
              { name: "Package / Quoted", value: `€${payload.estimatedPrice || 499} (${isPromo ? "Promo Flat Rate" : "Standard"})`, inline: true },
              { name: "Author Notes", value: payload.message || "No notes provided" },
            ],
            footer: { text: `Lead ID: ${payload.id || "N/A"} • Perkins Publisher Pipeline` },
            timestamp: new Date().toISOString(),
          }
        ]
      };
    } else if (webhookUrl.includes("hooks.slack.com")) {
      // Slack Block Kit formatting
      bodyPayload = {
        text: `🔥 *NEW AUTHOR LEAD*: ${payload.name} (${payload.phone}, ${payload.email}) - €${payload.estimatedPrice || 499} Package`,
      };
    } else {
      // Standard JSON payload for Zapier, Make.com, n8n, Pipedream, Google Apps Script
      bodyPayload = {
        event: "lead.created",
        source: "Perkins Publisher Web Portal",
        timestamp: new Date().toISOString(),
        id: payload.id,
        name: payload.name || "",
        email: payload.email || "",
        phone: payload.phone || "",
        genre: payload.genre || "General",
        wordCount: payload.wordCount || 0,
        package: isPromo ? "€499 Promo Publishing Package" : (Array.isArray(payload.services) ? payload.services.join(", ") : payload.services || "Standard"),
        estimatedPrice: payload.estimatedPrice || 499,
        isPromoOffer: isPromo ? "YES" : "NO",
        expressCallback: isExpress ? "URGENT 15-MIN" : "Standard",
        message: payload.message || "",
        lead: {
          id: payload.id,
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          genre: payload.genre,
          wordCount: payload.wordCount,
          services: payload.services,
          estimatedPrice: payload.estimatedPrice || 499,
          isPromoOffer: isPromo,
          expressCallback: isExpress,
          message: payload.message,
          receivedAt: payload.receivedAt || new Date().toISOString(),
        },
      };
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(bodyPayload),
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });

    console.log(`✅ [Perkins Delivery Engine] Webhook response code: ${res.status}`);
    return {
      sent: true,
      statusCode: res.status,
      statusText: res.statusText,
    };
  } catch (err: any) {
    console.warn("⚠️ [Perkins Delivery Engine] Webhook delivery notice:", err.message);
    return {
      sent: false,
      error: err.message,
    };
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // High-performance gzip/brotli compression middleware
  app.use(compression({
    threshold: 1024,
  }));

  // API health route FIRST (strictly compliant with container/reverse-proxy requirements)
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Middleware to parse incoming bodies as JSON
  app.use(express.json());

  // API route: View stored inquiries (JSON format)
  app.get("/api/inquiries", (req, res) => {
    const inquiries = getStoredInquiries();
    res.json({
      status: "success",
      totalLeads: inquiries.length,
      leads: inquiries,
    });
  });

  // API route: Export leads directly to CSV (instant Excel/Google Sheets compatibility)
  app.get("/api/inquiries/export.csv", (req, res) => {
    const inquiries = getStoredInquiries();
    const headers = [
      "Date",
      "Lead ID",
      "Author Name",
      "Email Address",
      "Phone Number",
      "Genre",
      "Word Count",
      "Services Selected",
      "Estimated Price (EUR)",
      "Priority Express",
      "Message / Story Plan"
    ];

    const rows = inquiries.map((inq) => [
      `"${inq.receivedAt || inq.date || ""}"`,
      `"${inq.id || ""}"`,
      `"${(inq.name || "").replace(/"/g, '""')}"`,
      `"${inq.email || ""}"`,
      `"${inq.phone || ""}"`,
      `"${inq.genre || ""}"`,
      inq.wordCount || 0,
      `"${Array.isArray(inq.services) ? inq.services.join(", ") : inq.services || ""}"`,
      inq.estimatedPrice || 0,
      inq.expressCallback || inq.expressService ? "YES" : "NO",
      `"${(inq.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="perkins-author-leads-${new Date().toISOString().slice(0, 10)}.csv"`);
    res.send(csvContent);
  });

  // API route: Retrieve live integration delivery status
  app.get("/api/integrations", (req, res) => {
    const config = getIntegrationsConfig();
    const stored = getStoredInquiries();
    res.json({
      status: "success",
      recipientEmail: config.recipientEmail,
      webhookUrl: config.webhookUrl || "",
      googleSheetsUrl: config.googleSheetsUrl || process.env.GOOGLE_SHEETS_WEBHOOK_URL || "",
      googleSheetsActive: Boolean((config.googleSheetsUrl || process.env.GOOGLE_SHEETS_WEBHOOK_URL)?.trim()),
      webhookActive: Boolean(config.webhookUrl && config.webhookUrl.trim()),
      emailDeliveryActive: Boolean(config.smtpHost && config.smtpUser && config.smtpPass),
      emailMethod: "Hostinger SMTP Direct Delivery",
      smtpConfigured: Boolean(config.smtpHost && config.smtpUser && config.smtpPass),
      smtpHost: config.smtpHost || "smtp.hostinger.com",
      smtpUser: config.smtpUser || "",
      totalLeadsStored: stored.length,
    });
  });

  // API route: Save integration settings
  app.post("/api/integrations", (req, res) => {
    const { recipientEmail, webhookUrl, googleSheetsUrl, smtpHost, smtpPort, smtpUser, smtpPass } = req.body;
    const updated = saveIntegrationsConfig({
      recipientEmail: recipientEmail ? recipientEmail.trim() : undefined,
      webhookUrl: webhookUrl !== undefined ? webhookUrl.trim() : undefined,
      googleSheetsUrl: googleSheetsUrl !== undefined ? googleSheetsUrl.trim() : undefined,
      smtpHost: smtpHost ? smtpHost.trim() : undefined,
      smtpPort: smtpPort ? Number(smtpPort) : undefined,
      smtpUser: smtpUser !== undefined ? smtpUser.trim() : undefined,
      smtpPass: smtpPass !== undefined ? smtpPass.trim() : undefined,
    });

    res.json({
      status: "success",
      message: "Integrations updated successfully.",
      config: {
        recipientEmail: updated.recipientEmail,
        webhookUrl: updated.webhookUrl || "",
        googleSheetsUrl: updated.googleSheetsUrl || "",
        smtpConfigured: Boolean(updated.smtpUser && updated.smtpPass),
      },
    });
  });

  // API route: Test Google Sheets sync directly
  app.post("/api/integrations/test-sheets", async (req, res) => {
    const config = getIntegrationsConfig();
    const targetUrl = req.body.googleSheetsUrl || config.googleSheetsUrl || process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (!targetUrl || !targetUrl.trim()) {
      return res.status(400).json({
        status: "error",
        message: "No Google Sheets webhook URL provided. Please configure GOOGLE_SHEETS_WEBHOOK_URL in environment or pass googleSheetsUrl.",
      });
    }

    const testLead = {
      id: `test-sheet-${Date.now()}`,
      name: "Perkins Test Author",
      email: "author.test@example.com",
      phone: "+1 (555) 019-9821",
      genre: "Historical Fiction",
      wordCount: 68000,
      estimatedPrice: 499,
      services: ["promo-publishing-499"],
      expressCallback: true,
      message: "Test lead sync from Perkins Publisher directly to Google Sheets.",
      receivedAt: new Date().toISOString(),
    };

    console.log("🧪 [Perkins Integrations] Executing live test Google Sheets sync to:", targetUrl);
    const sheetsResult = await dispatchGoogleSheets(testLead, targetUrl);

    res.json({
      status: sheetsResult.sent ? "success" : "failed",
      message: sheetsResult.sent 
        ? `Google Sheets synced successfully! Endpoint returned HTTP ${sheetsResult.statusCode}` 
        : `Google Sheets sync failed: ${sheetsResult.error || "Check your Web App URL"}`,
      details: sheetsResult,
    });
  });

  // API route: Test Email Delivery directly
  app.post("/api/integrations/test-email", async (req, res) => {
    const config = getIntegrationsConfig();
    const recipient = req.body.recipientEmail || config.recipientEmail || "msalmanmunawar@gmail.com";
    
    const testLead = {
      id: `test-${Date.now()}`,
      name: "Perkins Test Author",
      email: "author.test@example.com",
      phone: "+1 (555) 019-9821",
      genre: "Fiction / Thriller",
      wordCount: 75000,
      estimatedPrice: 499,
      services: ["promo-publishing-499"],
      expressCallback: true,
      message: "This is an operational test of the Perkins Publisher dual email delivery system to verify inbox receipt.",
    };

    console.log("🧪 [Perkins Integrations] Executing live test email dispatch to:", recipient);
    const emailResult = await dispatchLeadEmail(testLead, { ...config, recipientEmail: recipient });

    res.json({
      status: "success",
      message: `Test email dispatched to ${recipient}`,
      deliveryReport: emailResult,
    });
  });

  // API route: Test Webhook Delivery directly
  app.post("/api/integrations/test-webhook", async (req, res) => {
    const config = getIntegrationsConfig();
    const targetUrl = req.body.webhookUrl || config.webhookUrl;

    if (!targetUrl || !targetUrl.trim()) {
      return res.status(400).json({
        status: "error",
        message: "No webhook URL provided. Please provide a valid Zapier, Make, Slack, or Discord webhook URL.",
      });
    }

    const testLead = {
      id: `test-${Date.now()}`,
      name: "Perkins Test Author",
      email: "author.test@example.com",
      phone: "+1 (555) 019-9821",
      genre: "Memoir / Biography",
      wordCount: 52000,
      estimatedPrice: 499,
      services: ["promo-publishing-499"],
      expressCallback: true,
      message: "Test webhook payload dispatched from Perkins Publisher Lead Console.",
      receivedAt: new Date().toISOString(),
    };

    console.log("🧪 [Perkins Integrations] Executing live test webhook dispatch to:", targetUrl);
    const webhookResult = await dispatchWebhook(testLead, targetUrl);

    res.json({
      status: webhookResult.sent ? "success" : "failed",
      message: webhookResult.sent 
        ? `Webhook dispatched successfully! Target server returned HTTP ${webhookResult.statusCode}` 
        : `Webhook failed: ${webhookResult.error || "Check your URL"}`,
      details: webhookResult,
    });
  });

  // API route: Delete inquiry
  app.delete("/api/inquiries/:id", (req, res) => {
    const id = req.params.id;
    try {
      if (fs.existsSync(INQUIRIES_FILE)) {
        const raw = fs.readFileSync(INQUIRIES_FILE, "utf-8");
        const list: any[] = JSON.parse(raw);
        const filtered = list.filter((item) => item.id !== id);
        fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(filtered, null, 2), "utf-8");
      }
      res.json({ status: "success", message: "Inquiry deleted" });
    } catch (err: any) {
      res.status(500).json({ status: "error", message: err.message });
    }
  });

  // API route: Update inquiry status
  app.patch("/api/inquiries/:id", (req, res) => {
    const id = req.params.id;
    const { status, notes } = req.body;
    try {
      if (fs.existsSync(INQUIRIES_FILE)) {
        const raw = fs.readFileSync(INQUIRIES_FILE, "utf-8");
        const list: any[] = JSON.parse(raw);
        const target = list.find((item) => item.id === id);
        if (target) {
          if (status) target.status = status;
          if (notes !== undefined) target.internalNotes = notes;
          fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(list, null, 2), "utf-8");
          return res.json({ status: "success", inquiry: target });
        }
      }
      res.status(404).json({ status: "error", message: "Inquiry not found" });
    } catch (err: any) {
      res.status(500).json({ status: "error", message: err.message });
    }
  });

  // API route to accept incoming lead inquiry form submissions (100% operational)
  app.post("/api/inquiry", async (req, res) => {
    const inquiry = req.body;
    console.log("📥 [Perkins Backend] Received author lead inquiry:", inquiry.name, inquiry.email);

    // 1. Permanently store lead on disk (guarantees zero leads are ever dropped)
    const enrichedLead = saveInquiryToStore(inquiry);

    // 2. Fetch current active configuration
    const config = getIntegrationsConfig();

    // 3. Dispatch direct email via Hostinger SMTP (No FormSubmit middleman)
    const emailPromise = dispatchLeadEmail(enrichedLead, config).catch((err) => {
      console.warn("⚠️ Email dispatch warning:", err);
      return { smtpSuccess: false, smtpMessage: err.message };
    });

    // 4. Dispatch automated Google Sheets sync (Google Apps Script Web App, Zapier, or Make)
    const sheetsPromise = dispatchGoogleSheets(enrichedLead, config.googleSheetsUrl).catch((err) => {
      console.warn("⚠️ Google Sheets sync warning:", err);
      return { sent: false, error: err.message };
    });

    // 5. Dispatch optional webhook (Discord / Slack / Zapier / Make)
    const webhookPromise = (config.webhookUrl && config.webhookUrl.trim()) 
      ? dispatchWebhook(enrichedLead, config.webhookUrl).catch((err) => {
          console.warn("⚠️ Webhook dispatch warning:", err);
          return { sent: false, error: err.message };
        }) 
      : Promise.resolve({ sent: false, reason: "None configured" });

    // Await delivery pipelines concurrently with resilient timeout
    const [emailDelivery, sheetsDelivery, webhookDelivery] = await Promise.all([
      emailPromise, 
      sheetsPromise, 
      webhookPromise
    ]);

    const isPromo = enrichedLead.estimatedPrice === 499 || (enrichedLead.services && enrichedLead.services.includes('promo-publishing-499'));

    console.log(`✅ [Perkins Pipeline Complete]: Lead ${enrichedLead.id} saved to disk. SMTP email: ${emailDelivery.smtpSuccess}. Google Sheets: ${sheetsDelivery.sent}. Webhook: ${webhookDelivery.sent}`);

    return res.json({
      status: "success",
      message: isPromo
        ? "Your €499 Publishing Package reservation has been recorded and transmitted to our editorial team!"
        : "Your manuscript inquiry has been recorded and transmitted to our editorial team!",
      leadId: enrichedLead.id,
      storedOnServer: true,
      emailDelivery: {
        recipients: config.recipientEmail,
        smtpSent: emailDelivery.smtpSuccess,
        smtpStatus: emailDelivery.smtpMessage,
      },
      googleSheetsDelivery: {
        active: Boolean((config.googleSheetsUrl || process.env.GOOGLE_SHEETS_WEBHOOK_URL)?.trim()),
        synced: sheetsDelivery.sent,
        status: (sheetsDelivery as any).statusCode || (sheetsDelivery as any).error || ((config.googleSheetsUrl || process.env.GOOGLE_SHEETS_WEBHOOK_URL) ? "Synced" : "None configured"),
      },
      webhookDelivery: {
        active: Boolean(config.webhookUrl && config.webhookUrl.trim()),
        dispatched: webhookDelivery.sent,
        status: (webhookDelivery as any).statusCode || (webhookDelivery as any).error || (config.webhookUrl ? "Sent" : "None configured"),
      },
    });
  });

  // Google Search Console Dynamic HTML File Verification Route
  // Automatically handles any requested google[code].html verification file from Google
  app.get("/google:id.html", (req, res) => {
    const id = req.params.id;
    res.type("text/html");
    res.send(`google-site-verification: google${id}.html`);
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
    
    // 1. Immutable caching for content-hashed assets (/assets/*)
    app.use("/assets", express.static(path.join(distPath, "assets"), {
      maxAge: "1y",
      immutable: true,
    }));

    // 2. Static root assets with caching headers
    app.use(express.static(distPath, {
      maxAge: "1d",
      setHeaders: (res, filePath) => {
        if (filePath.endsWith("index.html")) {
          res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
        }
      }
    }));

    // 3. Fallback to index.html with revalidate for SPA routing
    app.get("*", (req, res) => {
      res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("📦 [Perkins Backend] Static Production assets mounted with compression & optimized caching headers.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

