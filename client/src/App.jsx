import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Providers
import { ContactFormProvider } from "./context/ContactFormContext";

// Import Layouts and Pages
import Layout from "./components/Layout";
import CrmLayout from "./components/crm/CrmLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ContactsPage from "./pages/ContactsPage";
import DealsPage from "./pages/DealsPage";
import ContactDetailPage from "./pages/ContactDetailPage"; // Import the new page
import PrivateRoute from "./components/routing/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ContactFormProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes with main header */}
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/project/:projectId" element={<ProjectDetailPage />} />
            </Route>

            {/* Auth Routes without any layout */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected CRM Routes with the CRM Layout */}
            <Route element={<PrivateRoute />}>
              <Route element={<CrmLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/contacts/:contactId" element={<ContactDetailPage />} />
                <Route path="/deals" element={<DealsPage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ContactFormProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;