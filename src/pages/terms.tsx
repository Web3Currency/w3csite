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
        
        <div className="site-container relative z-10">
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
              <span>Last updated: September 2026</span>
            </div>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl">
              Please read these Terms of Service carefully before using W3C Digital Network services or joining our WhatsApp-based community.
            </p>
          </div>

          <div className="space-y-8 text-white/80 leading-relaxed text-sm sm:text-base text-left">
            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">1. Acceptance of Terms</h2>
              <p>
                By accessing this website, joining the W3C Community on WhatsApp, or executing transactions with our P2P Desk, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">2. Description of Services</h2>
              <p>
                W3C Digital Network provides informational content, Digital Solutions, web design & software engineering, and peer-to-peer (P2P) cryptocurrency conversion services ("the Services"). All community interaction and active desk operations are run over WhatsApp, whereas this website serves primarily as an introductory digital front.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">3. W3C DESK Transaction Process</h2>
              <p>
                W3C DESK transactions are handled directly with the customer. The transaction rate and details are agreed before the customer sends any funds or cryptocurrency. The customer always sends first: customers buying cryptocurrency send the agreed fiat payment first, while customers selling cryptocurrency send the agreed cryptocurrency first.
              </p>

              <div className="space-y-4">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                  <h3 className="font-semibold text-white">When buying cryptocurrency</h3>
                  <ol className="list-decimal pl-5 mt-3 space-y-2 text-white/70">
                    <li>The customer and W3C agree on the cryptocurrency, amount, rate, and transaction details.</li>
                    <li>The customer sends the agreed fiat payment to the official W3C payment account.</li>
                    <li>Once the payment is confirmed, W3C releases the cryptocurrency to the customer's confirmed wallet address.</li>
                    <li>Subject to the agreed transaction limit and normal processing conditions, the cryptocurrency is usually released within 10–15 minutes after payment confirmation.</li>
                  </ol>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                  <h3 className="font-semibold text-white">When selling cryptocurrency</h3>
                  <ol className="list-decimal pl-5 mt-3 space-y-2 text-white/70">
                    <li>The customer and W3C agree on the cryptocurrency, amount, rate, and transaction details.</li>
                    <li>The customer sends the agreed cryptocurrency to the W3C wallet address provided for the transaction.</li>
                    <li>Once the cryptocurrency transfer is confirmed, W3C sends the agreed fiat amount to the customer's confirmed bank account.</li>
                    <li>Subject to the agreed transaction limit and normal processing conditions, the customer's bank account is usually credited within 10–15 minutes after the cryptocurrency transfer is confirmed.</li>
                  </ol>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-white">Rates and charges</h3>
                <p>
                  W3C DESK does not publish a fixed service fee because charges may vary by transaction. The applicable rate and total amount are confirmed with the customer before the transaction is executed. For cryptocurrency purchases, the quoted rate includes the applicable W3C service charge and network or gas cost for sending the cryptocurrency. For cryptocurrency sales, the quoted rate includes the applicable W3C service charge. Any applicable charge is therefore reflected in the agreed rate rather than presented as a separate fixed fee.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-white">Customer verification</h3>
                <p>
                  W3C DESK is primarily used by members of the W3C community, and routine identity verification is not normally required for every transaction. For larger transactions or where additional verification is considered necessary, W3C may request a valid government-issued ID, preferably the customer's NIN, to confirm that the customer's identity matches the bank account details provided. W3C may also request a video call with the customer for additional identity confirmation.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-white">Incorrect or mismatched transaction details</h3>
                <p>
                  A transaction will not be completed until the relevant payment, bank, or wallet details are confirmed. Customers are responsible for providing accurate details. For wallet transfers, especially for new customers, W3C may ask the customer to confirm the wallet address by sending a screenshot directly from the receiving platform or providing the wallet address barcode before the cryptocurrency is released. If any transaction detail does not match or cannot be sufficiently confirmed, the transaction may be paused until the correct details are verified.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">4. Blockchain Irreversibility</h2>
              <p>
                You acknowledge and accept that digital asset and blockchain transactions are fully irreversible. Once a transfer is executed on-chain, it cannot be refunded, reversed, or cancelled. Public addresses and transaction details are permanently written into decentralized public ledgers.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">5. Business Registration & CAC Information</h2>
              <p>
                W3C Digital Network is the official business name operated by W3C. The business is registered with the Corporate Affairs Commission (CAC) in Nigeria.
              </p>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-white/40">Official business name</span>
                    <span className="text-white font-medium">W3C Digital Network</span>
                  </div>
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-white/40">CAC registration number</span>
                    <span className="text-white font-medium">RC 9579098</span>
                  </div>
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-white/40">Registration type</span>
                    <span className="text-white font-medium">Business Name</span>
                  </div>
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-white/40">Nature of business</span>
                    <span className="text-white font-medium">Information Service Activities</span>
                  </div>
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-white/40">CAC registration date</span>
                    <span className="text-white font-medium">29 May 2026</span>
                  </div>
                </div>
              </div>
              <p>
                W3C's community and operating history predates the CAC registration. The W3C community officially began in 2025, when the brand and its activities were already operating. On 29 May 2026, W3C Digital Network was formally registered with the CAC under the business name shown above. The 2025 date therefore refers to the start of W3C's community and operating timeline, while 29 May 2026 refers to the formal CAC registration.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">6. Official W3C Payment Account</h2>
              <p>
                For W3C DESK transactions, the following is the official W3C payment account used for customer fiat payments. The same account is used when customers pay W3C to buy cryptocurrency and when W3C pays customers who sell cryptocurrency to W3C.
              </p>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-white/40">Bank</span>
                    <span className="text-white font-medium">OPay Digital Services Ltd</span>
                  </div>
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-white/40">Account name</span>
                    <span className="text-white font-medium">W3C Digital Network</span>
                  </div>
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-white/40">Account number</span>
                    <span className="text-white font-medium">7032754611</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-[#f97316]/20 bg-[#f97316]/5 p-5">
                <p className="text-white font-medium">Important payment security notice</p>
                <p className="mt-2 text-white/70">
                  Payments sent to any other bank account, account name, or payment destination are not W3C payments. Before sending money, verify that the payment details match the official details published here and the transaction instructions confirmed directly by W3C. W3C will not ask customers to send funds to an unofficial account.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">7. Limitation of Liability</h2>
              <p>
                Under no circumstances shall W3C Digital Network, Web3 Currency, or its founder JAKE be liable for any indirect, incidental, special, or consequential damages resulting from network congestion, system failures, third-party wallet exploits, or blockchain software bugs.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">8. Governing Law</h2>
              <p>
                These Terms of Service are governed by and construed in accordance with the corporate guidelines of Nigeria, and you irrevocably submit to the exclusive jurisdiction of the competent courts in that territory.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-white">9. Contact Details</h2>
              <p>
                For further clarification or legal inquiries, reach out to us at:
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
