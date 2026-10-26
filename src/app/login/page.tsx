"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="login-page">
      {/* Left visual panel */}
      <section className="login-visual">
        <div className="login-visual-overlay" />

        <Link href="/" className="login-brand">
          <img
            src="/images/aicte-logo.png"
            alt="AICTE Logo"
            className="login-logo"
          />
          <span>AICTE Smart Verify</span>
        </Link>

        <div className="login-visual-content">
          <span className="login-eyebrow">
            INTELLIGENT DOCUMENT VERIFICATION
          </span>

          <h1>
            A smarter way
            <br />
            to <span>verify.</span>
          </h1>

          <p>
            Simplifying institutional compliance through intelligent
            document verification and a more transparent digital workflow.
          </p>

          <div className="login-visual-footer">
            <span className="status-dot" />
            <span>Built for a smarter digital India</span>
          </div>
        </div>

        <div className="login-visual-bottom">
          <span>AICTE SMART VERIFY</span>
          <span></span>
        </div>
      </section>

      {/* Right role selection panel */}
      <section className="login-panel">
        <Link href="/" className="login-back">
          <span aria-hidden="true">←</span> Back to home
        </Link>

        <div className="login-form-wrapper role-selection-wrapper">
          <span className="login-welcome-label">
            WELCOME TO AICTE SMART VERIFY
          </span>

          <h2>Choose your workspace</h2>

          <p className="login-description">
            Select your account type to access the appropriate
            verification workspace.
          </p>

          <div className="role-selection-options">
            <Link href="/admin/login" className="role-selection-card">
              <span className="role-selection-icon" aria-hidden="true">
                A
              </span>

              <span className="role-selection-copy">
                <strong>Admin login</strong>
                <small>
                  Manage applications, review documents, and oversee
                  institutional verification.
                </small>
              </span>

              <span className="role-selection-arrow" aria-hidden="true">
                →
              </span>
            </Link>

            <Link
              href="/institution/login"
              className="role-selection-card"
            >
              <span className="role-selection-icon" aria-hidden="true">
                I
              </span>

              <span className="role-selection-copy">
                <strong>Institution login</strong>
                <small>
                  Submit applications, upload documents, and track
                  verification progress.
                </small>
              </span>

              <span className="role-selection-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <div className="login-security-note">
            <span aria-hidden="true">◇</span>
            <span>One platform. Two dedicated workspaces.</span>
          </div>

          <div className="login-help">
            <span>Need assistance?</span>
            <a href="mailto:support@example.com">Contact support</a>
          </div>
        </div>

        <footer className="login-footer">
          <span>© 2026 AICTE Smart Verify</span>
          <span>Designed for institutional excellence</span>
        </footer>
      </section>
    </main>
  );
}