"use client";

import { useEffect, useState } from "react";

type Application = {
  id: string;
  institution: string;
  type: string;
  submitted: string;
  status: "Verified" | "Pending" | "Under Review" | "Flagged";
};

const demoDocuments: Application[] = [
  {
    id: "DOC-DEMO-001",
    institution: "National Institute of Technology",
    type: "Approval document",
    submitted: "26 Oct 2026",
    status: "Verified",
  },
  {
    id: "DOC-DEMO-002",
    institution: "Institute of Engineering & Technology",
    type: "Course document",
    submitted: "26 Oct 2026",
    status: "Pending",
  },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Application[]>(demoDocuments);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        "aicte-smart-verify-applications"
      );

      if (saved) {
        const parsed = JSON.parse(saved) as Application[];

        if (Array.isArray(parsed)) {
          setDocuments(
            parsed.filter(
              (record) =>
                record.type.toLowerCase().includes("document") ||
                record.type.toLowerCase().includes("uploaded")
            )
          );
        }
      }
    } catch {
      // Keep sample documents.
    }
  }, []);

  function addDemoDocument(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedExtensions = /\.(pdf|png|jpe?g)$/i;

    if (!allowedExtensions.test(file.name)) {
      setMessage("Choose a PDF, PNG or JPG file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage("The file must be smaller than 10 MB.");
      return;
    }

    const newDocument: Application = {
      id: `DOC-DEMO-${Date.now().toString().slice(-6)}`,
      institution: file.name,
      type: "Uploaded document",
      submitted: new Date().toLocaleDateString("en-IN"),
      status: "Pending",
    };

    setDocuments((current) => [newDocument, ...current]);
    setMessage(
      `${file.name} was added to this page's temporary demo list. The file itself was not uploaded to a server.`
    );

    event.target.value = "";
  }

  return (
    <div className="sv-content">
      <header className="sv-page-heading">
        <div>
          <div className="sv-eyebrow">
            <span className="sv-eyebrow-line" />
            DOCUMENT WORKSPACE
          </div>

          <h1>Documents</h1>

          <p>
            View document records and test the local upload interface.
          </p>
        </div>

        <label className="sv-button sv-button-primary">
          Add document
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            hidden
            onChange={addDemoDocument}
          />
        </label>
      </header>

      <div className="sv-view-notice">
        <span>
          Demo only: selected files are not uploaded or stored on a server.
        </span>
      </div>

      {message && (
        <p className="sv-upload-success" role="status">
          {message}
        </p>
      )}

      <section className="sv-panel sv-applications-panel">
        <div className="sv-applications-heading">
          <div>
            <h2>Document records</h2>
            <p>{documents.length} records in this view.</p>
          </div>
        </div>

        <div className="sv-table-wrap">
          <table className="sv-table">
            <thead>
              <tr>
                <th>DOCUMENT ID</th>
                <th>FILE / INSTITUTION</th>
                <th>DATE ADDED</th>
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody>
              {documents.map((document) => (
                <tr key={document.id}>
                  <td>
                    <span className="sv-application-id">
                      {document.id}
                    </span>
                  </td>
                  <td>
                    <div className="sv-institution-cell">
                      <span className="sv-institution-icon">▤</span>
                      <span>
                        <strong>{document.institution}</strong>
                        <small>{document.type}</small>
                      </span>
                    </div>
                  </td>
                  <td className="sv-submitted-date">
                    {document.submitted}
                  </td>
                  <td>{document.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}