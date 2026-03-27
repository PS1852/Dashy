import type { LegalSection } from './LegalDocumentPage';

type SectionEntry = [title: string, body: string];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildSections(prefix: string, entries: SectionEntry[]): LegalSection[] {
  return entries.map(([title, body], index) => ({
    id: `${prefix}-${index + 1}-${slugify(title)}`,
    title,
    body,
  }));
}

const termsEntries: SectionEntry[] = [
  [
    'Acceptance of These Terms',
    `By accessing, browsing, registering for, or using Dashy, you agree to be bound by these Terms of Service and by any additional rules, notices, or policies that Dashy may publish for specific features. If you do not agree with the legal conditions described here, you must stop using the service and avoid creating or continuing to use an account.`,
  ],
  [
    'Operator Identity',
    `Dashy is operated by Anmol Srivastava and Pranjal Shrivastav as the team responsible for the product, policy direction, moderation, and support experience of the service. References to "Dashy," "we," "our," or "us" in these Terms mean the Dashy service and the people operating it on the terms described in this document.`,
  ],
  [
    'Service Description',
    `Dashy is a digital workspace intended to help users manage goals, tasks, notes, pages, files, and related personal organization activity. The platform may evolve over time, and some descriptions in product materials may be updated as features are refined, expanded, tested, or replaced in order to improve performance, reliability, or product direction.`,
  ],
  [
    'Current Product Status',
    `Dashy is currently offered as a free-to-use product, but certain parts of the service may remain under active development, testing, or staged rollout. A feature being visible in concept, roadmap language, or interface placeholders does not guarantee that the feature is fully available, production ready, or supported in every account or region at that moment.`,
  ],
  [
    'Eligibility to Use Dashy',
    `Dashy is intended for general audiences, including users who want help organizing study, work, home, or personal routines. If a user is below the age required to enter binding agreements alone under local law, the user should use Dashy only with the involvement, permission, and supervision of a parent or guardian who accepts responsibility for that use.`,
  ],
  [
    'Regional Compliance',
    `You are responsible for making sure that your use of Dashy is lawful in your country, state, territory, or other jurisdiction. Dashy does not represent that every part of the service is appropriate, lawful, or available in every region, and we may restrict or refuse access where necessary to address legal, operational, security, or risk-management concerns.`,
  ],
  [
    'Account Registration',
    `You may need an account to access Dashy features that store content, sync information, or personalize your workspace. When you create or maintain an account, you must provide accurate information, keep it reasonably current, and avoid impersonating another person, organization, or brand in a way that could mislead users, interfere with trust, or create legal exposure.`,
  ],
  [
    'Current Sign-In Methods',
    `Dashy currently supports Google sign-in in the live product, and those sign-in flows are governed by the terms, disclosures, and permissions of the identity provider as well as these Terms. Dashy may also offer email-and-password sign-in or additional authentication methods in the future, and those methods will be subject to these Terms when they are actually launched.`,
  ],
  [
    'Account Security',
    `You are responsible for protecting the devices, browser sessions, email inboxes, credentials, and other access mechanisms connected to your Dashy account. If you believe your account, authentication method, or session has been compromised, you should log out where possible, secure your external credentials, and contact Dashy promptly through the contact channels listed on this website.`,
  ],
  [
    'Responsibility for Activity',
    `You are responsible for activity that occurs through your account or session unless the law requires a different result. Dashy may treat actions taken from an authenticated account or active session as actions authorized by that user, especially where the relevant behavior could reasonably appear to come from the person controlling the connected account, device, or authentication method.`,
  ],
  [
    'No Shared Credentials',
    `You must not intentionally share access credentials or otherwise allow unauthorized people to operate your Dashy account in ways that create security, privacy, moderation, or billing issues. If Dashy later introduces team, shared, or collaboration features, those features must be used through the official mechanisms provided for that purpose rather than by informal credential sharing.`,
  ],
  [
    'Accuracy of Profile Information',
    `You should keep your profile name, email address, and related account details accurate enough for Dashy to support the account, respond to notices, and maintain the integrity of account ownership records. Dashy may rely on the account information attached to a session when reviewing access requests, security incidents, abuse reports, or administrative actions involving that account.`,
  ],
  [
    'Workspace Organization Features',
    `Dashy allows users to create and organize pages, projects, blocks, tasks, goals, files, and similar workspace material depending on the features currently available in the product. Dashy may change how content is grouped, displayed, synced, or edited if doing so is reasonably necessary to maintain functionality, improve the product, or address infrastructure, moderation, or security concerns.`,
  ],
  [
    'Content Ownership',
    `You retain ownership of the text, files, uploads, notes, tasks, pages, images, and other content that you lawfully create, upload, or store in Dashy. These Terms do not transfer ownership of your content to Dashy, except to the limited extent required for Dashy to receive the rights described below so the service can function as a workspace product.`,
  ],
  [
    'Limited License to Dashy',
    `By using Dashy, you grant Dashy a limited, non-exclusive, revocable, worldwide license to host, process, store, back up, secure, reproduce, transmit, and display your content only as needed to operate, maintain, secure, troubleshoot, and improve the service for you. This license exists solely so Dashy can provide the platform and does not give Dashy general ownership of your work.`,
  ],
  [
    'User Responsibility for Content',
    `You are responsible for the legality, accuracy, permissions, and consequences of content you upload, create, or store through Dashy. Dashy does not pre-screen every item of user content and cannot guarantee that user material is lawful, safe, complete, non-infringing, or appropriate, so the burden of lawful use stays with the person who submits or controls the content.`,
  ],
  [
    'Private-by-Default Workspace Expectations',
    `Dashy is designed around personal workspace use, and user content is not treated as public publishing by default simply because it exists inside the service. Even so, users should avoid placing extremely sensitive, regulated, or mission-critical material into the platform unless they have independently evaluated the risk, their backup strategy, and the technical and legal suitability of the service.`,
  ],
  [
    'Uploads and Files',
    `When you upload images, files, or other materials to Dashy, you represent that you have the rights and permissions required to store that material and allow Dashy to handle it for service operation. You also agree not to upload content that violates law, privacy, intellectual property rights, safety rules, or the usage restrictions described in these Terms.`,
  ],
  [
    'Backups and Synchronization',
    `Dashy may store copies, cached versions, revision states, or synchronized representations of content where reasonably necessary to support loading, editing, syncing, recovery, abuse review, or service stability. Those operational copies remain subject to the ownership and limited-license rules in these Terms and are not a promise that Dashy will preserve every version of your content indefinitely.`,
  ],
  [
    'Support and Abuse Review Access',
    `Dashy does not claim a general right to freely inspect user material for curiosity or unrelated internal purposes. However, Dashy may access or review limited account or content information when reasonably necessary to investigate abuse reports, enforce these Terms, address platform misuse, respond to security incidents, comply with legal obligations, or protect the rights, privacy, or safety of users and the service.`,
  ],
  [
    'No Unlawful Use',
    `You may not use Dashy to plan, facilitate, promote, store, transmit, or conceal conduct that is unlawful in the applicable jurisdiction. This includes using the service in connection with fraud, theft, exploitation, unlawful surveillance, organized abuse, criminal activity, or any behavior that could expose Dashy, its users, or third parties to legal or safety risk.`,
  ],
  [
    'No Sexual or Nude Exploitative Content',
    `Dashy strictly prohibits uploads, storage, transmission, or use of the service for sexual exploitation, non-consensual sexual content, explicit nudity in violation of law or platform rules, or other material that Dashy reasonably determines is unsafe, abusive, exploitative, or inappropriate for the service. Violations may result in immediate suspension, permanent removal, reporting, or other actions Dashy considers necessary.`,
  ],
  [
    'No Child Sexual Abuse Material',
    `Dashy strictly prohibits any content involving child sexual abuse, child exploitation, grooming, or any related material or conduct. Dashy reserves the right to remove such material immediately, terminate access without warning, preserve evidence where appropriate, and cooperate with lawful reporting, investigative, and protective processes to the extent required or permitted by law.`,
  ],
  [
    'No Harassment or Hate Conduct',
    `You may not use Dashy to harass, threaten, abuse, stalk, bully, demean, or target people or groups based on protected characteristics or other personal traits. Dashy may take enforcement action against hateful, abusive, violent, or discriminatory use of the service even if the conduct occurs through personal workspace content, uploads, messages, naming patterns, or other indirect uses of the platform.`,
  ],
  [
    'No Violence, Terror, or Threat Activity',
    `Dashy may not be used to support violent threats, terror-related material, instructions for serious harm, credible self-harm facilitation, or content that reasonably creates an immediate safety risk. Dashy may remove content, preserve records, restrict accounts, or escalate issues where necessary to protect people, investigate threats, or comply with law or urgent safety expectations.`,
  ],
  [
    'No Malware, Phishing, or Security Abuse',
    `You may not use Dashy to upload malicious code, distribute harmful payloads, test credential theft, host phishing content, probe vulnerabilities without permission, or interfere with the integrity, confidentiality, or availability of systems, networks, or accounts. Attempts to bypass limits, automate abuse, or undermine platform security may result in immediate enforcement and referral where appropriate.`,
  ],
  [
    'No Spam or Scam Activity',
    `Dashy may not be used for spam, deceptive outreach, pyramid schemes, romance fraud, impersonation-based scams, or any misleading conduct intended to manipulate, defraud, or pressure other people. Dashy may remove accounts or content tied to coordinated deception even if the misuse occurs through indirect workspace material rather than a public communication feature inside the service.`,
  ],
  [
    'No Impersonation',
    `You may not impersonate another person, business, brand, public figure, or institution in a misleading way through your profile, content, files, uploaded materials, or other use of Dashy. Parody or reference use does not excuse conduct that creates material confusion, abuse, fraud, or privacy risk, and Dashy may decide in good faith when impersonation concerns justify enforcement action.`,
  ],
  [
    'No Intellectual Property Infringement',
    `You may not use Dashy to store, reproduce, or distribute material that infringes copyrights, trademarks, trade secrets, publicity rights, or other intellectual property or proprietary rights. Dashy may investigate complaints, remove allegedly infringing material where appropriate, and take repeat-violator measures in line with the service's rights, obligations, and reasonable platform-protection interests.`,
  ],
  [
    'Copyright Complaints and Notices',
    `If you believe that content in Dashy infringes your copyright or other rights, you may send a detailed notice to Dashy's contact emails describing the allegedly infringing material, the basis for your claim, and the relief requested. Dashy may request additional information before acting and may remove, disable, or limit access to material while evaluating a complaint in good faith.`,
  ],
  [
    'Reporting Abuse',
    `Users and third parties may report conduct or content that appears to violate these Terms, safety rules, privacy rights, or applicable law. Dashy may evaluate reports using available account information, content context, technical signals, and any supporting material provided, and Dashy may choose the enforcement response that it reasonably considers proportionate to the seriousness and credibility of the issue.`,
  ],
  [
    'Moderation Discretion',
    `Dashy reserves the right to investigate, restrict, remove, edit, refuse, or disable content, accounts, features, or access where Dashy reasonably believes action is needed to enforce these Terms or protect the service. Moderation decisions may be based on safety, privacy, legal, operational, or reputational concerns, and the existence of discretion does not create an obligation to monitor everything continuously.`,
  ],
  [
    'Warnings, Suspensions, and Bans',
    `Depending on the severity, credibility, and repetition of a violation, Dashy may issue warnings, limit features, suspend access, or permanently ban an account without first offering an opportunity to cure. Some conduct, including severe abuse, sexual exploitation, malware, fraud, or urgent safety threats, may justify immediate termination with little or no notice.`,
  ],
  [
    'Repeat Violations',
    `If Dashy determines that a user repeatedly violates these Terms, privacy expectations, intellectual property rules, or platform safety standards, Dashy may take escalated action even where each individual incident might not justify the strongest enforcement result on its own. Repeated disregard for rules may demonstrate that continued access presents an unacceptable risk to the platform or other users.`,
  ],
  [
    'No Guaranteed Collaboration Feature',
    `Dashy does not currently promise live in-app collaboration, public publishing, or team workspace functionality as a fully launched production feature. Product descriptions, roadmap language, or interface hints about future collaboration do not create a present legal obligation to provide those features, and Dashy may delay, revise, limit, or cancel them before or after announcement.`,
  ],
  [
    'Future Collaboration Terms',
    `If Dashy later launches collaboration tools, shared workspaces, invites, public links, commenting, or similar social or team-oriented functionality, Dashy may publish additional rules covering access control, shared ownership boundaries, permissions, moderation, visibility, and responsibility for collaborative content. Those future terms may supplement these Terms and apply only when the relevant features become available.`,
  ],
  [
    'No Service-Level Guarantee',
    `Dashy aims to offer a reliable product, but Dashy does not guarantee uninterrupted availability, perfect responsiveness, permanent uptime, or error-free operation. Service interruptions may result from maintenance, infrastructure incidents, third-party failures, abuse defenses, software defects, network conditions, legal restrictions, or other events that Dashy cannot fully predict or control.`,
  ],
  [
    'Maintenance and Operational Changes',
    `Dashy may perform maintenance, repair, patching, migration, moderation, or infrastructure work that affects feature behavior, account access, or service availability. While Dashy may try to reduce disruption where practical, Dashy is not required to preserve every workflow or provide advance notice in every case, especially where immediate action is needed for security, abuse prevention, or system integrity.`,
  ],
  [
    'Beta and Experimental Features',
    `Dashy may from time to time label a tool, interface, or capability as experimental, preview, beta, or similar language. Experimental features may be incomplete, unstable, or removed without notice, and users choose to use them at their own risk, subject to the same platform rules and ownership principles that apply to the rest of the service unless Dashy states otherwise.`,
  ],
  [
    'Device and Browser Compatibility',
    `Dashy may work differently depending on browser version, device performance, connection quality, screen size, operating system behavior, and third-party provider availability. Dashy does not guarantee that the service will function identically across all environments, and users remain responsible for choosing devices, software, and connectivity conditions that are reasonably compatible with the service.`,
  ],
  [
    'Storage, Bandwidth, and Fair Use',
    `Dashy may impose or later introduce operational limits relating to storage volume, upload size, rate limits, bandwidth usage, or feature intensity where necessary to keep the service stable and fair for all users. Abuse of resources, extreme automated behavior, or use patterns that materially burden the platform may lead to restrictions even before specific numerical limits are publicly documented.`,
  ],
  [
    'Feedback and Suggestions',
    `If you send Dashy feedback, ideas, bug reports, improvement suggestions, or product proposals, you agree that Dashy may review and use those suggestions without any obligation to compensate you. This does not transfer ownership of your separate user content, but it does allow Dashy to act on product feedback if doing so helps improve the service or related workflows.`,
  ],
  [
    'Dashy Intellectual Property',
    `Except for user-owned content and clearly identified third-party materials, Dashy's software, product design, logos, interface elements, names, visual branding, and service-related materials are protected by applicable intellectual property and unfair competition laws. You may not copy, republish, resell, distribute, or exploit those materials beyond what is expressly allowed by law or by Dashy's written permission.`,
  ],
  [
    'Brand and Trademark Use',
    `You may not use the Dashy name, brand identity, icons, logos, screenshots, or other identifying materials in a way that falsely suggests sponsorship, endorsement, partnership, or official approval. Fair referential use may be allowed under law, but Dashy may object to uses that are misleading, abusive, confusing, damaging, or commercially exploitative beyond legitimate reference.`,
  ],
  [
    'No Reverse Engineering Abuse',
    `Except to the limited extent that non-waivable law allows, you may not reverse engineer, decompile, disassemble, or derive source code from Dashy's software or infrastructure for a harmful, competing, or exploitative purpose. This restriction does not prohibit good-faith security disclosure conducted responsibly, but Dashy may require that testing respect scope, legality, and platform safety.`,
  ],
  [
    'No Automated Extraction',
    `You may not scrape, crawl, mirror, bulk download, or systematically extract data or interface output from Dashy using bots, scripts, or other automation without Dashy's prior written permission. Automated access that interferes with performance, circumvents intended usage patterns, or harvests material at scale may be treated as abusive or unauthorized access under these Terms.`,
  ],
  [
    'Security Research and Disclosure',
    `If you discover a security issue affecting Dashy, you should report it privately and avoid exploiting the issue beyond what is reasonably necessary to demonstrate the problem. Dashy appreciates responsible disclosure, but these Terms do not authorize invasive testing, data access, disruption, or public release of exploit details while a vulnerability remains unresolved or unreviewed.`,
  ],
  [
    'Third-Party Providers',
    `Dashy may rely on third-party services, including identity, hosting, database, storage, networking, or infrastructure providers, to operate the platform. Dashy is not responsible for every action, outage, or policy of those providers, but Dashy may depend on them to deliver core service functionality, and your use of Dashy may therefore indirectly involve those providers' systems and processing environments.`,
  ],
  [
    'Future Paid Plans',
    `Dashy is currently free, but Dashy may later introduce paid plans, premium limits, subscriptions, or additional paid features. If Dashy does so, Dashy expects to publish pricing, billing terms, renewal rules, cancellation information, and any plan-specific conditions before users are asked to pay, and those plan-specific terms may supplement these general Terms.`,
  ],
  [
    'Future Billing and Taxes',
    `If Dashy introduces paid features, users will be responsible for providing complete and accurate payment information where required and for paying applicable taxes, fees, or other charges associated with those purchases. Dashy may use third-party payment processors for such transactions and may rely on those providers' systems, verification rules, and fraud-prevention measures.`,
  ],
  [
    'Future Refund Rules',
    `Because Dashy does not currently charge for access, no present refund program is offered under these Terms. If paid features are introduced later, Dashy may publish separate refund, cancellation, trial, or billing-dispute rules for those offerings, and users should review those specific rules at the time of purchase rather than assuming a refund right exists automatically.`,
  ],
  [
    'Service Communications',
    `Dashy may send notices necessary to run the service, protect accounts, explain policy changes, or respond to support and security matters using the contact information or channels reasonably associated with your account. Promotional or optional marketing communications, if any, should be handled in line with applicable consent requirements and any preferences that Dashy makes available at that time.`,
  ],
  [
    'Privacy Policy Relationship',
    `Your use of Dashy is also subject to the Dashy Privacy Policy, which explains how information is collected, used, retained, and protected. If there is a direct inconsistency between a privacy-specific statement and a general operational statement in these Terms, Dashy will try to interpret the documents together in a way that gives sensible effect to both, unless law requires otherwise.`,
  ],
  [
    'Termination by You',
    `You may stop using Dashy at any time by discontinuing use of the service and, where available, deleting content or requesting deletion of your account. Ending use does not automatically erase every record immediately, because Dashy may still retain limited information for backup, abuse prevention, legal compliance, dispute handling, or technical wind-down purposes as described in the Privacy Policy.`,
  ],
  [
    'Termination by Dashy',
    `Dashy may suspend, restrict, or terminate your access if Dashy reasonably believes your conduct violates these Terms, creates safety or legal risk, harms the platform, or makes continued service impractical. Dashy may also stop offering all or part of the service entirely, though Dashy will generally try to act in a commercially and operationally reasonable manner where circumstances permit.`,
  ],
  [
    'Effect of Termination',
    `On termination, your right to access or use Dashy may stop immediately, and some or all of your content, account settings, sessions, or stored materials may become unavailable. Dashy may keep limited records after termination where reasonably necessary for legal compliance, auditing, dispute resolution, security review, abuse prevention, backup cycles, or enforcement of these Terms.`,
  ],
  [
    'Inactive Accounts',
    `Dashy may treat accounts as inactive if they remain unused or not meaningfully accessed for approximately one year. Subject to operational realities, backup timing, legal obligations, dispute preservation needs, and security considerations, Dashy may delete inactive accounts and associated data after that period, but Dashy does not guarantee that deletion will occur on an exact calendar schedule.`,
  ],
  [
    'No Professional Advice',
    `Dashy is a productivity and organization service, not a law firm, therapist, doctor, school, financial adviser, emergency provider, or regulated records custodian. Content stored or generated inside Dashy is not professional advice from Dashy, and users should not rely on the service as a substitute for qualified advice or legally required record-keeping systems.`,
  ],
  [
    'Disclaimer of Warranties',
    `To the fullest extent permitted by law, Dashy is provided on an "as is" and "as available" basis without warranties of any kind, whether express, implied, statutory, or otherwise. Dashy disclaims warranties including merchantability, fitness for a particular purpose, non-infringement, availability, security, compatibility, uninterrupted operation, and accuracy of results produced through ordinary use of the service.`,
  ],
  [
    'Limitation of Liability',
    `To the fullest extent permitted by law, Dashy and its operators will not be liable for indirect, incidental, consequential, special, exemplary, or punitive damages, or for loss of profits, revenue, goodwill, data, or business opportunity arising from or related to your use of the service. If law requires any liability despite this clause, liability will be limited to the minimum amount the law permits.`,
  ],
  [
    'User Indemnity',
    `To the extent permitted by law, you agree to defend, indemnify, and hold harmless Dashy and its operators from claims, liabilities, damages, losses, and expenses arising out of your content, your misuse of the service, your violation of these Terms, or your infringement of another person's rights. This clause applies only to the extent the relevant claim is caused by your conduct or materials.`,
  ],
  [
    'Force Majeure',
    `Dashy will not be responsible for delay, failure, or disruption caused by events beyond Dashy's reasonable control, including natural disasters, infrastructure failures, war, civil unrest, internet outages, labor disruptions, service-provider failures, epidemics, government actions, or security emergencies. During such events, Dashy may adapt or suspend parts of the service as necessary for safety and continuity.`,
  ],
  [
    'Legal Requests and Compliance',
    `Dashy may preserve, review, or disclose information when Dashy reasonably believes doing so is necessary to comply with law, respond to lawful requests, protect users, investigate abuse, enforce these Terms, or defend rights and property. Dashy may challenge or narrow requests where appropriate, but Dashy is not required to notify users where notice is legally restricted or unsafe.`,
  ],
  [
    'Export and Sanctions Compliance',
    `You may not use Dashy in violation of applicable export controls, sanctions laws, or similar trade restrictions. Dashy may restrict or terminate access where necessary to comply with those rules or to reduce the risk that the service could be used in connection with prohibited persons, entities, territories, or transactions under applicable law.`,
  ],
  [
    'Assignment by Dashy',
    `Dashy may assign, transfer, delegate, or restructure its rights or obligations under these Terms in connection with a reorganization, partnership, merger, asset transfer, financing, or similar business event, provided that doing so does not eliminate rights that the law makes non-waivable. You may not assign your rights or obligations under these Terms without Dashy's prior written consent.`,
  ],
  [
    'Severability',
    `If a court or authority with proper jurisdiction finds that one provision of these Terms is invalid, illegal, or unenforceable, the rest of the Terms will remain in effect to the fullest extent permitted by law. Dashy and the user agree that any unenforceable provision should be interpreted, narrowed, or replaced only to the extent necessary to make the remaining agreement workable and lawful.`,
  ],
  [
    'Waiver',
    `If Dashy does not immediately enforce a provision of these Terms, that does not mean Dashy has waived the right to enforce it later. Any waiver of a contractual right or remedy must be clear and specific to be effective, and a waiver in one situation does not automatically apply to other situations, users, or future violations.`,
  ],
  [
    'Entire Agreement',
    `These Terms, together with the Privacy Policy and any additional rules or notices that Dashy publishes for specific features, form the complete agreement between you and Dashy regarding the use of the service. They replace prior discussions or statements about the same subject matter to the extent those statements conflict with the legal rules actually published here.`,
  ],
  [
    'Changes to the Terms',
    `Dashy may update these Terms from time to time to reflect product changes, legal developments, policy improvements, infrastructure changes, or moderation needs. When Dashy publishes a revised version, the updated version will apply from the stated effective date, and continued use of the service after that date may be treated as acceptance of the revised Terms where law allows.`,
  ],
  [
    'Notice of Material Changes',
    `For major changes that materially affect user rights or obligations, Dashy may choose to provide additional notice through the website, account context, or other reasonable channels. Dashy is not required to use any one notification method in every case, but Dashy aims to make significant changes reasonably visible so users can review them before continuing normal use.`,
  ],
  [
    'Informal Dispute Contact',
    `Before starting formal legal proceedings, Dashy asks that users first attempt to raise the issue directly through Dashy's listed contact emails or contact channels. Informal contact does not waive legal rights, but it can often help clarify misunderstandings, gather facts, and resolve matters more efficiently than immediate formal action.`,
  ],
  [
    'Governing Law',
    `These Terms and any dispute related to Dashy will be governed by the laws applicable in Delhi, India, without applying conflict-of-law rules that would require the law of another jurisdiction to control. This governing-law clause applies except where non-waivable consumer protection or jurisdictional rules require a different legal result for a specific claim.`,
  ],
  [
    'Jurisdiction and Venue',
    `Subject to any non-waivable rights under applicable law, courts located in Delhi, India will have exclusive jurisdiction over disputes arising out of or relating to Dashy, these Terms, or the use of the service. You and Dashy consent to that venue for formal proceedings unless the law requires a different forum for a particular claim or remedy.`,
  ],
  [
    'Equitable Relief',
    `Nothing in these Terms prevents Dashy from seeking injunctive, equitable, or similar relief where necessary to protect intellectual property, confidential information, service integrity, safety interests, or other rights that could be seriously harmed by delay. Likewise, users retain any non-waivable right to seek urgent relief where the law clearly permits that remedy.`,
  ],
  [
    'Contact Information',
    `Questions, notices, abuse reports, copyright complaints, legal concerns, and support issues related to these Terms may be sent to anmolshrii54@gmail.com or pranjalshrivastav5@gmail.com. Dashy may also be reached through the WhatsApp contact number published on the website, but users should avoid sending sensitive credentials or confidential account secrets through informal channels.`,
  ],
  [
    'Language and Interpretation',
    `These Terms are written in English for operational clarity, and headings are included for convenience rather than to narrow the meaning of the provisions. Dashy intends the Terms to be interpreted reasonably, consistently, and in a way that preserves platform safety, lawful operation, and the limited nature of the rights that users grant to Dashy solely for service operation.`,
  ],
  [
    'Survival',
    `Any provision that by its nature should continue after suspension or termination will survive, including ownership rules, licenses needed for post-termination handling, disclaimer provisions, liability limitations, indemnity, dispute terms, and clauses relating to enforcement, safety, legal compliance, and record retention. Termination of access does not erase obligations that logically continue afterward.`,
  ],
];

