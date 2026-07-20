import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/layout";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import { initAnalytics, trackPageView } from "@/lib/analytics";
import { ErrorBoundary } from "@/components/shared/error-boundary";

// Pages
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import DigitalConsulting from "@/pages/services/digital-consulting";
import CryptoP2P from "@/pages/services/crypto-p2p";
import WebDevelopment from "@/pages/services/web-development";
import CommunityService from "@/pages/services/community";
import Projects from "@/pages/projects";
import ProjectDetail from "@/pages/project-detail";
import Contact from "@/pages/contact";
import Ledger from "@/pages/ledger";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function CommunityRedirect() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    // Scroll to community if possible or let contact page handle hash scroll
    setLocation("/contact#community");
  }, [setLocation]);
  return null;
}

function AnalyticsTracker() {
  const [location] = useLocation();

  useEffect(() => {
    trackPageView(location);
  }, [location]);

  return null;
}

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/services/digital-consulting" component={DigitalConsulting} />
        <Route path="/services/crypto-p2p" component={CryptoP2P} />
        <Route path="/services/web-development" component={WebDevelopment} />
        <Route path="/services/community" component={CommunityService} />
        <Route path="/projects" component={Projects} />
        <Route path="/projects/:id" component={ProjectDetail} />
        <Route path="/community" component={CommunityRedirect} />
        <Route path="/contact" component={Contact} />
        <Route path="/ledger" component={Ledger} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AnalyticsTracker />
          <ScrollToTop />
          <Layout>
            <ErrorBoundary><Router /></ErrorBoundary>
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;