export default function NotificationsPage() {
  const notifications = [
    {
      title: "Review queue updated",
      description:
        "Sample applications are available in the verification review queue.",
      time: "Demo notification",
    },
    {
      title: "Document workspace ready",
      description:
        "Open Documents to explore the local upload interface.",
      time: "Demo notification",
    },
    {
      title: "Report export available",
      description:
        "Export the browser's sample application records as a CSV file.",
      time: "Demo notification",
    },
  ];

  return (
    <div className="sv-content">
      <header className="sv-page-heading">
        <div>
          <div className="sv-eyebrow">
            <span className="sv-eyebrow-line" />
            WORKSPACE UPDATES
          </div>

          <h1>Notifications</h1>

          <p>Updates and guidance for the prototype workspace.</p>
        </div>
      </header>

      <section className="sv-panel sv-applications-panel">
        <div className="sv-applications-heading">
          <div>
            <h2>Recent notifications</h2>
            <p>These are sample notifications for the demo.</p>
          </div>
        </div>

        {notifications.map((notification) => (
          <article
            key={notification.title}
            className="sv-notification-entry"
          >
            <span className="sv-notification-entry-icon">i</span>

            <div>
              <strong>{notification.title}</strong>
              <p>{notification.description}</p>
              <small>{notification.time}</small>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}