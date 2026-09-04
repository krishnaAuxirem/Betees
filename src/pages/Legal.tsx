export const PrivacyPolicy = () => (
  <div className="animate-fade-in">
    <div className="bg-charcoal py-12">
      <div className="section-container text-center">
        <h1 className="font-display text-4xl text-white">Privacy Policy</h1>
        <p className="text-gray-400 mt-2">Last updated: September 4, 2026</p>
      </div>
    </div>
    <div className="section-container py-12 max-w-3xl mx-auto space-y-8">
      {[
        { title: "Information We Collect", content: "We collect information you provide directly to us — including name, email, mobile number, body measurements, style preferences, and transaction data. We also automatically collect device data, browsing behavior on our platform, and AI interaction history to improve your personalized experience." },
        { title: "How We Use Your Data", content: "Your data powers our AI Stylist, size recommendations, and personalized product curation. We use anonymized, aggregated data for platform analytics and trend intelligence. We do not sell your personal data to third parties." },
        { title: "AI & Body Measurement Data", content: "Body measurements and 3D scan data you provide are stored securely with AES-256 encryption. This data is used exclusively for fit recommendations and is never shared with external parties without your explicit consent." },
        { title: "Data Security", content: "All sensitive data is encrypted in transit (TLS 1.3) and at rest. Payment information is processed by PCI-DSS certified gateways and never stored on our servers." },
        { title: "Your Rights", content: "You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact privacy@betees.com. We will respond within 30 days." },
        { title: "Contact", content: "For privacy concerns, contact our Data Protection Officer at: privacy@betees.com or Betees Inc., Bandra Kurla Complex, Mumbai 400051." },
      ].map((section) => (
        <div key={section.title}>
          <h2 className="font-display text-xl text-charcoal mb-3">{section.title}</h2>
          <p className="text-on-surface-variant leading-relaxed text-sm">{section.content}</p>
        </div>
      ))}
    </div>
  </div>
);

export const Terms = () => (
  <div className="animate-fade-in">
    <div className="bg-charcoal py-12">
      <div className="section-container text-center">
        <h1 className="font-display text-4xl text-white">Terms & Conditions</h1>
        <p className="text-gray-400 mt-2">Last updated: September 4, 2026</p>
      </div>
    </div>
    <div className="section-container py-12 max-w-3xl mx-auto space-y-8">
      {[
        { title: "Acceptance of Terms", content: "By accessing or using Betees, you agree to be bound by these Terms. If you disagree with any part, you may not access the service." },
        { title: "User Accounts", content: "You are responsible for maintaining the security of your account. Betees is not liable for any loss or damage from your failure to comply with this security obligation." },
        { title: "Products & Services", content: "Product descriptions, pricing, and availability are subject to change without notice. We reserve the right to refuse service, cancel orders, or limit quantities at our discretion." },
        { title: "Returns & Refunds", content: "Ready-to-wear products may be returned within 15 days. Custom and bespoke orders are non-returnable unless defective. Full refund policy details are available in our Help Center." },
        { title: "Intellectual Property", content: "All content on Betees — including AI-generated style recommendations, design assets, and platform code — is the exclusive property of Betees Inc. and protected by Indian and international copyright law." },
        { title: "Governing Law", content: "These terms are governed by the laws of the Republic of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra." },
      ].map((section) => (
        <div key={section.title}>
          <h2 className="font-display text-xl text-charcoal mb-3">{section.title}</h2>
          <p className="text-on-surface-variant leading-relaxed text-sm">{section.content}</p>
        </div>
      ))}
    </div>
  </div>
);
