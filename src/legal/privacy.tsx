import React from 'react';
import ReactDOM from 'react-dom/client';
import LegalDocumentPage from './LegalDocumentPage';
import { privacySections } from './legalContent';
import './legal.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LegalDocumentPage
      title="Privacy Policy"
      subtitle="How Dashy collects, uses, stores, protects, retains, and discloses information when people use the Dashy workspace service and related support channels."
      summary="This Privacy Policy is based on the facts provided for Dashy, plus the live technical behavior visible in the codebase. Where future features may change data practices, this document explains the current position and states that additional notices may be published if those features are launched later."
      effectiveDate="March 27, 2026"
      reviewDate="March 27, 2026"
      sectionLabel="Data Privacy"
      sections={privacySections}
      highlights={[
        'Dashy currently collects account details, profile information, IP and device-level connection information, workspace content, and uploaded files needed to provide the service and protect the platform.',
        'Dashy does not sell personal information and does not use ad-network style cross-context behavioral advertising based on user data.',
        'The service is managed from Delhi, India, but platform operations may involve technical processing by service providers or infrastructure in other regions when required to run Dashy.',
        'Users can contact Dashy to request access, correction, deletion, or privacy support, and Dashy also states GDPR-style and CCPA-style rights in this policy to the extent they apply.',
      ]}
      contacts={[
        { label: 'Primary privacy email', value: 'anmolshrii54@gmail.com', href: 'mailto:anmolshrii54@gmail.com' },
        { label: 'Alternate privacy email', value: 'pranjalshrivastav5@gmail.com', href: 'mailto:pranjalshrivastav5@gmail.com' },
        { label: 'WhatsApp contact', value: '72093 59699' },
        { label: 'Operations base', value: 'Delhi, India' },
      ]}
      note="Dashy currently supports Google sign-in in the live product. If Dashy later adds email-and-password sign-in, payment features, collaboration features, or other new data flows, Dashy may update this policy and publish additional notices before or when those features are enabled."
    />
  </React.StrictMode>,
);
