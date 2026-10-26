"use client";

import { useMemo, useRef, useState } from "react";

type DocumentStatus = "Verified" | "Pending" | "Under Review" | "Flagged";

type InstitutionDocument = {
  id: string;
  name: string;
  category: string;
  uploaded: string;
  size: string;
  status: DocumentStatus;
  fileName?: string;
};

const initialDocuments: InstitutionDocument[] = [
  {
    id: "DOC-2026-001",
    name: "Extension of Approval",
    category: "Approval Document",
    uploaded: "26 Oct 2026",
    size: "2.4 MB",
    status: "Verified",
  },
  {
    id: "DOC-2026-002",
    name: "Faculty Details",
    category: "Faculty Records",
    uploaded: "25 Oct 2026",
    size: "1.8 MB",
    status: "Pending",
  },
  {
    id: "DOC-2026-003",
    name: "Infrastructure Report",
    category: "Infrastructure",
    uploaded: "24 Oct 2026",
    size: "3.2 MB",
    status: "Under Review",
  },
  {
    id: "DOC-2026-004",
    name: "Affiliation Certificate",
    category: "Affiliation",
    uploaded: "23 Oct 2026",
    size: "1.1 MB",
    status: "Flagged",
  },
];

export default function InstitutionDocumentsPage() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [selectedDocument, setSelectedDocument] =
    useState<InstitutionDocument | null>(null);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredDocuments = useMemo(() => {
    const query = search.toLowerCase().trim();

    return documents.filter((document) => {
      const matchesSearch =
        document.id.toLowerCase().includes(query) ||
        document.name.toLowerCase().includes(query) ||
        document.category.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All statuses" ||
        document.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [documents, search, statusFilter]);

  function uploadDocument(file?: File) {
    if (!file) return;

    const allowedExtensions = /\.(pdf|png|jpe?g)$/i;

    if (!allowedExtensions.test(file.name)) {
      setMessage("Please select a PDF, PNG, or JPG file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage("File size must be 10 MB or less.");
      return;
    }

    const newDocument: InstitutionDocument = {
      id: `DOC-${Date.now().toString().slice(-8)}`,
      name: file.name.replace(/\.[^/.]+$/, ""),
      category: "Uploaded Document",
      uploaded: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      status: "Pending",
      fileName: file.name,
    };

    setDocuments((current) => [newDocument, ...current]);

    setMessage(
      `${file.name} added to the demo list. It has not been uploaded to a server.`
    );

    fileInputRef.current?.value && (fileInputRef.current.value = "");
  }

  function exportCSV() {
    const header = [
      "Document ID",
      "Document Name",
      "Category",
      "Upload Date",
      "Size",
      "Status",
    ];

    const rows = filteredDocuments.map((document) => [
      document.id,
      document.name,
      document.category,
      document.uploaded,
      document.size,
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
    link.download = "institution-documents.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  function getStatusClass(status: DocumentStatus) {
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

  return (
    <div className="iw-content">
      <section className="iw-page-heading">
        <div>
          <div className="iw-eyebrow">
            <span className="iw-eyebrow-line" />
            INSTITUTION WORKSPACE
          </div>

          <h1>
            My <span>Documents.</span>
          </h1>

          <p>
            Upload, organize, and track your institution&apos;s documents.
          </p>
        </div>

        <div className="iw-heading-actions">
          <button
            type="button"
            className="iw-button iw-button-secondary"
            onClick={exportCSV}
          >
            Export CSV
          </button>

          <button
            type="button"
            className="iw-button iw-button-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            + Add document
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            hidden
            onChange={(event) => uploadDocument(event.target.files?.[0])}
          />
        </div>
      </section>

      {message && (
        <div className="iw-notice" role="status">
          <span>{message}</span>

          <button
            type="button"
            onClick={() => setMessage("")}
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}

      <section className="iw-stats-grid">
        <article className="iw-stat-card">
          <span>Total documents</span>
          <strong>{documents.length}</strong>
          <small>Documents in this session</small>
        </article>

        <article className="iw-stat-card">
          <span>Verified</span>
          <strong>
            {documents.filter((item) => item.status === "Verified").length}
          </strong>
          <small>Successfully verified</small>
        </article>

        <article className="iw-stat-card">
          <span>Pending</span>
          <strong>
            {documents.filter((item) => item.status === "Pending").length}
          </strong>
          <small>Awaiting review</small>
        </article>

        <article className="iw-stat-card">
          <span>Flagged</span>
          <strong>
            {documents.filter((item) => item.status === "Flagged").length}
          </strong>
          <small>Needs attention</small>
        </article>
      </section>

      <section className="iw-panel">
        <div className="iw-panel-heading">
          <div>
            <h2>All documents</h2>
            <p>{filteredDocuments.length} matching documents</p>
          </div>

          <div className="iw-table-actions">
            <input
              className="iw-input"
              type="search"
              placeholder="Search documents..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search documents"
            />

            <select
              className="iw-input"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter document status"
            >
              <option>All statuses</option>
              <option>Verified</option>
              <option>Pending</option>
              <option>Under Review</option>
              <option>Flagged</option>
            </select>
          </div>
        </div>

        <div className="iw-table-wrap">
          <table className="iw-table">
            <thead>
              <tr>
                <th>DOCUMENT</th>
                <th>CATEGORY</th>
                <th>UPLOADED</th>
                <th>FILE SIZE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredDocuments.map((document) => (
                <tr key={document.id}>
                  <td>
                    <div className="iw-document-cell">
                      <span className="iw-document-icon">▤</span>

                      <span>
                        <strong>{document.name}</strong>
                        <small>{document.id}</small>
                      </span>
                    </div>
                  </td>

                  <td>{document.category}</td>
                  <td>{document.uploaded}</td>
                  <td>{document.size}</td>

                  <td>
                    <span
                      className={`iw-status-badge ${getStatusClass(
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
                      Details
                    </button>
                  </td>
                </tr>
              ))}

              {filteredDocuments.length === 0 && (
                <tr>
                  <td colSpan={6}>No matching documents found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="iw-table-footer">
          <span>
            Showing {filteredDocuments.length} of {documents.length} documents
          </span>

          <span className="iw-demo-label">
            Demo data · Not live AICTE records
          </span>
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
            aria-labelledby="document-details-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="iw-modal-heading">
              <div>
                <h2 id="document-details-title">Document details</h2>
                <p>{selectedDocument.id}</p>
              </div>

              <button
                type="button"
                className="iw-modal-close"
                onClick={() => setSelectedDocument(null)}
                aria-label="Close document details"
              >
                ×
              </button>
            </div>

            <div className="iw-modal-details">
              <p>
                <strong>Name:</strong> {selectedDocument.name}
              </p>

              <p>
                <strong>Category:</strong> {selectedDocument.category}
              </p>

              <p>
                <strong>Uploaded:</strong> {selectedDocument.uploaded}
              </p>

              <p>
                <strong>Size:</strong> {selectedDocument.size}
              </p>

              <p>
                <strong>Status:</strong> {selectedDocument.status}
              </p>

              {selectedDocument.fileName && (
                <p>
                  <strong>Original file:</strong> {selectedDocument.fileName}
                </p>
              )}
            </div>

            <p className="iw-demo-notice">
              Demo mode: document details are stored in temporary page state.
              Files are not saved on a server or database.
            </p>

            <div className="iw-modal-actions">
              <button
                type="button"
                className="iw-button iw-button-secondary"
                onClick={() => setSelectedDocument(null)}
              >
                Close
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