import { useState } from "react";
import "./Subscribe.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // { type: "success" | "error", message }
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();

    // Validate on the frontend first (the backend validates again)
    if (!trimmed) {
      setStatus({ type: "error", message: "Please enter your email address." });
      return;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_URL}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus({
          type: "success",
          message: data.message || "Subscribed! Please check your inbox.",
        });
        setEmail("");
      } else {
        // The server answered with an error status (400, 403, 429, 500...)
        setStatus({
          type: "error",
          message: data.message || `Something went wrong (status ${response.status}).`,
        });
      }
    } catch (error) {
      // The request never reached the server
      console.error(error);
      setStatus({
        type: "error",
        message:
          "Could not reach the server. Make sure the backend is running and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sub-section">
      <form className="sub-form" onSubmit={handleSubmit} noValidate>
        <span className="sub-title">SIGN UP FOR OUR DAILY INSIDER</span>
        <input
          className="sub-input"
          type="email"
          placeholder="Enter your email"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="sub-button" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Subscribe"}
        </button>
      </form>

      {status && (
        <p className={`sub-message sub-${status.type}`} role="status">
          {status.message}
        </p>
      )}
    </section>
  );
}
