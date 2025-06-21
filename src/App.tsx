
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import BrowseEquipment from "./pages/BrowseEquipment";
import ListEquipment from "./pages/ListEquipment";
import Help from "./pages/Help";
import HowItWorksPage from "./pages/HowItWorksPage";
import UserDashboard from "./pages/UserDashboard";
import RenterDashboard from "./pages/RenterDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import MyListings from "./pages/user/MyListings";
import Messages from "./pages/user/Messages";
import Wallet from "./pages/user/Wallet";
import Transactions from "./pages/user/Transactions";
import Calendar from "./pages/user/Calendar";
import AccountSettings from "./pages/user/AccountSettings";
import KYCVerification from "./pages/user/KYCVerification";
import Notifications from "./pages/user/Notifications";
import UserManagement from "./pages/admin/UserManagement";
import EquipmentOversight from "./pages/admin/EquipmentOversight";
import ReportsIssues from "./pages/admin/ReportsIssues";
import SystemAnalytics from "./pages/admin/SystemAnalytics";
import Logs from "./pages/admin/Logs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/browse" element={<BrowseEquipment />} />
          <Route path="/list-equipment" element={<ListEquipment />} />
          <Route path="/help" element={<Help />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/renter-dashboard" element={<RenterDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/account/settings" element={<AccountSettings />} />
          <Route path="/account/kyc-verification" element={<KYCVerification />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="/admin/equipment-oversight" element={<EquipmentOversight />} />
          <Route path="/admin/reports-issues" element={<ReportsIssues />} />
          <Route path="/admin/system-analytics" element={<SystemAnalytics />} />
          <Route path="/admin/logs" element={<Logs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
