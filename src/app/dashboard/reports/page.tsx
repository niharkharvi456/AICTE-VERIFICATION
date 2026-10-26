"use client";

import { useEffect, useState } from "react";

type Application = {
  id: string;
  institution: string;
  type: string;
  submitted: string;
  status: string;
};

export default function ReportsPage() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        "aicte-smart-verify-applications"
      );

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setApplications(parsed);
        }
      }
    } catch {
      setApplications([]);
    }
  }, []);

  const verified = applications.filter(
    (application) => application.status === "Verified"
  ).length;

  const pending = applications.filter(
    (application) => application.status === "Pending"
  ).length;

  const flagged = applications.filter(
    (application) => application.status === "Flagged"
  ).length;

  function exportCSV() {
    const headers = [
      "Application ID",
      "Institution / Document",
      "Type",
      "Submitted",
      "Status",
    ];

    const rows = applications.map((application) => [
      application.id,
      application.institution,
      application.type,
      application.submitted,
      application.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\r\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "aicte-smart-verify-report.csv";
    anchor.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="sv-content">
      <header className="sv-page-heading">
        <div>
          <div className="sv-eyebrow">
            <span className="sv-eyebrow-line" />
            REPORTING
          </div>

          <h1>Reports & Analytics</h1>

          <p>Review summary counts from the browser's demo records.</p>
        </div>

        <button
          type="button"
          className="sv-button sv-button-primary"
          onClick={exportCSV}
        >
          Export CSV
        </button>
      </header>

      <div className="sv-view-notice">
        <span>All figures below are based on demo records, not live data.</span>
      </div>

      <section className="sv-metrics">
        <article className="sv-metric-card">
          <div className="sv-metric-label">Total records</div>
          <div className="sv-metric-value">{applications.length}</div>
        </article>

        <article className="sv-metric-card">
          <div className="sv-metric-label">Verified</div>
          <div className="sv-metric-value">{verified}</div>
        </article>

        <article className="sv-metric-card">
          <div className="sv-metric-label">Pending</div>
          <div className="sv-metric-value">{pending}</div>
        </article>

        <article className="sv-metric-card">
          <div className="sv-metric-label">Flagged</div>
          <div className="sv-metric-value">{flagged}</div>
        </article>
      </section>

      <section className="sv-panel sv-applications-panel">
        <div className="sv-applications-heading">
          <div>
            <h2>Report summary</h2>
            <p>Current status distribution.</p>
          </div>
        </div>

        {[
          { label: "Verified", count: verified },
          { label: "Pending", count: pending },
          {
            label: "Under Review",
            count: applications.filter(
              (application) => application.status === "Under Review"
            ).length,
          },
          { label: "Flagged", count: flagged },
        ].map((item) => {
          const percentage =
            applications.length === 0
              ? 0
              : Math.round((item.count / applications.length) * 100);

          return (
            <div
              key={item.label}
              style={{ padding: "14px 24px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  marginBottom: 8,
                }}
              >
                <span>{item.label}</span>
                <strong>
                  {item.count} ({percentage}%)
                </strong>
              </div>

              <div
                style={{
                  height: 8,
                  background: "#e8edf4",
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${percentage}%`,
                    height: "100%",
                    background: "#2456a6",
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}