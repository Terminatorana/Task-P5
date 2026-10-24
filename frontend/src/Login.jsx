import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "./authService";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const justRegistered = location.state?.registered;

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    setLoading(true);
    try {
      await loginUser(form);
      navigate("/"); // correct details -> straight to the home page
    } catch (err) {
      if (err.message === "INVALID_CREDENTIALS") {
        setFormError("Incorrect email or password.");
      } else {
        console.error(err);
        setFormError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card-top">
          <button
            type="button"
            className="auth-outline-btn"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </div>

        {justRegistered && (
          <p className="auth-success">
            Account created! Please log in with your new details.
          </p>
        )}

        {formError && (
          <p className="auth-error-box" role="alert">
            {formError} Please try again, or{" "}
            <Link to="/signup">sign up for a free account</Link>.
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Your email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
          {errors.email && <span className="auth-field-error">{errors.email}</span>}

          <label htmlFor="password">Your password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          {errors.password && (
            <span className="auth-field-error">{errors.password}</span>
          )}

          <button type="submit" className="auth-primary-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
