"use client";

import { useMemo, useState } from "react";

type ReportStatus = "Completed" | "In Progress" | "Needs Attention";

type VerificationReport = {
  id: string;
  title: string;
  category: string;
  generatedDate: string;
  applications: number;
  verified: number;
  pending: number;
  flagged: number;
  status: ReportStatus;
};

const initialReports: VerificationReport[] = [
  {
    id: "VR-2026-001",
    title: "Institution Compliance Report",
    category: "Compliance",
    generatedDate: "26 Oct 2026",
    applications: 120,
    verified: 98,
    pending: 16,
    flagged: 6,
    status: "Completed",
  },
  {
    id: "VR-2026-002",
    title: "Faculty Verification Report",
    category: "Faculty",
    generatedDate: "24 Oct 2026",
    applications: 85,
    verified: 65,
    pending: 15,
    flagged: 5,
    status: "In Progress",
  },
  {
    id: "VR-2026-003",
    title: "Infrastructure Verification",
    category: "Infrastructure",
    generatedDate: "22 Oct 2026",
    applications: 42,
    verified: 30,
    pending: 8,
    flagged: 4,
    status: "Needs Attention",
  },
  {
    id: "VR-2026-004",
    title: "Document Authenticity Report",
    category: "Documents",
    generatedDate: "20 Oct 2026",
    applications: 96,
    verified: 80,
    pending: 12,
    flagged: 4,
    status: "Completed",
  },
];

