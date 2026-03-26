import Modal from '../ui/Modal';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsOfService({ isOpen, onClose }: LegalModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Terms of Service" size="lg">
      <div className="legal-content">
        <h3>1. Acceptance of Terms</h3>
        <p>By accessing and using Dashy, you agree to be bound by these Terms of Service. Dashy is a productivity platform created by Anmol Srivastava (Founder) and Pranjal Shrivastav (Co-Founder).</p>
        
        <h3>2. Use of Service</h3>
        <p>Dashy provides a workspace for personal and collaborative productivity. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.</p>

        <h3>3. User Data and Content</h3>
        <p>You retain all rights to the content you create in Dashy. By using the service, you grant us the limited license necessary to host and provide the service to you. We use Appwrite Cloud for secure data storage.</p>

        <h3>4. Prohibited Conduct</h3>
        <p>You agree not to use Dashy for any unlawful purposes, including but not limited to the distribution of malware, harassment, or infringement of intellectual property rights.</p>

        <h3>5. Limitation of Liability</h3>
        <p>Dashy is provided "as is" without warranties of any kind. The founders and the entity shall not be liable for any direct, indirect, or incidental damages arising from your use of the service.</p>

        <h3>6. Changes to Terms</h3>
        <p>We reserve the right to modify these terms at any time. Continued use of the service after such changes constitutes acceptance of the new terms.</p>
        
        <p className="legal-footer">Last updated: March 2026</p>
      </div>
    </Modal>
  );
}

export function PrivacyPolicy({ isOpen, onClose }: LegalModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy" size="lg">
      <div className="legal-content">
        <h3>1. Information We Collect</h3>
        <p>We collect information you provide directly to us when you create an account, such as your name and email address (via Google OAuth). We also store the content of your pages and projects.</p>

        <h3>2. How We Use Information</h3>
        <p>We use the information to provide, maintain, and improve Dashy, and to communicate with you about updates or security notices.</p>

        <h3>3. Data Security</h3>
        <p>Your data is stored securely using Appwrite infrastructure. We implement industry-standard security measures to protect your personal information.</p>

        <h3>4. Third-Party Services</h3>
        <p>We use Google for authentication and Appwrite for backend services. These third parties have their own privacy policies regarding how they handle your data.</p>

        <h3>5. Your Rights</h3>
        <p>You have the right to access, correct, or delete your personal data at any time through the settings panel or by contacting us.</p>

        <h3>6. Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact the Dashy team (Anmol Srivastava or Pranjal Shrivastav).</p>

        <p className="legal-footer">Last updated: March 2026</p>
      </div>
    </Modal>
  );
}
