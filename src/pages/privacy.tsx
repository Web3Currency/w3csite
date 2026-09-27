import React from "react";
import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { Shield, Clock, Mail } from "lucide-react";

export default function Privacy() {
  const privacySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - W3C Digital Network",
    "description": "Privacy Policy for W3C Digital Network, including website analytics, service enquiries, W3C DESK transaction information, and third-party communication channels.",
    "url": "https://web3currency.online/privacy",
    "isPartOf": { "@type": "WebSite", "name": branding.businessName, "url": "https://web3currency.online" },
    "about": { "@type": "Organization", "name": branding.businessName, "url": "https://web3currency.online" },
    "dateModified": "2026-09-27"
  };

  return (
    <PageTransition>
      <SEO
        title="Privacy Policy - W3C Digital Network"
        description="Your privacy matters. Learn how W3C Digital Network and Jake handle and protect your personal information."
        path="/privacy"
      />

      <section className="py-20 md:py-28 bg-black min-h-screen relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f97316]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="site-container relative z-10">
          <div className="space-y-4 text-center sm:text-left mb-12 border-b border-white/[0.08] pb-10">
            <div className="flex items-center gap-2 justify-center sm:justify-start text-[#f97316] font-mono text-xs font-bold tracking-widest uppercase">
              <Shield className="w-4 h-4" />
              <span>Legal Framework</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight">
              Privacy Policy
            </h1>
            <div className="flex items-center gap-2 justify-center sm:justify-start text-xs text-white/50 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>Last updated: September 2026</span>
            </div>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl">
              W3C Digital Network is committed to respecting your privacy and handling your information responsibly. This policy explains what information may be collected when you use this website or interact with our services.
            </p>
          </div>

          <div className="space-y-8 text-white/80 leading-relaxed text-sm sm:text-base text-left">
            <div className="p-5 rounded-2xl border border-[#f97316]/20 bg-[#f97316]/[0.02] space-y-2">
              <h3 className="font-display font-bold text-white text-base">Your Privacy Matters</h3>
              <p className="text-sm text-white/70">
                W3C Digital Network is committed to respecting your privacy and handling your information responsibly. This Privacy Policy explains what information may be collected when you use this website or interact with my services, how that information is used, and the choices available to you.
              </p>
              <p className="text-sm text-white/70">
                By using this website or contacting me through any of the available channels, you agree to the practices described below.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">1. Who We Are</h2>
              <p>
                W3C Digital Network is an independent digital business operated by Jake and registered in Nigeria as W3C Digital Network (CAC RC 9579098). It provides services including:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                <li>Digital Solutions</li>
                <li>Website Design & Development</li>
                <li>W3C DESK (Crypto P2P)</li>
                <li>Web3 Community & Learning</li>
              </ul>
              <p className="mt-2">
                Most services are coordinated directly through WhatsApp, which serves as my primary digital office.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">2. Information You May Share</h2>
              <p>
                Depending on how you interact with W3C Digital Network, you may choose to provide information such as:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                <li>Your name, phone number, or email address when you choose to contact me</li>
                <li>Messages, enquiries, or other information you choose to send</li>
                <li>Business information relevant to a project</li>
                <li>Cryptocurrency wallet addresses and bank account details when required for W3C DESK transactions</li>
              </ul>
              <p className="mt-2">
                The website&apos;s website-project questionnaire does not ask for your name, phone number, email address, bank details, wallet address, or other personal information. It only asks predefined questions about what you need, the purpose and goal of the website, your available content, and when you would like to start.
              </p>
              <p className="mt-2">
                When you complete that questionnaire, your selected answers are used to prepare a message that you can choose to send through WhatsApp, Telegram, or email. The questionnaire itself does not submit the answers to a W3C database.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">3. Website Analytics</h2>
              <p>
                This website may use analytics and website-performance tools, depending on the current configuration of the site. These tools may collect technical and usage information such as:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                <li>Pages visited and page navigation</li>
                <li>Browser, device, and technical information</li>
                <li>Website performance and interaction data</li>
                <li>General information associated with website visits, as provided by the analytics services</li>
              </ul>
              <p className="mt-2">
                The website code currently supports Google Analytics 4 and Microsoft Clarity. Where enabled, Google Analytics may receive page views and selected interaction events, including contact-link clicks and W3C DESK calculator activity. Microsoft Clarity may collect website interaction and session-recording data.
              </p>
              <p className="mt-2">
                These tools are used to understand how the website is used, improve services, monitor performance, and maintain security. Their collection and processing are also subject to the privacy practices of the respective providers.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">4. How Your Information Is Used</h2>
              <p>
                Information you provide may be used to:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                <li>Respond to enquiries</li>
                <li>Deliver Digital Solutions services</li>
                <li>Build and support websites</li>
                <li>Coordinate W3C DESK transactions</li>
                <li>Communicate project updates</li>
                <li>Improve services and website experience</li>
                <li>Maintain business records where appropriate</li>
              </ul>
              <p className="mt-2">
                Information is not sold or rented to third parties. Some information may be processed through third-party platforms when you choose to communicate with W3C through those platforms or when third-party services are used to operate and understand the website.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">5. W3C DESK Transactions</h2>
              <p>
                The W3C DESK request tool on this website asks for the information needed to prepare a trade request, including:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                <li>Whether you want to buy or sell crypto</li>
                <li>The crypto asset and amount</li>
                <li>Where the crypto is being sent from or received</li>
                <li>An optional note or explanation when you choose to provide one</li>
              </ul>
              <p className="mt-2">
                The website prepares this information for a WhatsApp request. It does not ask for bank account details or wallet addresses through the website questionnaire itself.
              </p>
              <p className="mt-2">
                During an actual W3C DESK transaction, additional information may be required to complete or verify the transaction, such as bank account details, public wallet addresses, transaction references, or verification information where applicable. Transaction records may be retained for operational, accounting, compliance, and security purposes.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">6. Contact Forms, WhatsApp & Third-Party Platforms</h2>
              <p>
                The website does not currently use a contact form that sends information to a W3C database. Contact buttons and service questionnaires direct you to WhatsApp, Telegram, or email, where you choose whether to continue the conversation.
              </p>
              <p>
                Many services are coordinated through WhatsApp. By contacting W3C Digital Network through WhatsApp, Telegram, email, or other third-party platforms, information you choose to share may also be processed by those platforms according to their own privacy practices and terms.
              </p>
              <p>
                W3C Digital Network does not control how third-party services collect or process information within their own platforms.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">7. Blockchain Transparency</h2>
              <p>
                Blockchain transactions are public by design.
              </p>
              <p>
                If you send or receive cryptocurrency, your wallet address and transaction history may remain permanently visible on the respective blockchain network.
              </p>
              <p>
                This information cannot be altered or removed by W3C Digital Network.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">8. Data Security</h2>
              <p>
                Reasonable measures are taken to protect the information shared with W3C Digital Network.
              </p>
              <p>
                However, no online system can guarantee absolute security, and users should always exercise appropriate caution when sharing information online.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">9. Your Choices</h2>
              <p>
                You may request to:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                <li>Access information you have shared</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of information that can legally be removed from internal records</li>
              </ul>
              <p className="mt-2">
                This does not apply to public blockchain data or information that must be retained for legal or accounting purposes.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">10. Changes to This Policy</h2>
              <p>
                This Privacy Policy may be updated from time to time as W3C Digital Network grows or as legal and operational requirements change.
              </p>
              <p>
                The latest version will always be published on this website.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">11. Contact</h2>
              <p>
                If you have questions about this Privacy Policy or how your information is handled, you can contact me through any of the official channels listed on the Contact page.
              </p>
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center gap-3 mt-2 w-fit">
                <Mail className="w-5 h-5 text-[#f97316]" />
                <a href="mailto:w3cdigitalnetwork@gmail.com" className="font-mono text-white hover:underline">
                  w3cdigitalnetwork@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
