"use client";

import { useMemo, useState } from "react";

type NotificationType =
  | "Application"
  | "Verification"
  | "System"
  | "Document";

type NotificationPriority = "High" | "Medium" | "Low";

type NotificationItem = {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  date: string;
  time: string;
  read: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "Verification Requires Attention",
    message:
      "The Infrastructure Report has been flagged for further review. Please check the document details.",
    type: "Verification",
    priority: "High",
    date: "26 Oct 2026",
    time: "10:42 AM",
    read: false,
  },
  {
    id: 2,
    title: "Faculty Details Submitted",
    message:
      "Your faculty details have been received and are waiting for verification.",
    type: "Document",
    priority: "Medium",
    date: "26 Oct 2026",
    time: "09:15 AM",
    read: false,
  },
  {
    id: 3,
    title: "Application Status Updated",
    message:
      "Your institution compliance application is currently under review.",
    type: "Application",
    priority: "Medium",
    date: "25 Oct 2026",
    time: "04:30 PM",
    read: false,
  },
  {
    id: 4,
    title: "Document Verification Completed",
    message:
      "The Extension of Approval document has been marked as verified.",
    type: "Verification",
    priority: "Low",
    date: "25 Oct 2026",
    time: "11:20 AM",
    read: true,
  },
  {
    id: 5,
    title: "System Maintenance Notice",
    message:
      "Scheduled maintenance may temporarily affect access to some dashboard features.",
    type: "System",
    priority: "Low",
    date: "24 Oct 2026",
    time: "02:00 PM",
    read: true,
  },
  {
    id: 6,
    title: "Affiliation Certificate Flagged",
    message:
      "The submitted Affiliation Certificate requires additional review before verification can proceed.",
    type: "Document",
    priority: "High",
    date: "24 Oct 2026",
    time: "10:05 AM",
    read: false,
  },
];

const filters = [
  "All",
  "Unread",
  "Application",
  "Verification",
  "Document",
  "System",
] as const;

type FilterType = (typeof filters)[number];

