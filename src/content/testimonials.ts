export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatarUrl?: string;
  statement: string;
  serviceUsed: "W3C DESK" | "Website Development" | "Digital Consulting";
  rating: number; // e.g. 5
}

export const testimonials: Testimonial[] = [
  {
    id: "testi-1",
    name: "Dave O.",
    role: "Crypto P2P Client",
    statement: "I've traded through W3C DESK several times now, and every transaction has been smooth from start to finish. The communication is clear, the rates are fair, and I always know exactly what to expect.",
    serviceUsed: "W3C DESK",
    rating: 5
  },
  {
    id: "testi-2",
    name: "Adewale E.",
    role: "Founder",
    company: "GoldMarineGroup",
    statement: "Working with Jake made the whole process easy. He understood what we wanted, delivered a clean website, and was always available whenever we needed adjustments. It felt more like working with a partner than hiring a developer.",
    serviceUsed: "Website Development",
    rating: 5
  },
  {
    id: "testi-3",
    name: "Mike",
    role: "W3C Community Member",
    statement: "I was exploring different Web3 opportunities but wasn't sure which ones were worth my time. Jake helped me understand the space, avoid common mistakes, and focus on opportunities that actually matched my goals.",
    serviceUsed: "Digital Consulting",
    rating: 5
  }
];

