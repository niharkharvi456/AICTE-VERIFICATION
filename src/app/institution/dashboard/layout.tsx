import type { ReactNode } from "react";
import InstitutionSidebar from "./components/InstitutionSidebar";

import "../../dashboard/dashboard.css";
import "./institution.css";

export default function InstitutionDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="iw-shell">
      <InstitutionSidebar />

      <div className="iw-main">
        <header className="iw-topbar">
          <div className="iw-breadcrumb">
            <span>Workspace</span>
            <span>/</span>
            <strong>Institution Portal</strong>
          </div>

          <div className="iw-top-actions">
            <span className="iw-search-hint">
              Institution Workspace
            </span>

            <span className="iw-avatar">IN</span>

            <span className="iw-user-copy">
              <strong>Institution User</strong>
              <small>Institution account</small>
            </span>
          </div>
        </header>

        <main className="iw-content">{children}</main>
      </div>
    </div>
  );
}