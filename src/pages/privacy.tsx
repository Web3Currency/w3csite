import React from "react";
import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { Shield, Clock, Mail } from "lucide-react";

export default function Privacy() {
  return (
    <PageTransition>
      <SEO 
        title="Privacy Policy - W3C Digital Network" 
        description="Your privacy matters. Learn how W3C Digital Network and Jake handle and protect your personal information."
        path="/privacy"
      />
      
      <section className="py-20 md:py-28 bg-black min-h-screen relative overflow-hidden">
        {/* Ambient background glows */}
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
              <span>Last updated: July 2026</span>
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
                W3C Digital Network is an independent digital business operated by Jake, providing services including:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                <li>Digital Consulting</li>
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
                <li>Your name</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>Messages or enquiries</li>
                <li>Business information relevant to your project</li>
                <li>Cryptocurrency wallet addresses</li>
                <li>Bank account details for W3C DESK transactions</li>
              </ul>
              <p className="mt-2">
                You only provide this information when you choose to contact me or use one of my services.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">3. Website Analytics</h2>
              <p>
                This website may collect limited technical information automatically, including:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                <li>Browser type</li>
                <li>Device information</li>
                <li>Pages visited</li>
                <li>General location based on IP address</li>
                <li>Website performance data</li>
              </ul>
              <p className="mt-2">
                This information is used to improve the website, monitor performance, and maintain security. It is not used to personally identify visitors.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">4. How Your Information Is Used</h2>
              <p>
                Information you provide may be used to:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                <li>Respond to enquiries</li>
                <li>Deliver consulting services</li>
                <li>Build and support websites</li>
                <li>Coordinate W3C DESK transactions</li>
                <li>Communicate project updates</li>
                <li>Improve services</li>
                <li>Maintain business records where appropriate</li>
              </ul>
              <p className="mt-2">
                Your information is never sold or rented to third parties.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">5. W3C DESK Transactions</h2>
              <p>
                If you use W3C DESK, additional information may be required to complete your transaction, including:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                <li>Bank account details</li>
                <li>Public wallet addresses</li>
                <li>Transaction references</li>
              </ul>
              <p className="mt-2">
                Transaction records may be retained for operational, accounting, compliance, and security purposes.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">6. WhatsApp & Third-Party Platforms</h2>
              <p>
                Many services are delivered through WhatsApp.
              </p>
              <p>
                By contacting W3C Digital Network through WhatsApp, Telegram, email, or other third-party platforms, you also agree to the privacy practices and terms of those respective platforms.
              </p>
              <p>
                W3C Digital Network is not responsible for how third-party services collect or process your information.
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
                <a href="mailto:web3currency.info@gmail.com" className="font-mono text-white hover:underline">
                  web3currency.info@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
