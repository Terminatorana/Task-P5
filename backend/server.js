import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
// Must be a sender you verified in SendGrid (Settings -> Sender Authentication)
const SENDER_EMAIL = process.env.SENDER_EMAIL;

// Simple, strict email check (also stops characters like < > being used in the email)
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// Only our React app may call this API from a browser
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json({ limit: "10kb" }));

// Sends the welcome email through the SendGrid email API
async function sendWelcomeEmail(to) {
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: SENDER_EMAIL, name: "DEV@Deakin" },
      subject: "Welcome to the DEV@Deakin Daily Insider",
      content: [
        {
          type: "text/plain",
          value:
            "Welcome to DEV@Deakin! Thanks for subscribing to our Daily Insider newsletter.",
        },
        {
          type: "text/html",
          value: `
            <h2>Welcome to DEV@Deakin!</h2>
            <p>Thanks for subscribing to our Daily Insider newsletter.</p>
            <p>You'll get the latest articles and tutorials straight to your inbox.</p>
          `,
        },
      ],
    }),
  });

  // SendGrid answers 202 Accepted with an empty body when the email is queued
  const text = await response.text();

  // Screenshot this line in your terminal for the report
  console.log(
    `Email API responded with status ${response.status} ${response.statusText}`,
    text || "(empty body = success)"
  );

  return { ok: response.ok, status: response.status };
}

// Quick check that the server is running
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running." });
});

app.post("/api/subscribe", async (req, res) => {
  try {
    const raw = req.body?.email;

    // ---- Validation ----
    if (typeof raw !== "string" || raw.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });
    }

    const email = raw.trim().toLowerCase();

    if (email.length > 254 || !EMAIL_REGEX.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email address." });
    }

    if (!process.env.SENDGRID_API_KEY || !SENDER_EMAIL) {
      console.error("SENDGRID_API_KEY or SENDER_EMAIL is missing from backend/.env");
      return res
        .status(500)
        .json({ success: false, message: "Email service is not configured." });
    }

    // ---- Send the email ----
    const result = await sendWelcomeEmail(email);

    if (result.ok) {
      return res.status(200).json({
        success: true,
        message: `Thanks for subscribing! A welcome email is on its way to ${email}.`,
      });
    }

    // ---- The email API refused: explain why ----
    if (result.status === 400) {
      return res.status(400).json({
        success: false,
        message: "The email service rejected that request. Please check the email address.",
      });
    }
    if (result.status === 401) {
      return res.status(500).json({
        success: false,
        message: "Email service credentials are invalid.",
      });
    }
    if (result.status === 403) {
      return res.status(403).json({
        success: false,
        message:
          "The email service refused to send. Check that the sender email is verified in SendGrid.",
      });
    }
    if (result.status === 429) {
      return res.status(429).json({
        success: false,
        message: "Too many emails have been sent. Please try again later.",
      });
    }

    return res.status(502).json({
      success: false,
      message: "The email service could not send your email. Please try again later.",
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error. Please try again later." });
  }
});

// Unknown route
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// Error handler (e.g. malformed JSON in the request body)
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res
      .status(400)
      .json({ success: false, message: "Invalid JSON in request body." });
  }
  console.error(err);
  res.status(500).json({ success: false, message: "Server error." });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});