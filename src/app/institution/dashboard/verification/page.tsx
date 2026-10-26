"use client";

import { useMemo, useState } from "react";

type VerificationStatus = "Pending" | "Verified" | "Flagged" | "Under Review";

type DocumentRecord = {
  id: string;
  institution: string;
  document: string;
  submitted: string;
  status: VerificationStatus;
};

const initialDocuments: DocumentRecord[] = [
  {
    id: "DOC-2026-001",
    institution: "BMS Institute of Technology",
    document: "Extension of Approval",
    submitted: "26 Oct 2026",
    status: "Pending",
  },
  {
    id: "DOC-2026-002",
    institution: "BMS Institute of Technology",
    document: "Faculty Details",
    submitted: "25 Oct 2026",
    status: "Under Review",
  },
  {
    id: "DOC-2026-003",
    institution: "BMS Institute of Technology",
    document: "Infrastructure Report",
    submitted: "24 Oct 2026",
    status: "Verified",
  },
  {
    id: "DOC-2026-004",
    institution: "BMS Institute of Technology",
    document: "Affiliation Certificate",
    submitted: "23 Oct 2026",
    status: "Flagged",
  },
];

export default function DocumentVerificationPage() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All statuses");
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentRecord | null>(null);

  const filteredDocuments = useMemo(() => {
    const query = search.toLowerCase().trim();

    return documents.filter((document) => {
      const matchesSearch =
        document.id.toLowerCase().includes(query) ||
        document.institution.toLowerCase().includes(query) ||
        document.document.toLowerCase().includes(query);

      const matchesStatus =
        filter === "All statuses" || document.status === filter;

      return matchesSearch && matchesStatus;
    });
  }, [documents, search, filter]);

  function updateStatus(
    id: string,
    status: VerificationStatus
  ) {
    setDocuments((current) =>
      current.map((document) =>
        document.id === id
          ? { ...document, status }
          : document
      )
    );

    setSelectedDocument(null);
  }

  function exportCSV() {
    const header = [
      "Document ID",
      "Institution",
      "Document",
      "Submitted",
      "Status",
    ];

    const rows = filteredDocuments.map((document) => [
      document.id,
      document.institution,
      document.document,
      document.submitted,
      document.status,
    ]);

    const csv = [header, ...rows]
      .map((row) =>
        row.map((value) => `"${value.replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = window.document.createElement("a");

    link.href = url;
    link.download = "document-verification.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  function statusClass(status: VerificationStatus) {
    switch (status) {
      case "Verified":
        return "status-verified";
      case "Pending":
        return "status-pending";
      case "Flagged":
        return "status-flagged";
      default:
        return "status-review";
    }
  }

  const pendingCount = documents.filter(
    (document) => document.status === "Pending"
  ).length;

  const verifiedCount = documents.filter(
    (document) => document.status === "Verified"
  ).length;

  const flaggedCount = documents.filter(
    (document) => document.status === "Flagged"
  ).length;

  return (
    <div className="iw-content">
      <section className="iw-page-heading">
        <div>
          <div className="iw-eyebrow">
            <span className="iw-eyebrow-line" />
            INSTITUTION WORKSPACE
          </div>

          <h1>
            Document <span>Verification.</span>
          </h1>

          <p>
            Review submitted documents and track their verification status.
          </p>
        </div>

        <button
          type="button"
          className="iw-button iw-button-secondary"
          onClick={exportCSV}
        >
          Export CSV
        </button>
      </section>

      <section className="iw-stats-grid">
        <article className="iw-stat-card">
          <span>Total documents</span>
          <strong>{documents.length}</strong>
          <small>All submitted documents</small>
        </article>

        <article className="iw-stat-card">
          <span>Verified</span>
          <strong>{verifiedCount}</strong>
          <small>Successfully verified</small>
        </article>

        <article className="iw-stat-card">
          <span>Pending review</span>
          <strong>{pendingCount}</strong>
          <small>Awaiting action</small>
        </article>

        <article className="iw-stat-card">
          <span>Flagged</span>
          <strong>{flaggedCount}</strong>
          <small>Needs attention</small>
        </article>
      </section>

      <section className="iw-panel">
        <div className="iw-panel-heading">
          <div>
            <h2>Submitted documents</h2>
            <p>
              {filteredDocuments.length} matching documents
            </p>
          </div>

          <div className="iw-table-actions">
            <input
              className="iw-input"
              type="search"
              placeholder="Search documents..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              className="iw-input"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            >
              <option>All statuses</option>
              <option>Pending</option>
              <option>Under Review</option>
              <option>Verified</option>
              <option>Flagged</option>
            </select>
          </div>
        </div>

        <div className="iw-table-wrap">
          <table className="iw-table">
            <thead>
              <tr>
                <th>DOCUMENT ID</th>
                <th>INSTITUTION / DOCUMENT</th>
                <th>SUBMITTED</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredDocuments.map((document) => (
                <tr key={document.id}>
                  <td>
                    <strong className="iw-document-id">
                      {document.id}
                    </strong>
                  </td>

                  <td>
                    <div className="iw-document-cell">
                      <span className="iw-document-icon">
                        ▤
                      </span>

                      <span>
                        <strong>{document.institution}</strong>
                        <small>{document.document}</small>
                      </span>
                    </div>
                  </td>

                  <td>{document.submitted}</td>

                  <td>
                    <span
                      className={`iw-status-badge ${statusClass(
                        document.status
                      )}`}
                    >
                      <span className="iw-status-dot" />
                      {document.status}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="iw-view-button"
                      onClick={() => setSelectedDocument(document)}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}

              {filteredDocuments.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    No matching documents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="iw-table-footer">
          <span>
            Showing {filteredDocuments.length} of {documents.length} documents
          </span>
          <span>Demo data · Not live AICTE records</span>
        </div>
      </section>

      {selectedDocument && (
        <div
          className="iw-modal-backdrop"
          onClick={() => setSelectedDocument(null)}
        >
          <section
            className="iw-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="verification-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="iw-modal-heading">
              <div>
                <h2 id="verification-modal-title">
                  Review document
                </h2>
                <p>{selectedDocument.id}</p>
              </div>

              <button
                type="button"
                className="iw-modal-close"
                aria-label="Close dialog"
                onClick={() => setSelectedDocument(null)}
              >
                ×
              </button>
            </div>

            <div className="iw-modal-details">
              <p>
                <strong>Institution:</strong>{" "}
                {selectedDocument.institution}
              </p>

              <p>
                <strong>Document:</strong>{" "}
                {selectedDocument.document}
              </p>

              <p>
                <strong>Submitted:</strong>{" "}
                {selectedDocument.submitted}
              </p>

              <p>
                <strong>Current status:</strong>{" "}
                {selectedDocument.status}
              </p>
            </div>

            <p className="iw-demo-notice">
              Demo mode: these actions update the page state only.
              No actual document or AI verification is performed.
            </p>

            <div className="iw-modal-actions">
              <button
                type="button"
                className="iw-button iw-button-secondary"
                onClick={() =>
                  updateStatus(selectedDocument.id, "Under Review")
                }
              >
                Mark for review
              </button>

              <button
                type="button"
                className="iw-button iw-button-danger"
                onClick={() =>
                  updateStatus(selectedDocument.id, "Flagged")
                }
              >
                Flag
              </button>

              <button
                type="button"
                className="iw-button iw-button-primary"
                onClick={() =>
                  updateStatus(selectedDocument.id, "Verified")
                }
              >
                Mark verified
              </button>
            </div>
          </section>
        </div>
      )}

      <footer className="iw-footer">
        <span>© 2026 AICTE Smart Verify</span>
        <span>Institution portal · Demo data</span>
      </footer>
    </div>
  );
}