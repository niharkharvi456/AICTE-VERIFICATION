"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function SidebarIcon({
  name,
}: {
  name: string;
}) {
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
    case "overview":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );

    case "applications":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 8h6M9 12h6M9 16h4" />
          <path d="M8 3V2h8v1" />
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

    case "documents":
      return (
        <svg {...common}>
          <path d="M6 3h8l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path d="M14 3v5h5M8 12h7M8 16h7" />
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
          <path d="m19.4 15 .1.1 1.1.9-1.5 2.6-1.4-.5a8 8 0 0 1-1.7 1l-.3 1.5h-3l-.3-1.5a8 8 0 0 1-1.7-1l-1.4.5-1.5-2.6 1.1-.9a7 7 0 0 1 0-2l-1.1-.9 1.5-2.6 1.4.5a8 8 0 0 1 1.7-1l.3-1.5h3l.3 1.5a8 8 0 0 1 1.7 1l1.4-.5 1.5 2.6-1.1.9a7 7 0 0 1 0 2Z" />
        </svg>
      );

    default:
      return null;
  }
}

const navigation = [
  { label: "Overview", href: "/dashboard", icon: "overview" },
  { label: "Applications", href: "/dashboard/applications", icon: "applications" },
  { label: "AI Verification", href: "/dashboard/ai-verification", icon: "verification" },
  { label: "Documents", href: "/dashboard/documents", icon: "documents" },
  { label: "Reports & Analytics", href: "/dashboard/reports", icon: "reports" },
];

const preferences = [
  { label: "Notifications", href: "/dashboard/notifications", icon: "notifications" },
  { label: "Settings", href: "/dashboard/settings", icon: "settings" },
];
export default function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <aside className="sv-sidebar">
      <Link href="/dashboard" className="sv-brand">
        <span className="sv-brand-mark sv-brand-logo">
          <img src="/images/aicte-logo.png" alt="AICTE logo" />
        </span>

        <span className="sv-brand-copy">
          <strong>AICTE</strong>
          <small>SMART VERIFY</small>
        </span>

        <span className="sv-brand-chevron">⌄</span>
      </Link>

      <div className="sv-workspace">
        <span className="sv-workspace-avatar">A</span>

        <span>
          <strong>AICTE Workspace</strong>
          <small>Verification portal</small>
        </span>

        <span className="sv-workspace-chevron">⌄</span>
      </div>

      <div className="sv-nav-label">WORKSPACE</div>

      <nav className="sv-nav" aria-label="Workspace navigation">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sv-nav-item ${
              isActive(item.href) ? "active" : ""
            }`}
          >
            <span className="sv-sidebar-icon">
  <SidebarIcon name={item.icon} />
</span>

            <span>{item.label}</span>

            {item.label === "Applications" && (
              <span className="sv-nav-count">5</span>
            )}
          </Link>
        ))}
      </nav>

      <div className="sv-nav-label sv-nav-label-secondary">
        PREFERENCES
      </div>

      <nav className="sv-nav" aria-label="Preferences">
        {preferences.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sv-nav-item ${
              isActive(item.href) ? "active" : ""
            }`}
          >
            <span className="sv-sidebar-icon">
  <SidebarIcon name={item.icon} />
</span>

            <span>{item.label}</span>

            {item.label === "Notifications" && (
              <span className="sv-notification-dot" />
            )}
          </Link>
        ))}
      </nav>

      <div className="sv-sidebar-spacer" />

      <div className="sv-help-card">
        <div className="sv-help-icon">?</div>

        <strong>Need assistance?</strong>

        <p>
          Find guidance for document verification and submissions.
        </p>

        <button
          type="button"
          onClick={() =>
            window.alert(
              "Help centre demo. Guidance content can be added here."
            )
          }
        >
          Visit help centre →
        </button>
      </div>

      <div className="sv-sidebar-footer">
        <span className="sv-online-dot" />
        <span>Frontend prototype</span>
      </div>
    </aside>
  );
}