const privacyEntries: SectionEntry[] = [
  [
    'Scope of This Privacy Policy',
    `This Privacy Policy explains how Dashy collects, uses, stores, protects, discloses, and otherwise handles information connected to the use of the Dashy service, website pages, account systems, uploads, support channels, and related workspace features. It applies to current Dashy operations as they exist today and may be updated if Dashy later introduces new data flows, payment features, or collaboration tools.`,
  ],
  [
    'Who Operates Dashy',
    `Dashy is operated by Anmol Srivastava and Pranjal Shrivastav, and the service is directed and managed from Delhi, India. In this Privacy Policy, "Dashy," "we," "our," and "us" refer to the service and its operators acting in connection with product management, moderation, security review, support handling, legal compliance, and related service operations.`,
  ],
  [
    'Information Categories Overview',
    `Dashy currently handles a limited but important set of data categories needed to provide a personal workspace product. These categories can include account identity details, profile information, authentication-related information, IP and connection information, device or browser context, user-created workspace content, uploaded files, and service records needed to run, secure, and improve the platform responsibly.`,
  ],
  [
    'Account Identity Data',
    `When you use Dashy, the service may collect and store account identity details such as your display name, email address, and profile image, depending on the sign-in method and profile information available. Dashy uses this information to identify your account, support sign-in, personalize the interface, and keep user data associated with the correct workspace owner.`,
  ],
  [
    'Authentication Information',
    `Dashy currently supports Google sign-in in the live product, so some authentication-related information is obtained through the identity provider and the sessions used to access Dashy. This can include identifiers, verified account details, or other session-linked data reasonably needed to confirm identity, maintain access, protect accounts, and connect the right workspace to the right user.`,
  ],
  [
    'Future Email-and-Password Sign-In',
    `Dashy may later introduce email-and-password sign-in or additional authentication methods, but that functionality is not treated in this policy as currently active unless and until it is actually launched. If Dashy adds a new authentication method, Dashy may update this Privacy Policy or publish a supplemental notice explaining what new information is collected and how it is handled.`,
  ],
  [
    'Profile Information',
    `Profile information may include the name, avatar or photo, and similar account presentation details tied to your user account. Dashy uses this data to help identify you in the interface, distinguish one account from another, maintain personalization, and support workspace management, while still treating the profile information as personal information protected under this policy.`,
  ],
  [
    'Workspace Content',
    `Dashy stores and processes the pages, tasks, goals, notes, projects, blocks, text, organization structure, and other workspace content that users create inside the service. This material is necessary for Dashy to function as a digital workspace, and it is processed to let users create, update, save, retrieve, and manage their personal productivity information across supported devices and sessions.`,
  ],
  [
    'Uploaded Files and Images',
    `If you upload images or files to Dashy, Dashy processes those uploads to store, retrieve, display, and connect them to the relevant workspace context. Uploaded content may contain personal information depending on what the user chooses to upload, so Dashy treats those materials as part of the user's content and protects them under the same general privacy commitments described in this policy.`,
  ],
  [
    'Technical and Log Data',
    `Dashy may receive technical and log-level information such as IP address, request metadata, device type, browser context, approximate connection details, timestamps, and related service diagnostics. Dashy uses this information to operate the service, troubleshoot issues, secure accounts, analyze failures, detect abuse, and maintain platform reliability instead of for advertising-driven profiling or sale of personal data.`,
  ],
  [
    'Usage Data',
    `Dashy may process records about how the service is used, such as page creation, update activity, deletion events, sign-in state, error conditions, or other operational interactions needed to make the product function. Dashy does not describe this data here as broad behavioral advertising data, but as service-use records required to deliver a secure and working workspace experience.`,
  ],
  [
    'Browser Storage and Similar Technology',
    `Dashy uses functional browser storage, including local storage and similar client-side mechanisms, to keep certain preferences and temporary experience settings available in the browser. This may include interface preferences, recent page references, editor-state preferences, or related values needed to make the product usable and consistent, and these tools are used for service functionality rather than ad tracking across other sites.`,
  ],
  [
    'Information Received from Google',
    `If you sign in through Google, Dashy receives only the account information and session context reasonably necessary to authenticate you and operate the account. Dashy does not claim that it receives every data point available from Google, and Dashy expects users to review Google's own privacy information for details about how Google handles identity-provider side processing.`,
  ],
  [
    'Information You Choose to Provide',
    `Users may choose to provide additional information to Dashy through uploads, support requests, moderation reports, or direct contact with the operators. Dashy encourages users not to send unnecessary sensitive personal information through informal channels, but if users voluntarily provide information relevant to support, security, or legal concerns, Dashy may process that information to respond appropriately.`,
  ],
  [
    'Why Dashy Collects Data',
    `Dashy collects and processes data because a workspace service cannot function without storing identity-linked content, session information, and operational records. Dashy uses data primarily to authenticate users, save and synchronize work, render files and workspace structures, secure accounts, detect abuse, respond to support needs, comply with law, and make reasonable product and reliability improvements over time.`,
  ],
  [
    'Service Delivery Purpose',
    `A core purpose of Dashy's data processing is to deliver the actual features users request when they use the product. Without processing account-linked content, files, and settings, Dashy could not display pages, restore work, organize projects, maintain sessions, or otherwise provide the digital workspace functionality that defines the service.`,
  ],
  [
    'Authentication and Access Control Purpose',
    `Dashy uses personal information and technical identifiers to make sure the correct user can access the correct workspace. This includes verifying sign-in status, connecting account information to stored content, and using session-related processing to prevent unauthorized access or accidental exposure of one user's workspace data to another person's account.`,
  ],
  [
    'Synchronization and Save Operations',
    `Dashy processes information to save work, synchronize changes, maintain project organization, and keep files or block-level content attached to the right workspace elements. This processing is central to the product's operation and is not optional if a user wants Dashy to function as an account-based workspace rather than a purely local and offline tool.`,
  ],
  [
    'Security and Abuse Prevention Purpose',
    `Dashy uses account information, technical records, and content context where necessary to monitor misuse, investigate reported violations, enforce platform rules, and protect users from fraud, malware, impersonation, harassment, or other harmful conduct. Dashy may also use these records to protect service integrity and reduce the risk of unauthorized access or platform abuse.`,
  ],
  [
    'Support and Troubleshooting Purpose',
    `If a user contacts Dashy about a bug, account problem, content issue, or safety concern, Dashy may process the information needed to understand and resolve the issue. This can include looking at account identifiers, workspace references, technical failures, or limited content context where reasonably necessary to investigate the problem and provide meaningful support.`,
  ],
  [
    'Optional Communications',
    `Dashy may use contact information to send service notices, account-related updates, or other operational communications needed to run the product. If Dashy later sends optional promotional communications, Dashy expects to do so only where permitted by law and in a way that respects user choice, consent requirements, or opt-out rights where those rights apply.`,
  ],
  [
    'Product Improvement',
    `Dashy may use information in a limited and proportionate way to understand bugs, improve performance, refine interface behavior, and make the service more stable or useful. Dashy aims to improve the product without turning user data into a saleable ad asset, and the improvement purpose described here should be read in that operational context.`,
  ],
  [
    'Future Paid Features',
    `Dashy is currently free, so this policy does not describe active billing or payment-card processing by Dashy at this time. If Dashy later introduces paid features, Dashy may need to process payment-related information through appropriate providers and may update this policy to describe those data flows, billing records, and related retention or legal-compliance requirements before they become active.`,
  ],
  [
    'Legal Bases Where Applicable',
    `Where privacy law requires Dashy to identify a legal basis for processing, Dashy may rely on bases such as performance of a contract or requested service, user consent, legitimate interests in operating and securing the platform, and compliance with legal obligations. The availability of a particular legal basis may depend on the type of information and the jurisdiction involved.`,
  ],
  [
    'Consent-Based Processing',
    `Dashy may rely on consent where a user voluntarily provides certain information or where local law requires consent for a particular communication or processing activity. Where consent is the basis for processing, users may generally withdraw consent going forward, although Dashy may still retain or use previously collected information to the extent another lawful basis applies.`,
  ],
  [
    'Contractual Necessity',
    `Much of Dashy's processing is based on the simple fact that the service cannot work as requested unless Dashy stores and uses account-linked information. When a user asks Dashy to provide an authenticated workspace, save content, or connect files to an account, Dashy may process information because that processing is reasonably necessary to perform the requested service.`,
  ],
  [
    'Legitimate Interests',
    `Dashy may process certain information based on legitimate interests such as service security, abuse prevention, product stability, debugging, enforcement of platform rules, and protection of Dashy's legal rights. Where this basis is relevant, Dashy intends to use it in a measured way that is related to real service needs rather than broad commercial profiling or unrelated secondary exploitation.`,
  ],
  [
    'Legal Compliance',
    `Dashy may process and retain information where necessary to comply with law, respond to lawful requests, handle disputes, protect rights, or address urgent safety situations. Dashy may also preserve records where reasonably necessary to document actions taken under the Terms of Service, including moderation, abuse prevention, security review, or copyright-related handling.`,
  ],
  [
    'No Sale of Personal Information',
    `Dashy does not sell personal information in the ordinary commercial sense and does not describe its current business model as based on monetizing user data. Dashy also does not state that it shares personal information for cross-context behavioral advertising, and this policy should be read against Dashy's stated position that user privacy is not to be exploited as an advertising commodity.`,
  ],
  [
    'No Third-Party Ad Network Use',
    `Dashy does not identify any current use of third-party ad networks, remarketing platforms, or similar advertising technologies that profile users across unrelated websites for targeted ads. If Dashy ever introduces such a practice, which is not the current position described here, Dashy would need to update this policy and any applicable consent or opt-out mechanisms.`,
  ],
  [
    'Service Providers and Infrastructure',
    `Dashy may use third-party service providers where needed to operate the platform, including identity services, storage, database, networking, or hosting infrastructure. These providers do not receive a general ownership right in user content, but they may process information on Dashy's behalf to the extent reasonably necessary for authentication, storage, delivery, performance, or related technical operations.`,
  ],
  [
    'Google as an Identity Provider',
    `When a user signs in through Google, Google acts as a separate provider with its own privacy practices and account-level controls. Dashy uses Google's sign-in flow to authenticate the user and receive the profile or account details required for access, but users should still review Google's own privacy documentation for how Google collects, stores, and uses data in its role as provider.`,
  ],
  [
    'Backend and Storage Providers',
    `Dashy uses technical infrastructure providers to store and serve account data, files, and workspace records. Even though Dashy is managed from Delhi, India, some processing may occur through provider-operated systems or regions used to keep the product online, secure, and functional, and users should not read this policy as a promise that every byte is processed physically only in one local office location.`,
  ],
  [
    'Limited Team Access',
    `Dashy does not claim that the operators review private user content as a matter of routine curiosity or normal product browsing. However, Dashy may access limited information when reasonably necessary for abuse-report review, security investigations, platform rule enforcement, troubleshooting, legal compliance, or privacy and safety protection, and that access is expected to be tied to a concrete operational reason.`,
  ],
  [
    'When Content May Be Reviewed',
    `Content review may occur where Dashy receives a report, detects a security issue, investigates possible Terms violations, responds to a legal demand, or tries to resolve a user-requested support problem that cannot be understood without limited review. Dashy aims to keep such review scoped to the issue being handled rather than using it as a broad or open-ended inspection right.`,
  ],
  [
    'International Processing Context',
    `Dashy is managed from Delhi, India, but internet-based services often depend on infrastructure or providers whose systems may operate in more than one region. As a result, some data handling, routing, storage, or technical processing may occur outside Delhi when reasonably necessary to operate Dashy, even though the service operators themselves direct the product and policy decisions from India.`,
  ],
  [
    'Security Measures',
    `Dashy uses reasonable technical and organizational steps to protect account information and user content against unauthorized access, misuse, or loss. No internet service can promise absolute security, but Dashy aims to use proportionate protections such as authenticated access controls, provider-supported security features, internal moderation boundaries, and operational practices designed to reduce privacy and security risk.`,
  ],
  [
    'Access Controls',
    `Dashy seeks to ensure that account-linked workspace data is available only through authorized sessions or administrative actions justified by safety, support, or legal need. Users also play a role in access control by protecting their own accounts, email access, and devices, because Dashy cannot fully protect data if a user's underlying identity or device security is compromised outside the service.`,
  ],
  [
    'No Absolute Security Guarantee',
    `Although Dashy takes security seriously, no service can guarantee that a breach, outage, bug, unauthorized access event, or data loss incident will never occur. Users should maintain their own reasonable backup habits for important information and should avoid treating Dashy as a guaranteed substitute for dedicated archival, regulated records retention, or critical emergency storage systems.`,
  ],
  [
    'Retention Overview',
    `Dashy keeps personal information and user content for as long as reasonably needed to provide the service, maintain accounts, protect the platform, comply with law, and handle disputes or security issues. Retention periods can vary depending on whether the data relates to active use, deletion requests, backup cycles, moderation review, legal obligations, or unresolved platform-safety concerns.`,
  ],
  [
    'Retention While Accounts Are Active',
    `As a general matter, Dashy expects to keep account-linked content and settings while the account remains active and the user continues to use the service normally. This is because deleting that information during ordinary use would prevent Dashy from functioning as a persistent workspace product that saves and restores the user's ongoing work and preferences.`,
  ],
  [
    'Inactive Account Deletion',
    `Dashy states that accounts inactive for approximately one year may be deleted by the service, subject to operational timing, backup cycles, security review, dispute preservation, or legal obligations that may require some data to remain longer. This should not be read as an exact promise that deletion will occur on the first possible day after one calendar year of inactivity.`,
  ],
  [
    'Deletion and Backup Exceptions',
    `Even after a deletion event or account removal decision, Dashy may retain limited records where reasonably necessary for backup rotation, abuse prevention, fraud detection, legal compliance, enforcement of Terms, dispute handling, or protection of user and platform safety. Dashy aims not to keep more than is reasonably needed for those purposes, but immediate universal erasure may not always be possible.`,
  ],
  [
    'User Control Over Content',
    `Dashy gives users meaningful control over what they create, upload, keep, or remove inside the service to the extent the current product supports those actions. Because Dashy is a workspace tool, a large part of the information processed by Dashy comes directly from user choices about what content to create, how to organize it, and whether to keep or remove it over time.`,
  ],
  [
    'Requests for Access, Correction, or Deletion',
    `Users may contact Dashy using the listed contact details to request access to their data, correction of inaccurate information, or deletion of information where deletion is available and not blocked by legitimate retention needs. Dashy may request information needed to verify identity before acting on a request, especially where the request could expose or remove account-linked data.`,
  ],
  [
    'General Privacy Rights',
    `Dashy seeks to respect common privacy rights principles such as the right to know what data is processed, the right to request correction, the right to request deletion where appropriate, and the right to ask questions about how information is handled. The exact scope of these rights may depend on the user's location and the law that applies to the request.`,
  ],
  [
    'GDPR-Style Rights',
    `For users in jurisdictions that provide GDPR-style rights, Dashy intends to respect applicable rights such as access, rectification, erasure, restriction, objection, portability, and the ability to lodge a complaint with a competent supervisory authority. Some rights are not absolute, and Dashy may deny or limit a request where lawful grounds exist, but Dashy intends to review such requests in good faith.`,
  ],
  [
    'CCPA-Style Rights',
    `For users in California or similar jurisdictions that provide CCPA- or CPRA-style rights, Dashy states that it does not sell personal information and does not use personal information for cross-context behavioral advertising as described above. Dashy also intends to respect eligible requests to know, access, delete, correct, or receive equal service without unlawful discrimination for exercising applicable privacy rights.`,
  ],
  [
    'No Discrimination for Privacy Requests',
    `Dashy does not intend to discriminate against users for making a legitimate privacy request in good faith. That said, some service functionality may depend on certain information being available, so if a user asks Dashy to delete or stop using information that is essential to account operation, Dashy may need to explain that some features or access can no longer continue in the same form.`,
  ],
  [
    'Children and Family Use',
    `Dashy is intended for general audiences and may be used by younger people as an organizational tool where local law and family supervision make that appropriate. If a child or minor uses Dashy in a jurisdiction that requires parental or guardian involvement, the responsible adult should review the service use, the content being stored, and the privacy implications of account-based digital tools.`,
  ],
  [
    'Sensitive Data Caution',
    `Dashy does not ask users to treat the service as a dedicated repository for sensitive categories of data such as health records, legal secrets, financial account numbers, government-issued identifiers, or other highly regulated information. If users choose to upload highly sensitive material anyway, they do so at their own risk and should carefully assess whether the service is appropriate for that purpose.`,
  ],
  [
    'User Choice and Content Minimization',
    `Because much of the information stored in Dashy comes directly from user-created content, users can often reduce privacy risk by limiting what they upload and by avoiding unnecessary inclusion of other people's personal data. Dashy encourages users to exercise judgment and minimize sensitive information in workspace content unless there is a clear reason to store that information.`,
  ],
  [
    'No Current Public Publishing by Default',
    `Dashy does not currently describe its live product as a broad public publishing platform where user workspaces are openly exposed by default. The absence of broad public publishing should not be read as a guarantee against all risk, but it does mean this policy is written around a personal-workspace model rather than a general social-media broadcast model.`,
  ],
  [
    'Future Sharing or Collaboration Features',
    `If Dashy later launches collaboration, shared workspaces, comments, public links, or other visibility-changing features, Dashy may publish additional explanations about who can access shared content, what permissions exist, and how those features change data exposure. Until such features are clearly launched, users should rely on the current product behavior rather than roadmap references or future plans.`,
  ],
  [
    'Legal and Government Requests',
    `Dashy may disclose or preserve information if Dashy reasonably believes the disclosure or preservation is necessary to comply with law, respond to valid legal process, protect rights, investigate abuse, or address urgent safety risks. Where appropriate and lawful, Dashy may seek to narrow requests, but Dashy cannot promise that user notice will be possible in every case.`,
  ],
  [
    'Business Changes',
    `If Dashy undergoes a merger, acquisition, restructuring, financing, or asset transfer, personal information may be part of the assets or operational records considered in that process. If such an event occurs, Dashy expects any successor or transferee handling user information to do so subject to applicable law and to the commitments or updated notices presented to users.`,
  ],
  [
    'Incident Response',
    `If Dashy becomes aware of a security incident affecting personal information, Dashy may investigate, contain, document, and respond to the issue using internal review and technical support from relevant providers. Dashy may also notify affected users or authorities when required by law or when Dashy determines that notice is reasonably appropriate under the circumstances.`,
  ],
  [
    'Changes to This Privacy Policy',
    `Dashy may update this Privacy Policy as the service, law, infrastructure, or product features change. When Dashy publishes an updated version, the revised policy will apply from the effective date shown on the page, and users should review the policy from time to time so they remain informed about the current privacy practices that apply to the service.`,
  ],
  [
    'Notice of Material Privacy Changes',
    `For material changes that significantly affect how Dashy uses or discloses personal information, Dashy may choose to provide additional notice through the website, account interface, or other reasonable communication channels. Dashy is not required to use one particular notification method in every case, but Dashy aims to make important changes reasonably visible before or when they take effect.`,
  ],
  [
    'How to Contact Dashy About Privacy',
    `Privacy questions, access requests, deletion requests, correction requests, complaints, or other data-related inquiries may be sent to anmolshrii54@gmail.com as the primary contact and to pranjalshrivastav5@gmail.com as an alternate contact. Users may also use the listed WhatsApp contact number for general outreach, but sensitive credentials or secrets should not be sent through informal messaging channels.`,
  ],
];

export const termsSections = buildSections('terms', termsEntries);
export const privacySections = buildSections('privacy', privacyEntries);
