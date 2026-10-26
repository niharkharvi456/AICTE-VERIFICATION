"use client";

import { useEffect, useMemo, useState } from "react";

type Application = {
  id: string;
  institution: string;
  type: string;
  submitted: string;
  status: "Verified" | "Pending" | "Under Review" | "Flagged";
};

const demoApplications: Application[] = [
  {
    id: "AICTE-2026-1042",
    institution: "National Institute of Technology",
    type: "Extension of Approval",
    submitted: "26 Oct 2026",
    status: "Verified",
  },
  {
    id: "AICTE-2026-1041",
    institution: "Institute of Engineering & Technology",
    type: "New Course Approval",
    submitted: "26 Oct 2026",
    status: "Pending",
  },
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
  {
    id: "AICTE-2026-1038",
    institution: "School of Applied Engineering",
    type: "Extension of Approval",
    submitted: "24 Oct 2026",
    status: "Verified",
  },
];

function StatusBadge({ status }: { status: Application["status"] }) {
  const classNames: Record<Application["status"], string> = {
    Verified: "status-verified",
    Pending: "status-pending",
    "Under Review": "status-review",
    Flagged: "status-flagged",
  };

  return (
    <span className={`status-badge ${classNames[status]}`}>
      <span className="status-dot" />
      {status}
    </span>
  );
}

export default function ApplicationsPage() {
  const [applications, setApplications] =
    useState<Application[]>(demoApplications);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");

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

  const filteredApplications = useMemo(() => {
    const query = search.toLowerCase().trim();

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
  }, [applications, search, statusFilter]);

  return (
    <div className="sv-content">
      <header className="sv-page-heading">
        <div>
          <div className="sv-eyebrow">
            <span className="sv-eyebrow-line" />
            WORKSPACE
          </div>

          <h1>Applications</h1>

          <p>
            Search submissions and review their current status.
          </p>
        </div>
      </header>

      <section className="sv-panel sv-applications-panel">
        <div className="sv-applications-heading">
          <div>
            <h2>All applications</h2>
            <p>{filteredApplications.length} matching records</p>
          </div>

          <div className="sv-table-actions">
            <input
              className="sv-input"
              type="search"
              placeholder="Search ID, institution or type..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              className="sv-select"
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

        <div className="sv-table-wrap">
          <table className="sv-table">
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
                    <span className="sv-application-id">
                      {application.id}
                    </span>
                  </td>

                  <td>
                    <div className="sv-institution-cell">
                      <span className="sv-institution-icon">▤</span>

                      <span>
                        <strong>{application.institution}</strong>
                        <small>{application.type}</small>
                      </span>
                    </div>
                  </td>

                  <td className="sv-submitted-date">
                    {application.submitted}
                  </td>

                  <td>
                    <StatusBadge status={application.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredApplications.length === 0 && (
            <div className="sv-empty-state">
              <strong>No matching applications</strong>
              <p>Try another search term or status.</p>

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
            Showing {filteredApplications.length} of {applications.length}
          </span>

          <span className="sv-demo-label">
            Demo data · Not live AICTE records
          </span>
        </div>
      </section>
    </div>
  );
}