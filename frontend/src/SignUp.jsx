import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "./authService";
import "./Auth.css";

const emptyForm = { name: "", email: "", password: "", confirmPassword: "" };

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.name || !form.email || !form.password) {
      setFormError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await registerUser(form);
      navigate("/login", { state: { registered: true } });
    } catch (err) {
      if (err.message === "EMAIL_TAKEN") {
        setFormError("An account with that email already exists.");
      } else {
        console.error(err);
        setFormError("Could not create your account. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card-signup">
        <h2 className="auth-title">Create a DEV@Deakin Account</h2>

        {formError && (
          <p className="auth-error-box" role="alert">
            {formError} <Link to="/login">Go to login</Link>
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate className="auth-grid-form">
          <label htmlFor="name">Name*</label>
          <div>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="First and last name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
            {errors.name && <span className="auth-field-error">{errors.name}</span>}
          </div>

          <label htmlFor="signup-email">Email*</label>
          <div>
            <input
              id="signup-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && (
              <span className="auth-field-error">{errors.email}</span>
            )}
          </div>

          <label htmlFor="signup-password">Password*</label>
          <div>
            <input
              id="signup-password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors.password && (
              <span className="auth-field-error">{errors.password}</span>
            )}
          </div>

          <label htmlFor="confirmPassword">Confirm password*</label>
          <div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <span className="auth-field-error">{errors.confirmPassword}</span>
            )}
          </div>

          <span />
          <button type="submit" className="auth-primary-btn" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}
