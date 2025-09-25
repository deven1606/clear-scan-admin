import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Users from './pages/Users.jsx';
import AddUser from './pages/AddUser.jsx';
import EditUser from './pages/EditUser.jsx';
import MRIServices from './pages/MRIServices.jsx';
import AddMRIService from './pages/AddMRIService.jsx';
import EditMRIService from './pages/EditMRIService.jsx';
import Settings from './pages/Settings.jsx';

// New pages for comprehensive admin features
import BookingsManagement from './pages/BookingsManagement.jsx';
import PendingBookings from './pages/PendingBookings.jsx';
import ApprovedBookings from './pages/ApprovedBookings.jsx';
import CancelledBookings from './pages/CancelledBookings.jsx';
import PatientData from './pages/PatientData.jsx';
import ServiceCategories from './pages/ServiceCategories.jsx';
import SlotManagement from './pages/SlotManagement.jsx';
import WorkingHours from './pages/WorkingHours.jsx';
import Holidays from './pages/Holidays.jsx';
import PromoCodes from './pages/PromoCodes.jsx';
import CreatePromoCode from './pages/CreatePromoCode.jsx';
import PromoAnalytics from './pages/PromoAnalytics.jsx';
import ReportUpload from './pages/ReportUpload.jsx';
import SentReports from './pages/SentReports.jsx';
import EmailTemplates from './pages/EmailTemplates.jsx';
import ContentManagement from './pages/ContentManagement.jsx';
import HomeContent from './pages/HomeContent.jsx';
import AboutContent from './pages/AboutContent.jsx';
import ContactContent from './pages/ContactContent.jsx';
import PoliciesContent from './pages/PoliciesContent.jsx';
import SEOManagement from './pages/SEOManagement.jsx';
import MetaTags from './pages/MetaTags.jsx';
import GoogleSearchConsole from './pages/GoogleSearchConsole.jsx';
import Sitemap from './pages/Sitemap.jsx';
import Statistics from './pages/Statistics.jsx';
import MonthlyReports from './pages/MonthlyReports.jsx';
import ExportData from './pages/ExportData.jsx';
import Analytics from './pages/Analytics.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Bookings Management Routes */}
          <Route path="bookings" element={<BookingsManagement />} />
          <Route path="bookings/pending" element={<PendingBookings />} />
          <Route path="bookings/approved" element={<ApprovedBookings />} />
          <Route path="bookings/cancelled" element={<CancelledBookings />} />
          
          {/* User Management Routes */}
          <Route path="users" element={<Users />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/edit/:id" element={<EditUser />} />
          <Route path="users/patients" element={<PatientData />} />
          
          {/* Service Management Routes */}
          <Route path="mri-services" element={<MRIServices />} />
          <Route path="mri-services/add" element={<AddMRIService />} />
          <Route path="mri-services/edit/:id" element={<EditMRIService />} />
          <Route path="mri-services/categories" element={<ServiceCategories />} />
          
          {/* Slot Management Routes */}
          <Route path="slots" element={<SlotManagement />} />
          <Route path="slots/hours" element={<WorkingHours />} />
          <Route path="slots/holidays" element={<Holidays />} />
          
          {/* Promo Codes Routes */}
          <Route path="promo-codes" element={<PromoCodes />} />
          <Route path="promo-codes/create" element={<CreatePromoCode />} />
          <Route path="promo-codes/analytics" element={<PromoAnalytics />} />
          
          {/* Reports & Delivery Routes */}
          <Route path="reports" element={<ReportUpload />} />
          <Route path="reports/upload" element={<ReportUpload />} />
          <Route path="reports/sent" element={<SentReports />} />
          <Route path="reports/templates" element={<EmailTemplates />} />
          
          {/* Content Management Routes */}
          <Route path="content" element={<ContentManagement />} />
          <Route path="content/home" element={<HomeContent />} />
          <Route path="content/about" element={<AboutContent />} />
          <Route path="content/contact" element={<ContactContent />} />
          <Route path="content/policies" element={<PoliciesContent />} />
          
          {/* SEO Management Routes */}
          <Route path="seo" element={<SEOManagement />} />
          <Route path="seo/meta" element={<MetaTags />} />
          <Route path="seo/console" element={<GoogleSearchConsole />} />
          <Route path="seo/sitemap" element={<Sitemap />} />
          
          {/* Statistics & Export Routes */}
          <Route path="statistics" element={<Statistics />} />
          <Route path="statistics/monthly" element={<MonthlyReports />} />
          <Route path="statistics/export" element={<ExportData />} />
          <Route path="statistics/analytics" element={<Analytics />} />
          
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
