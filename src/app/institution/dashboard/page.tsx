"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import "../../dashboard/dashboard.css";

type ApplicationStatus = "Verified" | "Pending" | "Under Review" | "Flagged";

type Application = {
  id: string;
  institution: string;
  type: string;
  submitted: string;
  status: ApplicationStatus;
};

const initialApplications: Application[] = [
  {
    id: "INST-2026-001",
    institution: "Extension of Approval",
    type: "Application submission",
    submitted: "26 Oct 2026",
    status: "Under Review",
  },
  {
    id: "INST-2026-002",
    institution: "Faculty Details",
    type: "Supporting document",
    submitted: "25 Oct 2026",
    status: "Pending",
  },
  {
    id: "INST-2026-003",
    institution: "Infrastructure Report",
    type: "Compliance document",
    submitted: "24 Oct 2026",
    status: "Verified",
  },
  {
    id: "INST-2026-004",
    institution: "Affiliation Certificate",
    type: "Supporting document",
    submitted: "23 Oct 2026",
    status: "Flagged",
  },
];

const navItems = [
  {
    label: "Overview",
    href: "/institution/dashboard",
    icon: "grid",
  },
  {
    label: "My Applications",
    href: "/institution/dashboard/applications",
    icon: "files",
  },
  {
    label: "Document Verification",
    href: "/institution/dashboard/verification",
    icon: "scan",
  },
  {
    label: "My Documents",
    href: "/institution/dashboard/documents",
    icon: "document",
  },
  {
    label: "Verification Reports",
    href: "/institution/dashboard/reports",
    icon: "chart",
  },
];

function Icon({
  name,
  size = 18,
}: {
  name: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "grid":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "files":
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 4V2h10a2 2 0 0 1 2 2v13h-2" />
          <path d="M9 9h6M9 13h6M9 17h4" />
        </svg>
      );
    case "scan":
      return (
        <svg {...common}>
          <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
          <path d="m8 12 2.5 2.5L16 9" />
        </svg>
      );
    case "document":
      return (
        <svg {...common}>
          <path d="M6 3h8l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path d="M14 3v5h5M8 12h7M8 16h7" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="m7 14 4-4 4 3 5-7" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 5 5" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="m19.4 15 .1.1 1.1.9-1.5 2.6-1.4-.5a8 8 0 0 1-1.7 1l-.3 1.5h-3l-.3-1.5a8 8 0 0 1-1.7-1l-1.4.5-1.5-2.6 1.1-.9a7 7 0 0 1 0-2l-1.1-.9 1.5-2.6 1.4.5a8 8 0 0 1 1.7-1l.3-1.5h3l.3 1.5a8 8 0 0 1 1.7 1l1.4-.5 1.5 2.6-1.1.9a7 7 0 0 1 0 2Z" transform="translate(-1 -1) scale(1.08)" />
        </svg>
      );
    case "help":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.6 9a2.5 2.5 0 0 1 4.8 1c0 2-2.4 2-2.4 4M12 17.5h.01" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "upload":
      return (
        <svg {...common}>
          <path d="M12 16V4m-5 5 5-5 5 5" />
          <path d="M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    default:
      return null;
  }
}

function StatusBadge({ status }: { status: ApplicationStatus }) {
  const classes: Record<ApplicationStatus, string> = {
    Verified: "status-verified",
    Pending: "status-pending",
    "Under Review": "status-review",
    Flagged: "status-flagged",
  };

  return (
    <span className={`status-badge ${classes[status]}`}>
      <span className="status-dot" />
      {status}
    </span>
  );
}

