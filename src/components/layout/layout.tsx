import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black flex flex-col font-sans">
      <Navbar />
      <div className="flex-1 flex flex-col pt-20">
        {children}
      </div>
      <Footer />
    </div>
  );
}