const typeIcons: Record<NotificationType, string> = {
  Application: "▤",
  Verification: "✓",
  System: "⚙",
  Document: "▧",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<NotificationItem | null>(null);

  const unreadCount = notifications.filter((item) => !item.read).length;

  const highPriorityCount = notifications.filter(
    (item) => item.priority === "High" && !item.read
  ).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const query = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.message.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query);

      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Unread" && !item.read) ||
        item.type === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [notifications, search, activeFilter]);

  function markAsRead(id: number) {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );

    setSelected((current) =>
      current?.id === id ? { ...current, read: true } : current
    );
  }

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((item) => ({ ...item, read: true }))
    );

    setSelected((current) =>
      current ? { ...current, read: true } : null
    );
  }

  function deleteNotification(id: number) {
    setNotifications((current) =>
      current.filter((item) => item.id !== id)
    );

    setSelected((current) =>
      current?.id === id ? null : current
    );
  }

  function openNotification(item: NotificationItem) {
    setSelected(item);

    if (!item.read) {
      markAsRead(item.id);
    }
  }

  return (
    <div className="iw-content nt-content">
      {/* Page heading */}
      <header className="nt-page-heading">
        <div>
          <span className="iw-eyebrow">STAY UPDATED</span>
          <h1>Notifications</h1>
          <p>
            Keep track of application updates, verification activity, and
            important system announcements.
          </p>
        </div>

        <button
          className="nt-mark-all-button"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          <span>✓</span>
          Mark all as read
        </button>
      </header>

      {/* Demo notice */}
      <div className="nt-demo-notice">
        <span className="nt-info-icon">i</span>
        <p>
          <strong>Demo notifications:</strong> These are sample alerts.
          Changes are temporary and will reset when the page reloads.
        </p>
      </div>

      {/* Statistics */}
      <section className="nt-stats-grid">
        <article className="nt-stat-card">
          <div className="nt-stat-top">
            <span>Total Notifications</span>
            <span className="nt-stat-icon nt-stat-blue">▤</span>
          </div>
          <h2>{notifications.length}</h2>
          <p>All available alerts</p>
        </article>

        <article className="nt-stat-card">
          <div className="nt-stat-top">
            <span>Unread</span>
            <span className="nt-stat-icon nt-stat-orange">●</span>
          </div>
          <h2>{unreadCount}</h2>
          <p>Require your attention</p>
        </article>

        <article className="nt-stat-card">
          <div className="nt-stat-top">
            <span>High Priority</span>
            <span className="nt-stat-icon nt-stat-red">!</span>
          </div>
          <h2>{highPriorityCount}</h2>
          <p>Unread high-priority alerts</p>
        </article>
      </section>

      {/* Notifications panel */}
      <section className="nt-panel">
        <div className="nt-panel-heading">
          <div>
            <h2>Notification Centre</h2>
            <p>View and manage your latest notifications.</p>
          </div>

          <span className="nt-unread-counter">
            {unreadCount} unread
          </span>
        </div>

        {/* Search */}
        <div className="nt-toolbar">
          <div className="nt-search-wrap">
            <span className="nt-search-icon" aria-hidden="true">
              ⌕
            </span>

            <input
              type="search"
              className="nt-search"
              placeholder="Search notifications..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search notifications"
            />
          </div>

          {/* Filters */}
          <div className="nt-filters">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`nt-filter-button ${
                  activeFilter === filter ? "nt-filter-active" : ""
                }`}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
              >
                {filter}

                {filter === "Unread" && unreadCount > 0 && (
                  <span className="nt-filter-count">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notification list */}
        <div className="nt-notification-list">
          {filteredNotifications.map((item) => (
            <article
              key={item.id}
              className={`nt-notification-item ${
                !item.read ? "nt-unread-item" : ""
              }`}
            >
              <div
                className={`nt-icon nt-icon-${item.type.toLowerCase()}`}
                aria-hidden="true"
              >
                {typeIcons[item.type]}
              </div>

              <button
                className="nt-notification-body"
                onClick={() => openNotification(item)}
              >
                <div className="nt-notification-title-row">
                  <h3>{item.title}</h3>

                  {!item.read && (
                    <span
                      className="nt-unread-dot"
                      aria-label="Unread"
                    />
                  )}
                </div>

                <p>{item.message}</p>

                <div className="nt-notification-meta">
                  <span className="nt-type-label">{item.type}</span>

                  <span
                    className={`nt-priority nt-priority-${item.priority.toLowerCase()}`}
                  >
                    {item.priority} priority
                  </span>

                  <span className="nt-date">
                    {item.date} · {item.time}
                  </span>
                </div>
              </button>

              <div className="nt-item-actions">
                {!item.read && (
                  <button
                    className="nt-read-button"
                    onClick={() => markAsRead(item.id)}
                    aria-label={`Mark ${item.title} as read`}
                    title="Mark as read"
                  >
                    ✓
                  </button>
                )}

                <button
                  className="nt-delete-button"
                  onClick={() => deleteNotification(item.id)}
                  aria-label={`Delete ${item.title}`}
                  title="Delete notification"
                >
                  ×
                </button>
              </div>
            </article>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="nt-empty-state">
              <span className="nt-empty-icon">⌕</span>
              <h3>No notifications found</h3>
              <p>
                Try a different search term or select another filter.
              </p>

              <button
                className="nt-clear-button"
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        <footer className="nt-list-footer">
          <span>
            Showing {filteredNotifications.length} of{" "}
            {notifications.length} notifications
          </span>
          <span>AICTE Smart Verify · Notification Centre</span>
        </footer>
      </section>

      {/* Notification details modal */}
      {selected && (
        <div
          className="nt-modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <section
            className="nt-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="nt-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="nt-modal-heading">
              <div
                className={`nt-icon nt-icon-${selected.type.toLowerCase()}`}
              >
                {typeIcons[selected.type]}
              </div>

              <button
                className="nt-modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close notification details"
              >
                ×
              </button>
            </div>

            <span className="iw-eyebrow">NOTIFICATION DETAILS</span>

            <h2 id="nt-modal-title">{selected.title}</h2>

            <p className="nt-modal-message">{selected.message}</p>

            <div className="nt-modal-details">
              <div>
                <span>Type</span>
                <strong>{selected.type}</strong>
              </div>

              <div>
                <span>Priority</span>
                <strong>{selected.priority}</strong>
              </div>

              <div>
                <span>Date</span>
                <strong>{selected.date}</strong>
              </div>

              <div>
                <span>Time</span>
                <strong>{selected.time}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{selected.read ? "Read" : "Unread"}</strong>
              </div>
            </div>

            <div className="nt-modal-actions">
              <button
                className="nt-modal-secondary"
                onClick={() => setSelected(null)}
              >
                Close
              </button>

              <button
                className="nt-modal-primary"
                onClick={() => deleteNotification(selected.id)}
              >
                Delete notification
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}