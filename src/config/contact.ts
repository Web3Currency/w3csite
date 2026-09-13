export interface ContactConfig {
  phoneNumber?: string;
  phoneNumberFormatted?: string;
  whatsappNumber: string;
  whatsappUrl: string;
  whatsappCommunityUrl: string;
  email: string;
  website: string;
  twitter: string;
  twitterUrl: string;
  telegram: string;
  telegramUrl: string;
  linkedin?: string;
  linkedinUrl?: string;
  businessHours: string;
  officeName: string;
}

export const contact: ContactConfig = {
  phoneNumber: "+2347032754611",
  phoneNumberFormatted: "+234 703 275 4611",
  whatsappNumber: "2348149625496",
  whatsappUrl: "https://wa.me/2348149625496",
  whatsappCommunityUrl: "https://chat.whatsapp.com/EUEkJYcfSYB3aJuBSERi5N?s=cl&p=a&ilr=1&amv=2",
  email: "w3cdigitalnetwork@gmail.com",
  website: "https://ais-pre-wucefvxndodqpeeyarkx2k-7697597563.europe-west1.run.app", // Fallback URL / relative
  twitter: "@Web3CurrencyNG",
  twitterUrl: "https://x.com/Web3CurrencyNG",
  telegram: "@Web3CurrencyNG",
  telegramUrl: "https://t.me/Web3CurrencyNG",
  businessHours: "Monday - Sunday, 24/7 Support & Trades",
  officeName: "W3C Communication Hub"
};
