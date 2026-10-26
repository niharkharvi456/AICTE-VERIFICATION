"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InstitutionLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [institutionId, setInstitutionId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !institutionId.trim() || !password) {
      setError("Please complete all fields.");
      return;
    }

    setLoading(true);

    // Frontend demonstration only; not real authentication.
    window.setTimeout(() => {
      sessionStorage.setItem("sv_demo_role", "institution");
      sessionStorage.setItem("sv_demo_email", email.trim());
      sessionStorage.setItem(
        "sv_demo_institution_id",
        institutionId.trim()
      );

      router.push("/institution/dashboard");
    }, 500);
  }

  return (
    <main className="login-page">
      {/* LEFT PANEL — SAME STRUCTURE AS ADMIN LOGIN */}
      <section className="login-visual">
        <div className="login-visual-overlay" />

        <Link href="/" className="login-brand">
          <img
            src="/images/aicte-logo.png"
            alt="AICTE logo"
            className="login-logo"
          />
          <span>AICTE Smart Verify</span>
        </Link>

        <div className="login-visual-content">
          <p className="login-eyebrow">INSTITUTION PORTAL</p>

          <h1>
            Verification starts
            <br />
            with trust.
          </h1>

          <p>
            Manage institutional applications, submit documents,
            and track verification progress through one central workspace.
          </p>
        </div>

        <div className="login-visual-footer">
          <span className="status-dot" />
          AICTE Smart Verify · Institution Portal
        </div>

        
      </section>

      {/* RIGHT PANEL — SAME STRUCTURE AS ADMIN LOGIN */}
      <section className="login-panel">
        <Link href="/login" className="login-back">
          <span aria-hidden="true">←</span>
          Change account type
        </Link>

        <div className="login-form-wrapper">
          <div className="login-mobile-brand">
            <img
              src="/images/aicte-logo.png"
              alt="AICTE logo"
            />
            <span>AICTE Smart Verify</span>
          </div>

          <p className="login-welcome-label">
            INSTITUTION ACCESS
          </p>

          <h2>Institution sign in</h2>

          <p className="login-description">
            Enter your details to access your institution workspace.
          </p>

          <form
            className="sv-login-form"
            onSubmit={handleSubmit}
          >
            <label htmlFor="institution-email">
              Official institution email
            </label>

            <input
              id="institution-email"
              type="email"
              placeholder="Enter official email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
            />

            <label htmlFor="institution-id">
              Institution ID / AISHE code
            </label>

            <input
              id="institution-id"
              type="text"
              placeholder="Enter institution ID"
              value={institutionId}
              onChange={(event) => setInstitutionId(event.target.value)}
              autoComplete="off"
              required
            />

            <label htmlFor="institution-password">
              Password
            </label>

            <div className="sv-password-field">
              <input
                id="institution-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="sv-password-toggle"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error && (
              <p className="sv-login-error">{error}</p>
            )}

            <button
              type="submit"
              className="google-signin-button sv-login-submit"
              disabled={loading}
            >
              <span>
                {loading
                  ? "Signing in..."
                  : "Sign in as Institution"}
              </span>

              <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="login-security-note">
            ◇ &nbsp; Frontend demonstration · No real authentication
          </p>

          <p className="login-help">
            Are you an administrator?{" "}
            <Link href="/admin/login">Admin login</Link>
          </p>
        </div>

        <footer className="login-footer">
          <span>© 2026 AICTE Smart Verify</span>
          <span>Institution workspace</span>
        </footer>
      </section>
    </main>
  );
}