import Modal from '../ui/Modal';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsOfService({ isOpen, onClose }: LegalModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Terms of Service" size="lg">
      <div className="legal-modal-large">
        <h1 className="legal-title">Terms of Service</h1>
        <p className="legal-subtitle">Effective as of March 27, 2026</p>
        
        <div className="legal-section">
          <h2>1. Agreement to Terms</h2>
          <p>By accessing or using Dashy ("Service"), a productivity platform founded by <strong>Anmol Srivastava</strong> (Founder) and <strong>Pranjal Shrivastav</strong> (Co-Founder), you agree to be bound by these Terms of Service. These Terms constitute a legally binding agreement between you and Dashy Workspace. If you do not agree to these Terms, you must not access or use the Service.</p>
        </div>

        <div className="legal-section">
          <h2>2. Eligibility</h2>
          <p>You must be at least 13 years old to use Dashy. By using the Service, you represent and warrant that you fulfill this requirement. Use of the Service may be restricted or prohibited in certain jurisdictions.</p>
        </div>

        <div className="legal-section">
          <h2>3. Description of Service</h2>
          <p>Dashy provides high-performance workspace tools including real-time document editing, multi-level project management, data synchronization through Appwrite Cloud, and collaborative features. We reserve the right to modify, suspend, or discontinue any feature, tool, or component at our sole discretion without prior notice.</p>
        </div>

        <div className="legal-section">
          <h2>4. Account Creation & Security</h2>
          <p>Access to the Service is primarily managed via Google OAuth. You are solely responsible for:</p>
          <ul>
            <li>Maintaining the confidentiality of your account credentials.</li>
            <li>All activities that occur under your account.</li>
            <li>Immediately notifying the founders of any unauthorized access or security breach.</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>5. User Content Ownership</h2>
          <p>You retain full ownership of all documents, text, files, and other materials ("User Content") that you create or upload to Dashy. Dashy does not claim any ownership rights in your User Content.</p>
          <p>By using Dashy, you grant the Service a worldwide, non-exclusive, royalty-free license to host, store, and display your User Content solely for the purpose of provide the Service to you and other users you choose to share with.</p>
        </div>

        <div className="legal-section">
          <h2>6. Intellectual Property</h2>
          <p>The "Dashy" brand, the dashy.site domain, the application logo, the source code, the user interface designs, and all original software are the exclusive intellectual property of <strong>Anmol Srivastava</strong> and <strong>Pranjal Shrivastav</strong>. You may not copy, modify, distribute, or reverse engineer any part of the service without explicit written permission.</p>
        </div>

        <div className="legal-section">
          <h2>7. Acceptable Use Policy</h2>
          <p>You agree not to use Dashy for any purpose that is unlawful or prohibited by these Terms. Prohibited activities include, but are not limited to:</p>
          <ul>
            <li>Uploading malware, viruses, or any harmful code.</li>
            <li>Interfering with the Service's infrastructure or attempting to bypass rate limits.</li>
            <li>Scraping or harvesting data from the Service using automated tools.</li>
            <li>Using the Service to host spam, phishing, or fraudulent content.</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>8. Data Privacy & Appwrite</h2>
          <p>Dashy utilizes Appwrite Cloud (Frankfurt) for database management and storage. Your data is protected under the Appwrite security framework. However, Dashy and its founders are not responsible for downtime or data loss caused by third-party infrastructure providers.</p>
        </div>

        <div className="legal-section">
          <h2>9. Termination</h2>
          <p>We reserve the right to suspend or terminate your access to the Service at any time, with or without cause, and with or without notice. Upon termination, your right to use the Service will immediately cease.</p>
        </div>

        <div className="legal-section">
          <h2>10. Disclaimer of Warranties</h2>
          <p>DASHY IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
        </div>

        <div className="legal-section">
          <h2>11. Limitation of Liability</h2>
          <p>IN NO EVENT SHALL ANMOL SRIVASTAVA, PRANJAL SHRIVASTAV, OR DASHY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.</p>
        </div>

        <div className="legal-section">
          <h2>12. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of the India, without regard to its conflict of law principles. Any dispute arising from these terms shall be settled in the courts of Lucknow, Uttar Pradesh.</p>
        </div>

        <div className="legal-footer">
          © 2026 Dashy. All rights reserved. Created by Anmol Srivastava & Pranjal Shrivastav.
        </div>
      </div>
    </Modal>
  );
}

export function PrivacyPolicy({ isOpen, onClose }: LegalModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy" size="lg">
      <div className="legal-modal-large">
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-subtitle">Last updated March 27, 2026</p>

        <div className="legal-section">
          <h2>1. Introduction</h2>
          <p>At Dashy, your privacy is our top priority. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our platform.</p>
        </div>

        <div className="legal-section">
          <h2>2. Information We Collect</h2>
          <p>We collect only the essential data needed to provide a seamless productivity experience:</p>
          <ul>
            <li><strong>Authentication Data:</strong> Your name, email address, and profile picture provided by Google via OAuth.</li>
            <li><strong>Workspace Content:</strong> The text, blocks, images, and files you create within your pages and projects.</li>
            <li><strong>Metadata:</strong> Creation dates, edited timestamps, and sort order of your documents.</li>
            <li><strong>Device Info:</strong> Browser type, operating system, and IP address for security logging and session management.</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>3. How We Use Your Information</h2>
          <p>We use the collected data exclusively to:</p>
          <ul>
            <li>Maintain and synchronize your workspace across devices.</li>
            <li>Verify your identity and keep your data secure.</li>
            <li>Provide personalized dashboard analytics and growth metrics.</li>
            <li>Communicate critical service updates or security alerts.</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>4. Data Storage & Security (Appwrite)</h2>
          <p>Your data is processed and stored on <strong>Appwrite Cloud (Frankfurt region)</strong>. We implement strict security measures, including:</p>
          <ul>
            <li>SSL/TLS encryption for all data in transit.</li>
            <li>AES-256 encryption for data at rest.</li>
            <li>Regular security audits and infrastructure monitoring.</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>5. Third-Party Sharing</h2>
          <p><strong>We do not sell your personal information.</strong> We only share data with service providers necessary for operation:</p>
          <ul>
            <li><strong>Google:</strong> To handle secure logins.</li>
            <li><strong>Appwrite:</strong> To provide backend infrastructure and database services.</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>6. Cookies & Local Storage</h2>
          <p>Dashy uses Browser Local Storage to store your theme preferences (light/dark mode), dashboard state, and temporary session keys. These are strictly functional and do not track you across other websites.</p>
        </div>

        <div className="legal-section">
          <h2>7. Data Retention & Deletion</h2>
          <p>You have full control over your data. You can delete any page or project from the Sidebar or Dashboard. When you manually empty the trash, that data is permanently purged from our Appwrite database. To delete your entire account, please contact the founders directly.</p>
        </div>

        <div className="legal-section">
          <h2>8. Your Rights (GDPR/CCPA)</h2>
          <p>Regardless of your location, we respect your rights to:</p>
          <ul>
            <li>Access your data at any time.</li>
            <li>Rectify or update your information.</li>
            <li>Object to processing or withdraw consent.</li>
            <li>Export your content in Markdown or Plain Text formats.</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>9. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or how we handle your data, please contact the founders:</p>
          <p><strong>Anmol Srivastava</strong> (Founder)</p>
          <p><strong>Pranjal Shrivastav</strong> (Co-Founder)</p>
        </div>

        <div className="legal-footer">
          Dashy Privacy Team. 2026 Version 2.0.
        </div>
      </div>
    </Modal>
  );
}
