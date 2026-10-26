"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Overview", href: "/institution/dashboard", icon: "grid" },
  {
    label: "My Applications",
    href: "/institution/dashboard/applications",
    icon: "file",
  },
  {
    label: "Document Verification",
    href: "/institution/dashboard/verification",
    icon: "check",
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

const accountNavigation = [
  {
    label: "Notifications",
    href: "/institution/dashboard/notifications",
    icon: "bell",
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
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );

    case "file":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 8h6M9 12h6M9 16h4" />
        </svg>
      );

    case "check":
      return (
        <svg {...common}>
          <path d="M9 4H5a2 2 0 0 0-2 2v4" />
          <path d="M15 4h4a2 2 0 0 1 2 2v4" />
          <path d="M3 15v3a2 2 0 0 0 2 2h4" />
          <path d="M15 20h4a2 2 0 0 0 2-2v-3" />
          <path d="m8 12 3 3 6-7" />
        </svg>
      );

    case "document":
      return (
        <svg {...common}>
          <path d="M6 3h8l5 5v13H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path d="M14 3v5h5M8 13h8M8 17h6" />
        </svg>
      );

    case "chart":
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="m7 14 4-5 4 3 6-7" />
        </svg>
      );

    case "bell":
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
          <path d="m19.4 15 .1.1 1.1.9-1.5 2.6-1.4-.5a8 8 0 0 1-1.7 1l-.2 1.5h-3l-.2-1.5a8 8 0 0 1-1.7-1l-1.4.5-1.5-2.6 1.1-.9a7 7 0 0 1 0-2l-1.1-.9 1.5-2.6 1.4.5a8 8 0 0 1 1.7-1l.2-1.5h3l.2 1.5a8 8 0 0 1 1.7 1l1.4-.5 1.5 2.6-1.1.9a7 7 0 0 1 0 2Z" />
        </svg>
      );

    default:
      return null;
  }
}

export default function InstitutionSidebar() {
  const pathname = usePathname();

  function renderLink(item: (typeof navigation)[number]) {
    const active =
      item.href === "/institution/dashboard"
        ? pathname === item.href
        : pathname === item.href ||
          pathname.startsWith(`${item.href}/`);

    return (
      <Link
        key={item.href}
        href={item.href}
        className={`iw-nav-link ${active ? "active" : ""}`}
      >
        <span className="iw-nav-icon">
          <SidebarIcon name={item.icon} />
        </span>

        <span className="iw-nav-text">{item.label}</span>

        {item.label === "My Applications" && (
          <span className="iw-count">4</span>
        )}

        {item.label === "Notifications" && (
          <span className="iw-notice-dot" />
        )}
      </Link>
    );
  }

  return (
    <aside className="iw-sidebar">
      <Link href="/institution/dashboard" className="iw-brand">
        <span className="iw-logo">
          <img src="/images/aicte-logo.png" alt="AICTE logo" />
        </span>

        <span className="iw-brand-text">
          <strong>AICTE</strong>
          <small>SMART VERIFY</small>
        </span>

        <span className="iw-chevron">⌄</span>
      </Link>

      <div className="iw-workspace-card">
        <span className="iw-workspace-avatar">I</span>

        <span>
          <strong>Institution Workspace</strong>
          <small>Institution portal</small>
        </span>

        <span className="iw-chevron">⌄</span>
      </div>

      <div className="iw-nav-label">INSTITUTION PORTAL</div>

      <nav className="iw-nav" aria-label="Institution navigation">
        {navigation.map(renderLink)}
      </nav>

      <div className="iw-nav-label iw-account-label">ACCOUNT</div>

      <nav className="iw-nav" aria-label="Account navigation">
        {accountNavigation.map((item) => {
          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`iw-nav-link ${active ? "active" : ""}`}
            >
              <span className="iw-nav-icon">
                <SidebarIcon name={item.icon} />
              </span>

              <span className="iw-nav-text">{item.label}</span>

              {item.label === "Notifications" && (
                <span className="iw-notice-dot" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="iw-sidebar-spacer" />

      <div className="iw-help-card">
        <div className="iw-help-mark">?</div>

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

      <div className="iw-sidebar-footer">
        <span className="iw-online-dot" />
        <span>Institution portal · Demo</span>
      </div>
    </aside>
  );
}