export default function VerificationReportsPage() {
  const [reports, setReports] = useState(initialReports);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedReport, setSelectedReport] =
    useState<VerificationReport | null>(null);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(search.toLowerCase()) ||
        report.id.toLowerCase().includes(search.toLowerCase()) ||
        report.category.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || report.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reports, search, statusFilter]);

  const totalApplications = reports.reduce(
    (sum, report) => sum + report.applications,
    0
  );

  const totalVerified = reports.reduce(
    (sum, report) => sum + report.verified,
    0
  );

  const totalPending = reports.reduce(
    (sum, report) => sum + report.pending,
    0
  );

  const totalFlagged = reports.reduce(
    (sum, report) => sum + report.flagged,
    0
  );

  function downloadReport(report: VerificationReport) {
    const csvRows = [
      ["Verification Report", report.title],
      ["Report ID", report.id],
      ["Category", report.category],
      ["Generated Date", report.generatedDate],
      ["Total Applications", String(report.applications)],
      ["Verified", String(report.verified)],
      ["Pending", String(report.pending)],
      ["Flagged", String(report.flagged)],
      ["Status", report.status],
    ];

    const csvContent = csvRows
      .map((row) => row.map((value) => `"${value.replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${report.id}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  function generateReport() {
    const newReport: VerificationReport = {
      id: `VR-2026-${String(reports.length + 1).padStart(3, "0")}`,
      title: "General Verification Report",
      category: "General",
      generatedDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      applications: 0,
      verified: 0,
      pending: 0,
      flagged: 0,
      status: "In Progress",
    };

    setReports((current) => [newReport, ...current]);
    setSelectedReport(newReport);
  }

  return (
    <div className="iw-content vr-content">
      <div className="iw-page-heading vr-page-heading">
        <div>
          <span className="iw-eyebrow">REPORTING & ANALYTICS</span>
          <h1>Verification Reports</h1>
          <p>
            Monitor verification progress, review compliance reports, and
            export report summaries.
          </p>
        </div>

        <button className="vr-primary-button" onClick={generateReport}>
          <span>＋</span> Generate Report
        </button>
      </div>

      <div className="vr-demo-notice">
        <span className="vr-notice-icon">i</span>
        <p>
          <strong>Demo data:</strong> The reports shown here are sample records.
          Connect your backend to display actual institution verification data.
        </p>
      </div>

      <div className="vr-stats-grid">
        <div className="vr-stat-card">
          <div className="vr-stat-top">
            <span>Total Applications</span>
            <span className="vr-stat-icon vr-icon-blue">▤</span>
          </div>
          <h2>{totalApplications}</h2>
          <p>Across listed reports</p>
        </div>

        <div className="vr-stat-card">
          <div className="vr-stat-top">
            <span>Verified Documents</span>
            <span className="vr-stat-icon vr-icon-green">✓</span>
          </div>
          <h2>{totalVerified}</h2>
          <p>Marked as verified</p>
        </div>

        <div className="vr-stat-card">
          <div className="vr-stat-top">
            <span>Pending Reviews</span>
            <span className="vr-stat-icon vr-icon-orange">◷</span>
          </div>
          <h2>{totalPending}</h2>
          <p>Awaiting review</p>
        </div>

        <div className="vr-stat-card">
          <div className="vr-stat-top">
            <span>Flagged Items</span>
            <span className="vr-stat-icon vr-icon-red">!</span>
          </div>
          <h2>{totalFlagged}</h2>
          <p>Require attention</p>
        </div>
      </div>

      <section className="iw-panel vr-reports-panel">
        <div className="iw-panel-heading vr-panel-heading">
          <div>
            <h2>All Verification Reports</h2>
            <p>Review, inspect, and export your report records.</p>
          </div>

          <span className="vr-report-count">
            {filteredReports.length} reports
          </span>
        </div>

        <div className="vr-toolbar">
          <div className="vr-search-wrapper">
            <span className="vr-search-icon">⌕</span>
            <input
              type="search"
              className="iw-input vr-search"
              placeholder="Search reports by name, ID, or category..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            className="vr-status-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter reports by status"
          >
            <option value="All">All statuses</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Needs Attention">Needs Attention</option>
          </select>
        </div>

        <div className="iw-table-wrap">
          <table className="iw-table vr-table">
            <thead>
              <tr>
                <th>REPORT DETAILS</th>
                <th>CATEGORY</th>
                <th>GENERATED DATE</th>
                <th>VERIFICATION SUMMARY</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.map((report) => {
                const completion =
                  report.applications > 0
                    ? Math.round(
                        (report.verified / report.applications) * 100
                      )
                    : 0;

                return (
                  <tr key={report.id}>
                    <td>
                      <div className="vr-report-details">
                        <div className="vr-file-icon">▤</div>
                        <div>
                          <strong>{report.title}</strong>
                          <span>{report.id}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="vr-category">
                        {report.category}
                      </span>
                    </td>

                    <td>
                      <span className="vr-date">
                        {report.generatedDate}
                      </span>
                    </td>

                    <td>
                      <div className="vr-summary">
                        <div className="vr-summary-numbers">
                          <strong>{report.verified}</strong>
                          <span> / {report.applications} verified</span>
                        </div>

                        <div className="vr-progress-track">
                          <div
                            className="vr-progress-fill"
                            style={{ width: `${completion}%` }}
                          />
                        </div>

                        <div className="vr-summary-meta">
                          <span>{completion}% complete</span>
                          <span className="vr-flagged-text">
                            {report.flagged} flagged
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`vr-status vr-status-${report.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        <span className="vr-status-dot" />
                        {report.status}
                      </span>
                    </td>

                    <td>
                      <div className="vr-row-actions">
                        <button
                          className="vr-action-button"
                          onClick={() => setSelectedReport(report)}
                          aria-label={`View ${report.title}`}
                          title="View report"
                        >
                          View
                        </button>

                        <button
                          className="vr-download-button"
                          onClick={() => downloadReport(report)}
                          aria-label={`Export ${report.title}`}
                          title="Export CSV"
                        >
                          ↓
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <div className="vr-empty-state">
                      <span>⌕</span>
                      <strong>No reports found</strong>
                      <p>Try changing your search or status filter.</p>
                      <button
                        className="vr-reset-button"
                        onClick={() => {
                          setSearch("");
                          setStatusFilter("All");
                        }}
                      >
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="iw-table-footer vr-table-footer">
          <span>
            Showing {filteredReports.length} of {reports.length} reports
          </span>
          <span>AICTE Smart Verify · Reports Workspace</span>
        </div>
      </section>

      <footer className="iw-footer">
        <span>© 2026 AICTE Smart Verify</span>
        <span>Verification Reports</span>
      </footer>

      {selectedReport && (
        <div
          className="vr-modal-backdrop"
          onClick={() => setSelectedReport(null)}
        >
          <section
            className="vr-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="vr-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="vr-modal-heading">
              <div>
                <span className="iw-eyebrow">REPORT DETAILS</span>
                <h2 id="vr-modal-title">{selectedReport.title}</h2>
                <p>{selectedReport.id}</p>
              </div>

              <button
                className="vr-modal-close"
                onClick={() => setSelectedReport(null)}
                aria-label="Close report details"
              >
                ×
              </button>
            </div>

            <div className="vr-modal-grid">
              <div>
                <span>Category</span>
                <strong>{selectedReport.category}</strong>
              </div>

              <div>
                <span>Generated Date</span>
                <strong>{selectedReport.generatedDate}</strong>
              </div>

              <div>
                <span>Total Applications</span>
                <strong>{selectedReport.applications}</strong>
              </div>

              <div>
                <span>Verified</span>
                <strong className="vr-green-text">
                  {selectedReport.verified}
                </strong>
              </div>

              <div>
                <span>Pending</span>
                <strong className="vr-orange-text">
                  {selectedReport.pending}
                </strong>
              </div>

              <div>
                <span>Flagged</span>
                <strong className="vr-red-text">
                  {selectedReport.flagged}
                </strong>
              </div>
            </div>

            <div className="vr-modal-note">
              <strong>Report status</strong>
              <p>{selectedReport.status}</p>
              <span>
                This is a sample report. Connect your verification database
                to populate actual results.
              </span>
            </div>

            <div className="vr-modal-actions">
              <button
                className="vr-secondary-button"
                onClick={() => setSelectedReport(null)}
              >
                Close
              </button>

              <button
                className="vr-primary-button"
                onClick={() => downloadReport(selectedReport)}
              >
                ↓ Export CSV
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}