"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleAdminLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your admin email and password.");
      return;
    }

    setLoading(true);

    // Frontend demo only — no real authentication.
    window.setTimeout(() => {
      sessionStorage.setItem("sv_demo_role", "admin");
      sessionStorage.setItem("sv_demo_email", email.trim());

      router.push("/dashboard");
    }, 500);
  }

  return (
    <main className="login-page">
      {/* Left visual panel */}
      <section className="login-visual">
        <div className="login-visual-overlay" />

        <Link href="/login" className="login-brand">
          <img
            src="/images/aicte-logo.png"
            alt="AICTE logo"
            className="login-logo"
          />
          <span>AICTE Smart Verify</span>
        </Link>

        <div className="login-visual-content">
          <span className="login-eyebrow">
            ADMINISTRATOR WORKSPACE
          </span>

          <h1>
            Oversight with
            <br />
            <span>clarity.</span>
          </h1>

          <p>
            Review institutional applications, monitor document
            verification, and manage the approval workflow from
            one central workspace.
          </p>

          <div className="login-visual-footer">
            <span className="status-dot" />
            <span>AICTE Smart Verify · Admin Portal</span>
          </div>
        </div>

        <div className="login-visual-bottom">
          <span>ADMINISTRATOR ACCESS</span>
          <span></span>
        </div>
      </section>

      {/* Right login panel */}
      <section className="login-panel">
        <Link href="/login" className="login-back">
          <span aria-hidden="true">←</span> Change account type
        </Link>

        <div className="login-form-wrapper">
          <div className="login-mobile-brand">
            <img src="/images/aicte-logo.png" alt="AICTE logo" />
            <span>AICTE Smart Verify</span>
          </div>

          <span className="login-welcome-label">
            ADMINISTRATOR ACCESS
          </span>

          <h2>Admin sign in</h2>

          <p className="login-description">
            Enter your details to access the administration dashboard.
          </p>

          <form onSubmit={handleAdminLogin} className="sv-login-form">
            <label htmlFor="admin-email">Administrator email</label>

            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              placeholder="admin@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <label htmlFor="admin-password">Password</label>

            <div className="sv-password-field">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <button
                type="button"
                className="sv-password-toggle"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error && (
              <p className="sv-login-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="google-signin-button sv-login-submit"
              disabled={loading}
            >
              <span>{loading ? "Opening dashboard..." : "Sign in as Admin"}</span>
              {!loading && (
                <span aria-hidden="true">→</span>
              )}
            </button>
          </form>

          <div className="login-security-note">
            <span aria-hidden="true">◇</span>
            <span>Frontend demonstration · No real authentication</span>
          </div>

          <div className="login-help">
            <span>Not an administrator?</span>
            <Link href="/institution/login">Institution login</Link>
          </div>
        </div>

        <footer className="login-footer">
          <span>© 2026 AICTE Smart Verify</span>
          <span>Administrator workspace</span>
        </footer>
      </section>
    </main>
  );
}