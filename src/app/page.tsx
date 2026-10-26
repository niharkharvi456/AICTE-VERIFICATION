"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FileCheck2,
  ClipboardCheck,
  ScanSearch,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

export default function Home() {



  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });

  setMenuOpen(false);
};

  return (
    <main>
      <section className="hero" id="home">
        <div className="hero-background">
          <Image
            src="/images/aicte-building.png"
            alt="AICTE building"
            fill
            priority
            sizes="100vw"
            className="background-image"
          />
        </div>

        <div className="hero-overlay" />
<header className="navbar">
  <a href="#home" className="brand">
    <span className="brand-logo">
      <Image
        src="/images/aicte-logo.png"
        alt="AICTE logo"
        fill
        sizes="40px"
      />
    </span>

    <span className="brand-text">
      <strong>AICTE</strong>
      <small>SMART VERIFY</small>
    </span>
  </a>

  <button
    className="mobile-menu"
    onClick={() => setMenuOpen(!menuOpen)}
    aria-label="Toggle navigation"
    aria-expanded={menuOpen}
  >
    {menuOpen ? <X size={20} /> : <Menu size={20} />}
  </button>

  <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
  <button
    type="button"
    onClick={() => scrollTo("home")}
    className="nav-link"
  >
    Home
  </button>

  <button
    type="button"
    onClick={() => scrollTo("solutions")}
    className="nav-link"
  >
    Solutions
  </button>

  <button
    type="button"
    onClick={() => scrollTo("workflow")}
    className="nav-link"
  >
    How It Works
  </button>

  <button
    type="button"
    onClick={() => scrollTo("about")}
    className="nav-link"
  >
    About
  </button>
</nav>

  <a href="/login" className="nav-button">
    Sign in <ArrowUpRight size={14} />
  </a>
</header>

        <div className="hero-container">
          <div className="hero-content">
            

            <h1>
  Every document.
  <br />
  <span>Verified with confidence.</span>
</h1>

            <p className="hero-description">
  Accelerate application reviews with AI-assisted document
  validation, intelligent discrepancy detection, and transparent
  compliance workflows.
</p>

            <div className="hero-actions">
              <a href="/login" className="button button-primary">
  Start verification <ArrowRight size={16} />
</a>

              
            </div>

            <div className="hero-trust">
              <div className="trust-item">
                <ShieldCheck size={20} />
                <div>
                  <strong>Secure review</strong>
                  <span>Protected workflows</span>
                </div>
              </div>

              <div className="trust-divider" />

              <div className="trust-item">
                <Sparkles size={20} />
                <div>
                  <strong>AI-assisted</strong>
                  <span>Smarter verification</span>
                </div>
              </div>
            </div>
          </div>

          <aside className="review-card">
            <div className="review-card-header">
              <div className="review-icon">
                <FileCheck2 size={22} />
              </div>

              <span className="status-pill">
                <span />
                Workflow overview
              </span>
            </div>

            <p className="card-label">APPLICATION REVIEW</p>

            <h2>
              Every document.
              <br />
              One clear workflow.
            </h2>

            <div className="review-list">
              <div className="review-row">
                <CheckCircle2 size={16} />
                <span>Document checklist</span>
                <strong>Ready</strong>
              </div>

              <div className="review-row">
                <CheckCircle2 size={16} />
                <span>Required fields</span>
                <strong>Checked</strong>
              </div>

              <div className="review-row pending">
                <span className="pending-dot" />
                <span>Official review</span>
                <strong>Pending</strong>
              </div>
            </div>

            <div className="card-footer">
              <span>AI-assisted · Human-led</span>
              <ShieldCheck size={17} />
            </div>
          </aside>
        </div>

        <button
          className="scroll-indicator"
          onClick={() => scrollTo("solutions")}
        >
          <span className="scroll-line" />
          SCROLL TO EXPLORE
        </button>

        
      </section>


{/* PLATFORM CAPABILITIES SECTION */}
<section className="capabilities-section" id="solutions">
  <div className="capabilities-inner">
    <div className="capabilities-heading">
      <div>
        <span className="eyebrow">
          <span className="eyebrow-line" />
          SOLUTIONS
        </span>

        <h2 className="reveal-heading">
          Everything in one place.
          <br />
          <span>Built for smarter reviews.</span>
        </h2>
      </div>

      <p className="reveal-text">
        From document submission to compliance review,
        every step stays organised, transparent, and easy to track.
      </p>
    </div>

    <div className="capability-grid">
      <article className="capability-card">
        <div className="capability-card-top">
          <div className="capability-icon">
            <FileCheck2 size={23} />
          </div>
          <span className="capability-number">01</span>
        </div>

        <div className="capability-card-content">
          <h3>AI Document Verification</h3>
          <p>
            Extract document information, identify missing fields,
            and flag inconsistencies for further review.
          </p>
        </div>

        <div className="capability-card-footer">
          <span>Document intelligence</span>
          <ArrowUpRight size={18} />
        </div>
      </article>

      <article className="capability-card">
        <div className="capability-card-top">
          <div className="capability-icon">
            <ClipboardCheck size={23} />
          </div>
          <span className="capability-number">02</span>
        </div>

        <div className="capability-card-content">
          <h3>Application Validation</h3>
          <p>
            Check submitted application details against required
            fields, supporting documents, and validation rules.
          </p>
        </div>

        <div className="capability-card-footer">
          <span>Application review</span>
          <ArrowUpRight size={18} />
        </div>
      </article>

      <article className="capability-card">
        <div className="capability-card-top">
          <div className="capability-icon">
            <ShieldCheck size={23} />
          </div>
          <span className="capability-number">03</span>
        </div>

        <div className="capability-card-content">
          <h3>Compliance Monitoring</h3>
          <p>
            Track outstanding requirements, highlight applications
            needing attention, and maintain review records.
          </p>
        </div>

        <div className="capability-card-footer">
          <span>Compliance oversight</span>
          <ArrowUpRight size={18} />
        </div>
      </article>
    </div>
  </div>
</section>

{/* HOW IT WORKS SECTION */}
<section className="workflow-section" id="workflow">
  <div className="workflow-inner">
    <div className="workflow-intro">
      <span className="eyebrow">
        <span className="eyebrow-line" />
        HOW IT WORKS
      </span>

      <h2>
        From submission
        <br />
        to <span>confident review.</span>
      </h2>

      <p>
        A clear, structured process helps authorised reviewers
        assess documents, investigate discrepancies, and record
        decisions with confidence.
      </p>

      <a href="/login" className="workflow-cta">
        Enter the platform
        <ArrowRight size={18} />
      </a>

      <div className="workflow-note">
        <ShieldCheck size={17} />
        <span>AI-assisted. Human-led.</span>
      </div>
    </div>

    <div className="workflow-steps">
      <article className="workflow-step">
        <div className="workflow-step-number">01</div>

        <div className="workflow-step-content">
          <h3>Receive the application</h3>
          <p>
            Collect application details and supporting documents
            in one organised workspace.
          </p>
        </div>

        <div className="workflow-step-icon">
          <FileCheck2 size={20} />
        </div>
      </article>

      <article className="workflow-step">
        <div className="workflow-step-number">02</div>

        <div className="workflow-step-content">
          <h3>Analyse document findings</h3>
          <p>
            Identify missing information and potential discrepancies
            for authorised reviewers to investigate.
          </p>
        </div>

        <div className="workflow-step-icon">
          <ScanSearch size={20} />
        </div>
      </article>

      <article className="workflow-step">
        <div className="workflow-step-number">03</div>

        <div className="workflow-step-content">
          <h3>Review and record decisions</h3>
          <p>
            Examine the available evidence, record review outcomes,
            and maintain a clear history of actions.
          </p>
        </div>

        <div className="workflow-step-icon">
          <ClipboardCheck size={20} />
        </div>
      </article>
    </div>
  </div>
</section>

{/* About Section */}
<section id="about" className="about-section">
  <div className="about-container">
    <div className="about-label">
      <span className="about-label-line" />
      ABOUT
    </div>

    <div className="about-grid">
      <div className="about-heading">
        <h2>
          Making document verification{" "}
          <span>simpler, smarter, and more reliable.</span>
        </h2>
      </div>

      <div className="about-content">
        <p>
          AICTE Smart Verify is a proposed AI-powered platform designed
          to streamline application validation, document authentication,
          and regulatory compliance for technical education institutions.
        </p>

        <p>
          By helping reviewers identify missing information and potential
          discrepancies, the platform supports a more organised and
          transparent review process while keeping final decisions in
          the hands of authorised officials.
        </p>

        <div className="about-features">
          <div className="about-feature">
            <span className="about-feature-dot" />
            AI-assisted document verification
          </div>

          <div className="about-feature">
            <span className="about-feature-dot" />
            Consistent application validation
          </div>

          <div className="about-feature">
            <span className="about-feature-dot" />
            Human-led regulatory decisions
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

     

      <footer className="footer">
        <div className="section-container footer-container">
          <a href="#home" className="brand">
            <span className="brand-logo">
  <Image
    src="/images/aicte-logo.png"
    alt="AICTE logo"
    fill
    sizes="40px"
  />
</span>

            <span className="brand-text">
              <strong>AICTE</strong>
              <small>SMART VERIFY</small>
            </span>
          </a>

          <p>AI-assisted document verification and application review.</p>

          <span className="footer-note">
            SIH26261 · Prototype
          </span>
        </div>
      </footer>
    </main>
  );
}