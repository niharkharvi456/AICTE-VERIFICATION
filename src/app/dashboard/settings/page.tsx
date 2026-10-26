"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [compactMode, setCompactMode] = useState(false);
  const [showDemoLabels, setShowDemoLabels] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      setCompactMode(
        localStorage.getItem("sv-setting-compact") === "true"
      );

      setShowDemoLabels(
        localStorage.getItem("sv-setting-demo-labels") !== "false"
      );
    } catch {
      // Keep defaults.
    }
  }, []);

  function saveSettings() {
    try {
      localStorage.setItem(
        "sv-setting-compact",
        String(compactMode)
      );

      localStorage.setItem(
        "sv-setting-demo-labels",
        String(showDemoLabels)
      );

      setMessage("Preferences saved in this browser.");
    } catch {
      setMessage("Browser storage is unavailable. Preferences were not saved.");
    }
  }

  return (
    <div className="sv-content">
      <header className="sv-page-heading">
        <div>
          <div className="sv-eyebrow">
            <span className="sv-eyebrow-line" />
            PREFERENCES
          </div>

          <h1>Settings</h1>

          <p>Configure basic preferences for this browser prototype.</p>
        </div>
      </header>

      <section className="sv-panel sv-applications-panel">
        <div className="sv-applications-heading">
          <div>
            <h2>Dashboard preferences</h2>
            <p>These settings are saved locally in your browser.</p>
          </div>
        </div>

        <div style={{ padding: 24 }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              padding: "16px 0",
              borderBottom: "1px solid #e8edf4",
            }}
          >
            <span>
              <strong>Compact dashboard mode</strong>
              <br />
              <small>Save your compact-view preference.</small>
            </span>

            <input
              type="checkbox"
              checked={compactMode}
              onChange={(event) => setCompactMode(event.target.checked)}
            />
          </label>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              padding: "16px 0",
            }}
          >
            <span>
              <strong>Show demo labels</strong>
              <br />
              <small>Keep prototype data clearly identified.</small>
            </span>

            <input
              type="checkbox"
              checked={showDemoLabels}
              onChange={(event) =>
                setShowDemoLabels(event.target.checked)
              }
            />
          </label>

          <button
            type="button"
            className="sv-button sv-button-primary"
            onClick={saveSettings}
          >
            Save preferences
          </button>

          {message && (
            <p role="status" style={{ marginTop: 16 }}>
              {message}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}