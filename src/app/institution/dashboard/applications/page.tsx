"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type ApplicationStatus =
  | "Verified"
  | "Pending"
  | "Under Review"
  | "Flagged";

type Application = {
  id: string;
  institution: string;
  type: string;
  submitted: string;
  status: ApplicationStatus;
};

const applications: Application[] = [
  {
    id: "INST-2026-001",
    institution: "BMS Institute of Technology",
    type: "Extension of Approval",
    submitted: "26 Oct 2026",
    status: "Verified",
  },
  {
    id: "INST-2026-002",
    institution: "BMS Institute of Technology",
    type: "New Course Approval",
    submitted: "26 Oct 2026",
    status: "Pending",
  },
  {
    id: "INST-2026-003",
    institution: "BMS Institute of Technology",
    type: "Intake Variation",
    submitted: "25 Oct 2026",
    status: "Under Review",
  },
  {
    id: "INST-2026-004",
    institution: "BMS Institute of Technology",
    type: "Document Verification",
    submitted: "25 Oct 2026",
    status: "Flagged",
  },
];

const navigation = [
  {
    label: "Overview",
    href: "/institution/dashboard",
    icon: "grid",
  },
  {
    label: "My Applications",
    href: "/institution/dashboard/applications",
    icon: "applications",
  },
  {
    label: "Document Verification",
    href: "/institution/dashboard/verification",
    icon: "verification",
  },
  {
    label: "My Documents",
    href: "/institution/dashboard/documents",
    icon: "documents",
  },
  {
    label: "Verification Reports",
    href: "/institution/dashboard/reports",
    icon: "reports",
  },
];

const accountNavigation = [
  {
    label: "Notifications",
    href: "/institution/dashboard/notifications",
    icon: "notifications",
  },
  {
    label: "Institution Profile",
    href: "/institution/dashboard/profile",
    icon: "settings",
  },
];

function SidebarIcon({ name }: { name: string }) {
  const common = {
    width: 20,
    height: 20,
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

    case "applications":
    case "documents":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 8h6M9 12h6M9 16h4" />
        </svg>
      );

    case "verification":
      return (
        <svg {...common}>
          <path d="M9 4H5a1 1 0 0 0-1 1v4" />
          <path d="M15 4h4a1 1 0 0 1 1 1v4" />
          <path d="M20 15v4a1 1 0 0 1-1 1h-4" />
          <path d="M9 20H5a1 1 0 0 1-1-1v-4" />
          <path d="m8 12 2.5 2.5L16 9" />
        </svg>
      );

    case "reports":
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="m7 14 4-4 4 3 5-7" />
        </svg>
      );

    case "notifications":
      return (
        <svg {...common}>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>
      );

    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19 13.5v-3l-2-.6a6 6 0 0 0-.7-1.3l.9-1.9-2.1-2.1-1.9.9a6 6 0 0 0-1.3-.7l-.6-2h-3l-.6 2a6 6 0 0 0-1.3.7l-1.9-.9-2.1 2.1.9 1.9a6 6 0 0 0-.7 1.3l-2 .6v3l2 .6a6 6 0 0 0 .7 1.3l-.9 1.9 2.1 2.1 1.9-.9a6 6 0 0 0 1.3.7l.6 2h3l.6-2a6 6 0 0 0 1.3-.7l1.9.9 2.1-2.1-.9-1.9a6 6 0 0 0 .7-1.3z" />
        </svg>
      );

    default:
      return null;
  }
}

export default function InstitutionApplicationsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesSearch =
        application.id.toLowerCase().includes(query) ||
        application.institution.toLowerCase().includes(query) ||
        application.type.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All statuses" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  function exportCSV() {
    const header = [
      "Application ID",
      "Institution",
      "Document",
      "Submitted",
      "Status",
    ];

    const rows = filteredApplications.map((application) => [
      application.id,
      application.institution,
      application.type,
      application.submitted,
      application.status,
    ]);

    const csv = [header, ...rows]
      .map((row) =>
        row.map((value) => `"${value.replace(/"/g, '""')}"`).join(",")
      )
      .join("\r\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "institution-applications.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
  <div className="iw-content">
    <section className="iw-heading-row">
      <div>
        <div className="iw-eyebrow">INSTITUTION WORKSPACE</div>

        <h1>
          My <span>Applications.</span>
        </h1>

        <p>
          Search submissions and review their current status.
        </p>
      </div>

      <button
        type="button"
        className="iw-btn"
        onClick={exportCSV}
      >
        Export CSV
      </button>
    </section>

    <section className="iw-card iw-panel">
      <div className="iw-panel-heading">
        <div>
          <h2>All applications</h2>
          <p>{filteredApplications.length} matching records</p>
        </div>

        <div className="iw-table-tools">
          <input
            className="iw-input"
            type="search"
            placeholder="Search ID, institution or type..."
            aria-label="Search applications"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            className="iw-select"
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
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
              <th>APPLICATION</th>
              <th>INSTITUTION / DOCUMENT</th>
              <th>SUBMITTED</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody>
            {filteredApplications.map((application) => (
              <tr key={application.id}>
                <td>
                  <span className="iw-app-id">{application.id}</span>
                </td>

                <td>
                  <div className="iw-doc-cell">
                    <span className="iw-doc-icon">▤</span>

                    <div>
                      <strong>{application.institution}</strong>
                      <small>{application.type}</small>
                    </div>
                  </div>
                </td>

                <td>{application.submitted}</td>

                <td>
                  <span
                    className={`iw-status ${
                      application.status === "Verified"
                        ? "verified"
                        : application.status === "Pending"
                          ? "pending"
                          : application.status === "Flagged"
                            ? "flagged"
                            : "review"
                    }`}
                  >
                    {application.status}
                  </span>
                </td>
              </tr>
            ))}

            {filteredApplications.length === 0 && (
              <tr>
                <td colSpan={4} className="iw-empty">
                  No matching applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="iw-muted">
        Showing {filteredApplications.length} of {applications.length} applications
        <span style={{ float: "right" }}>
          Demo data · Not live AICTE records
        </span>
      </div>
    </section>

    <footer className="iw-footer">
      <span>© 2026 AICTE Smart Verify</span>
      <span>Institution portal · Demo data</span>
    </footer>
  </div>
);
}