export default function InstitutionDashboard() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);
  const [storageReady, setStorageReady] = useState(false);

  // Load saved prototype records once in the browser.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("aicte-smart-verify-institution-applications");
      if (saved) {
        const parsed = JSON.parse(saved) as Application[];
        if (Array.isArray(parsed)) setApplications(parsed);
      }
    } catch {
      // If local storage is unavailable or malformed, keep the starter records.
    } finally {
      setStorageReady(true);
    }
  }, []);

  // Persist changes between refreshes on this browser only.
  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem(
        "aicte-smart-verify-institution-applications",
        JSON.stringify(applications)
      );
    } catch {
      // Dashboard remains usable even if browser storage is disabled.
    }
  }, [applications, storageReady]);

  function exportApplications() {
    const headers = ["Application ID", "Institution / Document", "Type", "Submitted", "Status"];
    const rows = filteredApplications.map((application) => [
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
    anchor.download = "aicte-smart-verify-institution-applications.csv";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  const filteredApplications = useMemo(() => {
    const query = search.toLowerCase().trim();

    return applications.filter((application) => {
      const matchesSearch =
        !query ||
        application.id.toLowerCase().includes(query) ||
        application.institution.toLowerCase().includes(query) ||
        application.type.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All statuses" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  const counts = useMemo(
    () => ({
      total: applications.length,
      verified: applications.filter((a) => a.status === "Verified").length,
      pending: applications.filter((a) => a.status === "Pending").length,
      flagged: applications.filter((a) => a.status === "Flagged").length,
    }),
    [applications]
  );

  function handleUpload() {
    if (!selectedFile) {
      setUploadMessage("Please select a document first.");
      return;
    }

    const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
    const allowedExtensions = /\\.(pdf|png|jpe?g)$/i;
    if (!allowedTypes.includes(selectedFile.type) && !allowedExtensions.test(selectedFile.name)) {
      setUploadMessage("Unsupported file type. Choose a PDF, PNG, or JPG file.");
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setUploadMessage("The file is too large. Choose a file under 10 MB.");
      return;
    }

    const newApplication: Application = {
      id: `AICTE-DEMO-${Date.now().toString().slice(-6)}`,
      institution: selectedFile.name,
      type: "Uploaded document",
      submitted: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Pending",
    };

    setApplications((current) => [newApplication, ...current]);
    setUploadMessage(
      `Added ${selectedFile.name} to this browser's prototype records. The file itself is not uploaded to a server or retained after this session.`
    );
    setSelectedFile(null);
  }

  function selectNavigation(label: string) {
    setActiveNav(label);

    if (label === "Overview") {
      setSearch("");
      setStatusFilter("All statuses");
    } else if (label === "My Applications") {
      setSearch("");
      setStatusFilter("All statuses");
    } else if (label === "Document Verification") {
      setStatusFilter("Under Review");
    } else if (label === "My Documents") {
      setSearch("");
      setStatusFilter("All statuses");
    } else if (label === "Verification Reports") {
      setStatusFilter("All statuses");
    }
  }

  return (
    <div className="sv-content">
          <section className="sv-page-heading">
            <div>
              <div className="sv-eyebrow">
                <span className="sv-eyebrow-line" />
                INSTITUTION WORKSPACE
              </div>
              <h1>
                Welcome to your <span>workspace.</span>
              </h1>
              <p>
                Track your applications, manage documents, and review verification progress.
              </p>
            </div>

            <div className="sv-heading-actions">
              <button
                type="button"
                className="sv-button sv-button-secondary"
                onClick={exportApplications}
              >
                <Icon name="document" size={16} />
                Export CSV
              </button>
              <button
                type="button"
                className="sv-button sv-button-primary"
                onClick={() => {
                  setShowUpload(true);
                  setUploadMessage("");
                }}
              >
                <Icon name="upload" size={17} />
                Add document
              </button>
            </div>
          </section>

          {activeNav !== "Overview" && (
            <div className="sv-view-notice">
              <span>
                Viewing <strong>{activeNav}</strong> in institution demo mode.
              </span>
              <button type="button" onClick={() => selectNavigation("Overview")}>
                Return to overview
              </button>
            </div>
          )}

          <section className="sv-metrics" aria-label="Application metrics">
            <article className="sv-metric-card">
              <div className="sv-metric-top">
                <span className="sv-metric-label">Total applications</span>
                <span className="sv-metric-icon indigo">
                  <Icon name="files" size={18} />
                </span>
              </div>
              <div className="sv-metric-value">{counts.total}</div>
              <div className="sv-metric-bottom">
                <span className="sv-metric-trend neutral">Demo data</span>
<span>Sample applications</span>
              </div>
              <div className="sv-mini-bars" aria-hidden="true">
                {[35, 48, 41, 65, 52, 76, 61, 85, 68, 96, 78, 100].map(
                  (height, index) => (
                    <span key={index} style={{ height: `${height}%` }} />
                  )
                )}
              </div>
            </article>

            <article className="sv-metric-card">
              <div className="sv-metric-top">
                <span className="sv-metric-label">Verified documents</span>
                <span className="sv-metric-icon green">
                  <Icon name="scan" size={18} />
                </span>
              </div>
              <div className="sv-metric-value">
                {counts.verified.toLocaleString("en-IN")}
              </div>
              <div className="sv-metric-bottom">
                <span className="sv-metric-trend positive">Verified</span>
<span>Sample applications</span>
              </div>
              <div className="sv-metric-progress">
                <span style={{ width: "78%" }} />
              </div>
              <div className="sv-metric-footnote">78% completion rate</div>
            </article>

            <article className="sv-metric-card">
              <div className="sv-metric-top">
                <span className="sv-metric-label">Pending review</span>
                <span className="sv-metric-icon amber">
                  <Icon name="clock" size={18} />
                </span>
              </div>
              <div className="sv-metric-value">
                {counts.pending.toLocaleString("en-IN")}
              </div>
              <div className="sv-metric-bottom">
                <span className="sv-metric-trend neutral">Awaiting action</span>
              </div>
              <div className="sv-metric-progress amber-progress">
                <span style={{ width: "43%" }} />
              </div>
              <div className="sv-metric-footnote">Prioritise older submissions</div>
            </article>

            <article className="sv-metric-card">
              <div className="sv-metric-top">
                <span className="sv-metric-label">Flagged for review</span>
                <span className="sv-metric-icon red">
                  <Icon name="help" size={18} />
                </span>
              </div>
              <div className="sv-metric-value">
                {counts.flagged.toLocaleString("en-IN")}
              </div>
              <div className="sv-metric-bottom">
                <span className="sv-metric-trend attention">Needs attention</span>
                <span>Current records</span>
              </div>
              <div className="sv-metric-footnote">
                Potential discrepancies · not AI results
              </div>
            </article>
          </section>

          <section className="sv-insights-grid">
            <article className="sv-panel sv-activity-panel">
              <div className="sv-panel-heading">
                <div>
                  <h2>Document verification activity</h2>
                  <p>Overview of your sample document activity</p>
                </div>
                <select
                  className="sv-select sv-period-select"
                  aria-label="Chart period"
                  defaultValue="7"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                </select>
              </div>

              <div className="sv-chart-legend">
                <span><i className="legend-blue" /> Verified</span>
                <span><i className="legend-light" /> Pending</span>
              </div>

              <div className="sv-chart">
                <div className="sv-chart-y-labels">
                  <span>300</span>
                  <span>225</span>
                  <span>150</span>
                  <span>75</span>
                  <span>0</span>
                </div>
                <div className="sv-chart-plot">
                  <div className="sv-chart-gridlines">
                    <span /><span /><span /><span /><span />
                  </div>
                  <div className="sv-chart-columns">
                    {[
                      { day: "Mon", verified: 48, pending: 18 },
                      { day: "Tue", verified: 65, pending: 24 },
                      { day: "Wed", verified: 54, pending: 21 },
                      { day: "Thu", verified: 82, pending: 29 },
                      { day: "Fri", verified: 69, pending: 24 },
                      { day: "Sat", verified: 92, pending: 18 },
                      { day: "Sun", verified: 76, pending: 13 },
                    ].map((item) => (
                      <div className="sv-chart-column" key={item.day}>
                        <div className="sv-chart-bars">
                          <span
                            className="sv-chart-bar verified-bar"
                            style={{ height: `${item.verified}%` }}
                            title={`${item.verified}% demo activity`}
                          />
                          <span
                            className="sv-chart-bar pending-bar"
                            style={{ height: `${item.pending}%` }}
                            title={`${item.pending}% demo pending activity`}
                          />
                        </div>
                        <span className="sv-chart-day">{item.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="sv-chart-note">
                <span className="sv-note-indicator" />
                Illustrative values for the frontend prototype
              </div>
            </article>

            <article className="sv-panel sv-ai-panel">
              <div className="sv-panel-heading">
                <div>
                  <div className="sv-ai-title-row">
                    <span className="sv-ai-sparkle">✳</span>
                    <h2>AI verification insights</h2>
                  </div>
                  <p>Example institution review queue</p>
                </div>
                <span className="sv-ai-demo-badge">DEMO</span>
              </div>

              <div className="sv-ai-score">
                <div className="sv-ai-score-copy">
                  <span>Illustrative readiness score</span>
                  <strong>86<span>/100</span></strong>
                </div>
                <div className="sv-score-ring">
                  <span>86%</span>
                </div>
              </div>

              <div className="sv-ai-progress">
                <div>
                  <span>Document completeness</span>
                  <strong>92%</strong>
                </div>
                <span className="sv-ai-progress-track">
                  <i style={{ width: "92%" }} />
                </span>
              </div>

              <div className="sv-ai-progress">
                <div>
                  <span>Items needing review</span>
                  <strong>14</strong>
                </div>
                <span className="sv-ai-progress-track orange-track">
                  <i style={{ width: "38%" }} />
                </span>
              </div>

              <div className="sv-ai-callout">
                <span className="sv-ai-callout-icon">i</span>
                <p>
                  These are illustrative indicators only. No AI model has
                  analysed any uploaded documents.
                </p>
              </div>

              <button
                type="button"
                className="sv-ai-link"
                onClick={() => selectNavigation("Document Verification")}
              >
                Open verification queue <Icon name="arrow" size={15} />
              </button>
            </article>
          </section>

          <section className="sv-panel sv-applications-panel">
            <div className="sv-applications-heading">
              <div>
                <h2>Recent applications</h2>
                <p>Review your application and document status.</p>
              </div>

              <div className="sv-table-actions">
                <label className="sv-table-search">
                  <Icon name="search" size={16} />
                  <input
                    type="search"
                    placeholder="Search applications"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    aria-label="Search recent applications"
                  />
                </label>

                <select
                  className="sv-select"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  aria-label="Filter by status"
                >
                  <option>All statuses</option>
                  <option>Verified</option>
                  <option>Pending</option>
                  <option>Under Review</option>
                  <option>Flagged</option>
                </select>
              </div>
            </div>

            <div className="sv-table-wrap">
              <table className="sv-table">
                <thead>
                  <tr>
                    <th>APPLICATION</th>
                    <th>INSTITUTION / DOCUMENT</th>
                    <th>SUBMITTED</th>
                    <th>STATUS</th>
                    <th aria-label="Actions" />
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((application) => (
                    <tr key={application.id}>
                      <td>
                        <span className="sv-application-id">
                          {application.id}
                        </span>
                      </td>
                      <td>
                        <div className="sv-institution-cell">
                          <span className="sv-institution-icon">
                            <Icon name="document" size={17} />
                          </span>
                          <span>
                            <strong>{application.institution}</strong>
                            <small>{application.type}</small>
                          </span>
                        </div>
                      </td>
                      <td className="sv-submitted-date">
                        {application.submitted}
                      </td>
                      <td><StatusBadge status={application.status} /></td>
                      <td>
                        <button
                          type="button"
                          className="sv-row-action"
                          aria-label={`View ${application.id}`}
                          onClick={() =>
                            window.alert(
                              `${application.id}\n\nInstitution: ${application.institution}\nType: ${application.type}\nStatus: ${application.status}\n\nThis is sample dashboard data.`
                            )
                          }
                        >
                          <Icon name="arrow" size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredApplications.length === 0 && (
                <div className="sv-empty-state">
                  <Icon name="search" size={22} />
                  <strong>No matching applications</strong>
                  <p>Try a different search term or status filter.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("All statuses");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            <div className="sv-table-footer">
              <span>
                Showing <strong>{filteredApplications.length}</strong> of{" "}
                <strong>{applications.length}</strong> browser records
              </span>
              <span className="sv-demo-label">
                Sample data · Not live AICTE records
              </span>
            </div>
          </section>

          <footer className="sv-page-footer">
            <span>© 2026 AICTE Smart Verify</span>
            <span>
              Frontend prototype <i /> Demo data only
            </span>
          </footer>
        </div>
  )

      {showUpload && (
        <div
          className="sv-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowUpload(false);
          }}
        >
          <section
            className="sv-upload-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sv-upload-title"
          >
            <div className="sv-modal-heading">
              <div>
                <span className="sv-modal-icon">
                  <Icon name="upload" size={20} />
                </span>
                <h2 id="sv-upload-title">Add a document</h2>
                <p>Add a local document to your institution demo list.</p>
              </div>
              <button
                type="button"
                className="sv-modal-close"
                aria-label="Close"
                onClick={() => setShowUpload(false)}
              >
                ×
              </button>
            </div>

            <label className="sv-file-drop">
              <Icon name="upload" size={25} />
              <strong>
  {selectedFile?.name ?? "Choose a document"}
</strong>

<span>
  {selectedFile
    ? `${((selectedFile?.size ?? 0) / 1024).toFixed(1)} KB`
    : "PDF, PNG or JPG · Local demo only"}
</span>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(event) => {
                  setSelectedFile(event.target.files?.[0] ?? null);
                  setUploadMessage("");
                }}
              />
            </label>

            {uploadMessage && (
              <p
                className={
                  uploadMessage.startsWith("Added")
                    ? "sv-upload-success"
                    : "sv-upload-error"
                }
                role="status"
              >
                {uploadMessage}
              </p>
            )}

            <div className="sv-modal-actions">
              <button
                type="button"
                className="sv-button sv-button-secondary"
                onClick={() => setShowUpload(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="sv-button sv-button-primary"
                onClick={handleUpload}
              >
                Add to demo
              </button>
            </div>
          </section>
        </div>
      )}
}