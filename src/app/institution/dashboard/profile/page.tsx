"use client";

import { useState } from "react";

type InstitutionProfile = {
  institutionName: string;
  institutionCode: string;
  institutionType: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  principalName: string;
  principalEmail: string;
  establishedYear: string;
  affiliation: string;
};

const initialProfile: InstitutionProfile = {
  institutionName: "BMS Institute of Technology and Management",
  institutionCode: "AICTE-INST-001",
  institutionType: "Engineering College",
  email: "office@institution.edu",
  phone: "",
  website: "",
  address: "",
  city: "Bengaluru",
  state: "Karnataka",
  pincode: "",
  principalName: "",
  principalEmail: "",
  establishedYear: "",
  affiliation: "",
};

export default function InstitutionProfilePage() {
  const [profile, setProfile] =
    useState<InstitutionProfile>(initialProfile);

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  }

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Demo only: changes are kept in React state.
    // Connect this handler to your database to persist the profile.

    setEditing(false);
    setSaved(true);
  }

  function handleCancel() {
    setProfile(initialProfile);
    setEditing(false);
    setSaved(false);
  }

  return (
    <div className="iw-content ip-content">
      {/* Page heading */}
      <header className="iw-page-heading ip-page-heading">
        <div>
          <span className="iw-eyebrow">ACCOUNT SETTINGS</span>
          <h1>Institution Profile</h1>
          <p>
            Manage your institution details, contact information, and
            administrative information.
          </p>
        </div>

        {!editing && (
          <button
            type="button"
            className="ip-primary-button"
            onClick={() => {
              setEditing(true);
              setSaved(false);
            }}
          >
            <span>✎</span>
            Edit Profile
          </button>
        )}
      </header>

      {/* Demo notice */}
      <div className="ip-notice">
        <span className="ip-notice-icon">i</span>
        <p>
          <strong>Profile information:</strong> Review your institution
          details and keep them accurate. Changes in this demo are not
          saved to a database.
        </p>
      </div>

      {/* Institution identity card */}
      <section className="ip-identity-card">
        <div className="ip-identity-main">
          <div className="ip-institution-logo">
            <span>AI</span>
            <small>CTE</small>
          </div>

          <div className="ip-identity-text">
            <span className="ip-verified-label">
              <span className="ip-verified-dot" />
              INSTITUTION WORKSPACE
            </span>

            <h2>{profile.institutionName || "Institution Name"}</h2>

            <p>
              {profile.institutionType || "Institution Type"}
              <span className="ip-divider">·</span>
              {profile.city || "City"}
              {profile.state ? `, ${profile.state}` : ""}
            </p>
          </div>
        </div>

        <div className="ip-institution-code">
          <span>INSTITUTION CODE</span>
          <strong>{profile.institutionCode}</strong>
          <small>Institution identifier</small>
        </div>
      </section>

      {saved && (
        <div className="ip-success-message" role="status">
          <span>✓</span>
          Profile changes have been applied in this demo.
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* Institution information */}
        <section className="ip-section">
          <div className="ip-section-heading">
            <div className="ip-section-icon ip-blue-icon">▤</div>
            <div>
              <h2>Institution Information</h2>
              <p>Basic details used to identify your institution.</p>
            </div>
          </div>

          <div className="ip-form-grid">
            <div className="ip-field ip-field-full">
              <label htmlFor="institutionName">
                Institution Name <span>*</span>
              </label>

              <input
                id="institutionName"
                name="institutionName"
                value={profile.institutionName}
                onChange={handleChange}
                disabled={!editing}
                required
                placeholder="Enter institution name"
              />
            </div>

            <div className="ip-field">
              <label htmlFor="institutionCode">Institution Code</label>

              <input
                id="institutionCode"
                name="institutionCode"
                value={profile.institutionCode}
                disabled
                readOnly
              />

              <small>Managed by the system administrator.</small>
            </div>

            <div className="ip-field">
              <label htmlFor="institutionType">
                Institution Type <span>*</span>
              </label>

              <select
                id="institutionType"
                name="institutionType"
                value={profile.institutionType}
                onChange={handleChange}
                disabled={!editing}
                required
              >
                <option value="Engineering College">
                  Engineering College
                </option>
                <option value="University">University</option>
                <option value="Polytechnic">Polytechnic</option>
                <option value="Management Institute">
                  Management Institute
                </option>
                <option value="Technical Institute">
                  Technical Institute
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="ip-field">
              <label htmlFor="establishedYear">Established Year</label>

              <input
                id="establishedYear"
                name="establishedYear"
                type="number"
                min="1800"
                max={new Date().getFullYear()}
                value={profile.establishedYear}
                onChange={handleChange}
                disabled={!editing}
                placeholder="e.g. 2000"
              />
            </div>

            <div className="ip-field">
              <label htmlFor="affiliation">University / Affiliation</label>

              <input
                id="affiliation"
                name="affiliation"
                value={profile.affiliation}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter university or affiliation"
              />
            </div>
          </div>
        </section>

        {/* Contact information */}
        <section className="ip-section">
          <div className="ip-section-heading">
            <div className="ip-section-icon ip-green-icon">✉</div>
            <div>
              <h2>Contact Information</h2>
              <p>Official contact details for your institution.</p>
            </div>
          </div>

          <div className="ip-form-grid">
            <div className="ip-field">
              <label htmlFor="email">
                Official Email <span>*</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!editing}
                required
                placeholder="official@institution.edu"
              />
            </div>

            <div className="ip-field">
              <label htmlFor="phone">Contact Number</label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={profile.phone}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter contact number"
              />
            </div>

            <div className="ip-field ip-field-full">
              <label htmlFor="website">Official Website</label>

              <input
                id="website"
                name="website"
                type="url"
                value={profile.website}
                onChange={handleChange}
                disabled={!editing}
                placeholder="https://www.institution.edu"
              />
            </div>
          </div>
        </section>

        {/* Address information */}
        <section className="ip-section">
          <div className="ip-section-heading">
            <div className="ip-section-icon ip-purple-icon">⌖</div>
            <div>
              <h2>Address Information</h2>
              <p>Registered location of your institution.</p>
            </div>
          </div>

          <div className="ip-form-grid">
            <div className="ip-field ip-field-full">
              <label htmlFor="address">Street Address</label>

              <textarea
                id="address"
                name="address"
                value={profile.address}
                onChange={handleChange}
                disabled={!editing}
                rows={3}
                placeholder="Enter complete institution address"
              />
            </div>

            <div className="ip-field">
              <label htmlFor="city">City</label>

              <input
                id="city"
                name="city"
                value={profile.city}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter city"
              />
            </div>

            <div className="ip-field">
              <label htmlFor="state">State</label>

              <select
                id="state"
                name="state"
                value={profile.state}
                onChange={handleChange}
                disabled={!editing}
              >
                <option value="">Select state</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Kerala">Kerala</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Telangana">Telangana</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="ip-field">
              <label htmlFor="pincode">PIN Code</label>

              <input
                id="pincode"
                name="pincode"
                inputMode="numeric"
                maxLength={6}
                pattern="[0-9]{6}"
                value={profile.pincode}
                onChange={handleChange}
                disabled={!editing}
                placeholder="6-digit PIN code"
              />
            </div>
          </div>
        </section>

        {/* Principal information */}
        <section className="ip-section">
          <div className="ip-section-heading">
            <div className="ip-section-icon ip-orange-icon">♙</div>
            <div>
              <h2>Head of Institution</h2>
              <p>Principal or authorised institutional representative.</p>
            </div>
          </div>

          <div className="ip-form-grid">
            <div className="ip-field">
              <label htmlFor="principalName">Principal / Director Name</label>

              <input
                id="principalName"
                name="principalName"
                value={profile.principalName}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter full name"
              />
            </div>

            <div className="ip-field">
              <label htmlFor="principalEmail">Official Email</label>

              <input
                id="principalEmail"
                name="principalEmail"
                type="email"
                value={profile.principalEmail}
                onChange={handleChange}
                disabled={!editing}
                placeholder="principal@institution.edu"
              />
            </div>
          </div>
        </section>

        {/* Form actions */}
        {editing && (
          <div className="ip-form-actions">
            <button
              type="button"
              className="ip-cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button type="submit" className="ip-primary-button">
              ✓ Save Changes
            </button>
          </div>
        )}
      </form>

      {/* Security information */}
      <section className="ip-security-card">
        <div className="ip-security-icon">♙</div>

        <div>
          <h3>Institution Account Security</h3>
          <p>
            Keep your official contact information accurate. Account access
            and permissions should be managed through your authorised
            administrator.
          </p>
        </div>

        <span className="ip-security-badge">Institution Account</span>
      </section>

      <footer className="iw-footer">
        <span>© 2026 AICTE Smart Verify</span>
        <span>Institution Profile</span>
      </footer>
    </div>
  );
}