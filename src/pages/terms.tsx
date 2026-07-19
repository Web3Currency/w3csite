import React from "react";
import { SEO } from "@/components/shared/seo";
import { PageTransition } from "@/components/shared/page-transition";
import { Scale, Clock, Mail } from "lucide-react";
import { branding } from "@/config/branding";

export default function Terms() {
  return (
    <PageTransition>
      <SEO 
        title="Terms of Service - W3C Digital Network" 
        description="Review the terms, rules, and guidelines for using W3C Digital Network services and participating in our Web3 and P2P community."
        path="/terms"
      />
      
      <section className="py-20 md:py-28 bg-black min-h-screen relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f97316]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container max-w-3xl mx-auto px-6 relative z-10">
          <div className="space-y-4 text-center sm:text-left mb-12 border-b border-white/[0.08] pb-10">
            <div className="flex items-center gap-2 justify-center sm:justify-start text-[#f97316] font-mono text-xs font-bold tracking-widest uppercase">
              <Scale className="w-4 h-4" />
              <span>Legal Framework</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight">
              Terms of Service
            </h1>
            <div className="flex items-center gap-2 justify-center sm:justify-start text-xs text-white/50 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>Last updated: March 2025</span>
            </div>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl">
              Please read these Terms of Service carefully before using W3C Digital Network services or joining our WhatsApp-based community.
            </p>
          </div>

          <div className="space-y-8 text-white/80 leading-relaxed text-sm sm:text-base text-left">
            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">1. Acceptance of Terms</h2>
              <p>
                By accessing this website, joining the Web3 Currency WhatsApp community, or executing transactions with our P2P Desk, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">2. Description of Services</h2>
              <p>
                W3C Digital Network provides informational content, digital consulting, web design & software engineering, and peer-to-peer (P2P) cryptocurrency conversion services ("the Services"). All community interaction and active desk operations are run over WhatsApp, whereas this website serves primarily as an introductory digital front.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">3. P2P Transaction Terms</h2>
              <p>
                When transacting through the W3C DESK P2P system:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-white/70">
                <li>You acknowledge that all digital transactions are completed directly with our desk coordinator, JAKE.</li>
                <li>You are solely responsible for providing accurate bank details and blockchain wallet addresses. W3C Digital Network is not liable for assets lost due to incorrect details provided by the client.</li>
                <li>All rates and fee terms are settled and agreed upon in the WhatsApp conversation prior to executing any bank or block transfers.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">4. Blockchain Irreversibility</h2>
              <p>
                You acknowledge and accept that digital asset and blockchain transactions are fully irreversible. Once a transfer is executed on-chain, it cannot be refunded, reversed, or cancelled. Public addresses and transaction details are permanently written into decentralized public ledgers.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">5. Registration & Corporate Entity</h2>
              <p>
                W3C Digital Network is an officially registered and incorporated business entity in Nigeria ({branding.cacStatus}, {branding.rcNumber}). We operate within local corporate boundaries, ensuring strict transaction verification, zero-dispute track records, and clean fiat settlement pathways.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">6. Limitation of Liability</h2>
              <p>
                Under no circumstances shall W3C Digital Network, Web3 Currency, or its founder JAKE be liable for any indirect, incidental, special, or consequential damages resulting from network congestion, system failures, third-party wallet exploits, or blockchain software bugs.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">7. Governing Law</h2>
              <p>
                These Terms of Service are governed by and construed in accordance with the corporate guidelines of Nigeria, and you irrevocably submit to the exclusive jurisdiction of the competent courts in that territory.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">8. Contact Details</h2>
              <p>
                For further clarification or legal inquiries, reach out to us at:
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
