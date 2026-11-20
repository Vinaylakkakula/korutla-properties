import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './context/ToastContext';

// Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const BuyPage = lazy(() => import('./pages/BuyPage'));
const RentPage = lazy(() => import('./pages/RentPage'));
const ApartmentsPage = lazy(() => import('./pages/ApartmentsPage'));
const PlotsPage = lazy(() => import('./pages/PlotsPage'));
const CommercialPage = lazy(() => import('./pages/CommercialPage'));
const FarmLandPage = lazy(() => import('./pages/FarmLandPage'));
const PropertyDetailPage = lazy(() => import('./pages/PropertyDetailPage'));
const SellPage = lazy(() => import('./pages/SellPage'));
const SavedPage = lazy(() => import('./pages/SavedPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const MapSearchPage = lazy(() => import('./pages/MapSearchPage'));
const AgentProfilePage = lazy(() => import('./pages/AgentProfilePage'));
const ScheduleVisitPage = lazy(() => import('./pages/ScheduleVisitPage'));
const LocationsPage = lazy(() => import('./pages/LocationsPage'));
const CityPage = lazy(() => import('./pages/CityPage'));

// Auth Pages
const SignInPage = lazy(() => import('./pages/auth/SignInPage'));
const SignUpPage = lazy(() => import('./pages/auth/SignUpPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));

// Dashboard Pages
const DashboardLayout = lazy(() => import('./pages/dashboard/DashboardLayout'));
const DashboardOverview = lazy(() => import('./pages/dashboard/DashboardOverview'));
const DashboardProperties = lazy(() => import('./pages/dashboard/DashboardProperties'));
const DashboardSaved = lazy(() => import('./pages/dashboard/DashboardSaved'));
const DashboardInquiries = lazy(() => import('./pages/dashboard/DashboardInquiries'));
const DashboardVisits = lazy(() => import('./pages/dashboard/DashboardVisits'));
const DashboardMessages = lazy(() => import('./pages/dashboard/DashboardMessages'));
const DashboardProfile = lazy(() => import('./pages/dashboard/DashboardProfile'));
const DashboardSettings = lazy(() => import('./pages/dashboard/DashboardSettings'));

// Admin Pages
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminOverview = lazy(() => import('./pages/admin/AdminOverview'));
const AdminProperties = lazy(() => import('./pages/admin/AdminProperties'));
const AdminAreas = lazy(() => import('./pages/admin/AdminAreas'));
const AdminInquiries = lazy(() => import('./pages/admin/AdminInquiries'));
const AdminVisits = lazy(() => import('./pages/admin/AdminVisits'));
const AdminAgents = lazy(() => import('./pages/admin/AdminAgents'));
const AdminNotifications = lazy(() => import('./pages/admin/AdminNotifications'));

// Loading Fallback
const PageLoader = () => (
  <div className="min-h-[70vh] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-forest/20 border-t-forest rounded-full animate-spin" />
  </div>
);

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <ToastProvider>
            <Layout>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Public Core Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/buy" element={<BuyPage />} />
                  <Route path="/rent" element={<RentPage />} />
                  <Route path="/apartments" element={<ApartmentsPage />} />
                  <Route path="/plots" element={<PlotsPage />} />
                  <Route path="/commercial" element={<CommercialPage />} />
                  <Route path="/farm-land" element={<FarmLandPage />} />
                  <Route path="/property/:id" element={<PropertyDetailPage />} />
                  <Route path="/sell" element={<SellPage />} />
                  <Route path="/saved" element={<SavedPage />} />
                  <Route path="/compare" element={<ComparePage />} />
                  <Route path="/map" element={<MapSearchPage />} />
                  <Route path="/agent/:id" element={<AgentProfilePage />} />
                  <Route path="/schedule-visit/:propertyId" element={<ScheduleVisitPage />} />
                  <Route path="/locations" element={<LocationsPage />} />
                  <Route path="/locations/:city" element={<CityPage />} />

                  {/* Auth Routes */}
                  <Route path="/signin" element={<SignInPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                  {/* Dashboard Nested Routes */}
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardOverview />} />
                    <Route path="properties" element={<DashboardProperties />} />
                    <Route path="saved" element={<DashboardSaved />} />
                    <Route path="inquiries" element={<DashboardInquiries />} />
                    <Route path="visits" element={<DashboardVisits />} />
                    <Route path="messages" element={<DashboardMessages />} />
                    <Route path="profile" element={<DashboardProfile />} />
                    <Route path="settings" element={<DashboardSettings />} />
                  </Route>

                  {/* Admin Auth Route */}
                  <Route path="/admin/login" element={<AdminLoginPage />} />

                  {/* Admin Operations Hub */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminOverview />} />
                    <Route path="properties" element={<AdminProperties />} />
                    <Route path="areas" element={<AdminAreas />} />
                    <Route path="inquiries" element={<AdminInquiries />} />
                    <Route path="visits" element={<AdminVisits />} />
                    <Route path="agents" element={<AdminAgents />} />
                    <Route path="notifications" element={<AdminNotifications />} />
                  </Route>

                  {/* Catch-all redirect */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </Layout>
          </ToastProvider>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
