import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import { LicenseProvider, useLicense } from './contexts/LicenseContext';
import { LicenseBarrier } from './components/LicenseBarrier';
import SecretAdminKeyGen from './pages/SecretAdminKeyGen';

// Wrapper component to handle conditional rendering
const AppContent = () => {
  const { isLicensed } = useLicense();
  const path = window.location.pathname;

  // Allow access to the secret admin page regardless of license status
  if (path === '/admin-secret-access-v1') {
    return <SecretAdminKeyGen />;
  }

  // Global blocking removed to allow granular control in pages
  // if (!isLicensed) {
  //   return <LicenseBarrier />;
  // }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <LanguageProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin-secret-access-v1" element={<SecretAdminKeyGen />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LanguageProvider>
        <Toaster />
        <Sonner />
      </div>
    </BrowserRouter >
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LicenseProvider>
        <AppContent />
      </LicenseProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
