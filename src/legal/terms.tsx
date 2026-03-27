import React from 'react';
import ReactDOM from 'react-dom/client';
import LegalDocumentPage from './LegalDocumentPage';
import { termsSections } from './legalContent';
import './legal.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LegalDocumentPage
      title="Terms of Service"
      subtitle="Rules, responsibilities, and platform conditions for using Dashy as a digital workspace for tasks, goals, notes, files, and future service features."
      summary="These Terms are written to reflect the current Dashy product, the current operator details you provided, the service's present free-to-use status, the platform's moderation rules, and the possibility of future paid plans or new features that may be introduced later."
      effectiveDate="March 27, 2026"
      reviewDate="March 27, 2026"
      sectionLabel="Legal Terms"
      sections={termsSections}
      highlights={[
        'Dashy is currently free to use, but future paid plans may be introduced with separate pricing and billing disclosures before any charge applies.',
        'Users keep ownership of their content, while Dashy receives only the limited rights needed to host, process, secure, back up, and display that content to operate the service.',
        'Nudity, sexual content, child exploitation, scams, phishing, malware, harassment, hate conduct, and unlawful misuse are strictly prohibited and may lead to suspension or permanent bans.',
        'Dashy is operated from Delhi, India, but some technical processing may still involve infrastructure or service providers used to run the platform securely and reliably.',
      ]}
      contacts={[
        { label: 'Primary legal email', value: 'anmolshrii54@gmail.com', href: 'mailto:anmolshrii54@gmail.com' },
        { label: 'Alternate legal email', value: 'pranjalshrivastav5@gmail.com', href: 'mailto:pranjalshrivastav5@gmail.com' },
        { label: 'WhatsApp contact', value: '72093 59699' },
        { label: 'Jurisdiction', value: 'Delhi, India' },
      ]}
      note="Dashy does not currently offer native in-app collaboration as a live production feature. If shared workspaces, collaboration tools, or paid plans launch later, Dashy may publish supplemental terms or updated versions of this document before those features go live."
    />
  </React.StrictMode>,
);
