import type { ReactNode } from 'react';

export interface LegalSection {
  id: string;
  title: string;
  body: string;
}

interface LegalContact {
  label: string;
  value: string;
  href?: string;
}

interface LegalDocumentPageProps {
  title: string;
  subtitle: string;
  summary: string;
  effectiveDate: string;
  reviewDate: string;
  sectionLabel: string;
  sections: LegalSection[];
  contacts: LegalContact[];
  highlights: string[];
  note?: ReactNode;
}

function SectionCopy({ body }: { body: string }) {
  return body.split('\n\n').map(paragraph => (
    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
  ));
}

export default function LegalDocumentPage({
  title,
  subtitle,
  summary,
  effectiveDate,
  reviewDate,
  sectionLabel,
  sections,
  contacts,
  highlights,
  note,
}: LegalDocumentPageProps) {
  const homeUrl = `${import.meta.env.BASE_URL}`;

  return (
    <main className="legal-page-shell">
      <div className="legal-page-background legal-page-background-one" />
      <div className="legal-page-background legal-page-background-two" />

      <header className="legal-page-header">
        <a className="legal-home-link" href={homeUrl}>
          Back to Dashy
        </a>
        <a className="legal-open-app-link" href={homeUrl}>
          Open App
        </a>
      </header>

      <section className="legal-hero">
        <div className="legal-hero-copy">
          <p className="legal-eyebrow">{sectionLabel}</p>
          <h1>{title}</h1>
          <p className="legal-subtitle">{subtitle}</p>
          <p className="legal-summary">{summary}</p>
        </div>

        <aside className="legal-meta-card">
          <div>
            <span className="legal-meta-label">Effective date</span>
            <strong>{effectiveDate}</strong>
          </div>
          <div>
            <span className="legal-meta-label">Last reviewed</span>
            <strong>{reviewDate}</strong>
          </div>
          <div>
            <span className="legal-meta-label">Document length</span>
            <strong>{sections.length} numbered sections</strong>
          </div>
        </aside>
      </section>

      <section className="legal-highlight-grid" aria-label="Document highlights">
        {highlights.map(highlight => (
          <article key={highlight} className="legal-highlight-card">
            <p>{highlight}</p>
          </article>
        ))}
      </section>

      <section className="legal-contact-card">
        <div className="legal-card-heading">
          <h2>Operator & Contact</h2>
          <p>Dashy is operated by Anmol Srivastava and Pranjal Shrivastav, with service direction managed from Delhi, India.</p>
        </div>

        <div className="legal-contact-grid">
          {contacts.map(contact => (
            <div key={contact.label} className="legal-contact-item">
              <span className="legal-meta-label">{contact.label}</span>
              {contact.href ? (
                <a href={contact.href}>{contact.value}</a>
              ) : (
                <strong>{contact.value}</strong>
              )}
            </div>
          ))}
        </div>

        {note ? <div className="legal-note">{note}</div> : null}
      </section>

      <section className="legal-content" aria-label={title}>
        {sections.map((section, index) => (
          <article key={section.id} className="legal-section-card" id={section.id}>
            <div className="legal-section-number">{index + 1}</div>
            <div className="legal-section-copy">
              <h2>{section.title}</h2>
              <SectionCopy body={section.body} />
            </div>
          </article>
        ))}
      </section>

      <footer className="legal-page-footer">
        <p>{title} applies to the Dashy service as published on March 27, 2026. Future product changes may require updated language, and updated versions will be posted on this website.</p>
      </footer>
    </main>
  );
}
