"use client";

import { useEffect, useState } from "react";

type Application = {
  id: string;
  institution: string;
  type: string;
  submitted: string;
  status: "Verified" | "Pending" | "Under Review" | "Flagged";
};

const demoApplications: Application[] = [
  {
    id: "AICTE-2026-1040",
    institution: "Central Technical College",
    type: "Intake Variation",
    submitted: "25 Oct 2026",
    status: "Under Review",
  },
  {
    id: "AICTE-2026-1039",
    institution: "National College of Technology",
    type: "Document Verification",
    submitted: "25 Oct 2026",
    status: "Flagged",
  },
];

export default function AIVerificationPage() {
  const [applications, setApplications] =
    useState<Application[]>(demoApplications);

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
      // Keep sample records.
    }
  }, []);

  const reviewQueue = applications.filter(
    (application) =>
      application.status === "Under Review" ||
      application.status === "Flagged"
  );

  return (
    <div className="sv-content">
      <header className="sv-page-heading">
        <div>
          <div className="sv-eyebrow">
            <span className="sv-eyebrow-line" />
            VERIFICATION WORKSPACE
          </div>

          <h1>AI Verification</h1>

          <p>
            Review records that may require additional attention.
          </p>
        </div>
      </header>

      <div className="sv-view-notice">
        <span>
          <strong>Prototype mode:</strong> no AI model is processing
          documents. The queue uses sample status records.
        </span>
      </div>

      <section className="sv-metrics">
        <article className="sv-metric-card">
          <div className="sv-metric-label">Review queue</div>
          <div className="sv-metric-value">{reviewQueue.length}</div>
          <div className="sv-metric-footnote">Sample records</div>
        </article>

        <article className="sv-metric-card">
          <div className="sv-metric-label">Under review</div>
          <div className="sv-metric-value">
            {reviewQueue.filter((a) => a.status === "Under Review").length}
          </div>
        </article>

        <article className="sv-metric-card">
          <div className="sv-metric-label">Flagged</div>
          <div className="sv-metric-value">
            {reviewQueue.filter((a) => a.status === "Flagged").length}
          </div>
        </article>
      </section>

      <section className="sv-panel sv-applications-panel">
        <div className="sv-applications-heading">
          <div>
            <h2>Manual review queue</h2>
            <p>Records marked for further inspection.</p>
          </div>
        </div>

        <div className="sv-table-wrap">
          <table className="sv-table">
            <thead>
              <tr>
                <th>APPLICATION</th>
                <th>INSTITUTION</th>
                <th>DOCUMENT TYPE</th>
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody>
              {reviewQueue.map((application) => (
                <tr key={application.id}>
                  <td>
                    <span className="sv-application-id">
                      {application.id}
                    </span>
                  </td>

                  <td>{application.institution}</td>
                  <td>{application.type}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        application.status === "Flagged"
                          ? "status-flagged"
                          : "status-review"
                      }`}
                    >
                      <span className="status-dot" />
                      {application.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {reviewQueue.length === 0 && (
            <div className="sv-empty-state">
              <strong>No records require review</strong>
              <p>There are no matching sample records in this queue.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}