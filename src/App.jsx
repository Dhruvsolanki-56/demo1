import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import PublicLayout from "./components/PublicLayout";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import { PRIVACY_POLICY_HTML, TERMS_CONDITIONS_HTML, DISCLAIMER_HTML } from "./data/siteContent";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const GlobalPresence = lazy(() => import("./pages/GlobalPresence"));
const WhyChooseStrikar = lazy(() => import("./pages/WhyChooseStrikar"));
const WhyPartner = lazy(() => import("./pages/WhyPartner"));
const StrategicAlliances = lazy(() => import("./pages/StrategicAlliances"));

const BusinessDivisions = lazy(() => import("./pages/BusinessDivisions"));
const PharmaceuticalManufacturing = lazy(() => import("./pages/PharmaceuticalManufacturing"));
const NutraceuticalManufacturing = lazy(() => import("./pages/NutraceuticalManufacturing"));
const HospitalHealthcareSolutions = lazy(() => import("./pages/HospitalHealthcareSolutions"));
const EmergencySupplyPatientAccess = lazy(() => import("./pages/EmergencySupplyPatientAccess"));
const PersonalHygieneConsumerCare = lazy(() => import("./pages/PersonalHygieneConsumerCare"));

const Services = lazy(() => import("./pages/Services"));
const ManufacturingSolutions = lazy(() => import("./pages/ManufacturingSolutions"));
const HealthcareAccessSolutions = lazy(() => import("./pages/HealthcareAccessSolutions"));
const HealthcareInstitutionalSolutions = lazy(() => import("./pages/HealthcareInstitutionalSolutions"));
const Partnership = lazy(() => import("./pages/Partnership"));

const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const ProductPortfolio = lazy(() => import("./pages/ProductPortfolio"));
const HighSurveillanceMarkets = lazy(() => import("./pages/HighSurveillanceMarkets"));
const NutraceuticalProducts = lazy(() => import("./pages/NutraceuticalProducts"));
const TherapeuticAreas = lazy(() => import("./pages/TherapeuticAreas"));
const TherapeuticAreaDetail = lazy(() => import("./pages/TherapeuticAreaDetail"));

const Quality = lazy(() => import("./pages/Quality"));
const CertificationsStandards = lazy(() => import("./pages/CertificationsStandards"));
const ManufacturingInfrastructure = lazy(() => import("./pages/ManufacturingInfrastructure"));
const RegulatoryAffairs = lazy(() => import("./pages/RegulatoryAffairs"));

const Contact = lazy(() => import("./pages/Contact"));
const RequestQuote = lazy(() => import("./pages/RequestQuote"));
const InquiryCenter = lazy(() => import("./pages/InquiryCenter"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Maintenance = lazy(() => import("./pages/Maintenance"));

const AdminLogin = lazy(() => import("./admin/Login"));
const AdminForgotPassword = lazy(() => import("./admin/ForgotPassword"));
const Dashboard = lazy(() => import("./admin/Dashboard"));
const AdminAnalytics = lazy(() => import("./admin/Analytics"));
const AdminProducts = lazy(() => import("./admin/Products"));
const AdminProductForm = lazy(() => import("./admin/ProductForm"));
const AdminRfqs = lazy(() => import("./admin/Rfqs"));
const AdminRfqDetail = lazy(() => import("./admin/RfqDetail"));
const AdminEnquiries = lazy(() => import("./admin/Enquiries"));
const AdminEnquiryDetail = lazy(() => import("./admin/EnquiryDetail"));
const AdminSiteSettings = lazy(() => import("./admin/SiteSettings"));
const AdminActivityLog = lazy(() => import("./admin/ActivityLog"));
const AdminProfile = lazy(() => import("./admin/Profile"));
const AdminUsers = lazy(() => import("./admin/AdminUsers"));

function PageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center" role="status" aria-label="Loading">
      <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-primary-100 border-t-primary-600" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

const MAINTENANCE_MODE = import.meta.env.VITE_MAINTENANCE_MODE === "true";

export default function App() {
  const location = useLocation();

  if (MAINTENANCE_MODE && !location.pathname.startsWith("/admin")) {
    return (
      <Suspense fallback={<PageFallback />}>
        <Maintenance />
      </Suspense>
    );
  }

  return (
    <ErrorBoundary resetKey={location.pathname}>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />
            <Route path="/about/global-presence" element={<GlobalPresence />} />
            <Route path="/about/why-choose-strikar" element={<WhyChooseStrikar />} />
            <Route path="/about/why-partner" element={<WhyPartner />} />
            <Route path="/about/strategic-alliances" element={<StrategicAlliances />} />

            <Route path="/business-divisions" element={<BusinessDivisions />} />
            <Route path="/business-divisions/pharmaceutical-manufacturing" element={<PharmaceuticalManufacturing />} />
            <Route path="/business-divisions/nutraceutical-manufacturing" element={<NutraceuticalManufacturing />} />
            <Route path="/business-divisions/hospital-healthcare-medical-solutions" element={<HospitalHealthcareSolutions />} />
            <Route path="/business-divisions/emergency-supply-patient-access" element={<EmergencySupplyPatientAccess />} />
            <Route path="/business-divisions/personal-hygiene-consumer-care" element={<PersonalHygieneConsumerCare />} />

            <Route path="/services" element={<Services />} />
            <Route path="/services/manufacturing-solutions" element={<ManufacturingSolutions />} />
            <Route path="/services/healthcare-access-solutions" element={<HealthcareAccessSolutions />} />
            <Route path="/services/healthcare-institutional-solutions" element={<HealthcareInstitutionalSolutions />} />
            <Route path="/partnership" element={<Partnership />} />

            <Route path="/product-portfolio" element={<ProductPortfolio />} />
            <Route path="/product-portfolio/high-surveillance-regulatory-markets" element={<HighSurveillanceMarkets />} />
            <Route path="/product-portfolio/nutraceutical-products" element={<NutraceuticalProducts />} />
            <Route path="/therapeutic-areas" element={<TherapeuticAreas />} />
            <Route path="/therapeutic-areas/:slug" element={<TherapeuticAreaDetail />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />

            <Route path="/quality" element={<Quality />} />
            <Route path="/quality/certifications-standards" element={<CertificationsStandards />} />
            <Route path="/quality/manufacturing-infrastructure" element={<ManufacturingInfrastructure />} />
            <Route path="/quality/regulatory-affairs-market-access" element={<RegulatoryAffairs />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/request-quote" element={<RequestQuote />} />
            <Route path="/inquiry-center" element={<InquiryCenter />} />
            <Route path="/privacy-policy" element={<LegalPage html={PRIVACY_POLICY_HTML} title="Privacy Policy" />} />
            <Route path="/terms-conditions" element={<LegalPage html={TERMS_CONDITIONS_HTML} title="Terms & Conditions" />} />
            <Route path="/disclaimer" element={<LegalPage html={DISCLAIMER_HTML} title="Disclaimer" />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/new" element={<AdminProductForm />} />
              <Route path="products/:id/edit" element={<AdminProductForm />} />
              <Route path="rfqs" element={<AdminRfqs />} />
              <Route path="rfqs/:id" element={<AdminRfqDetail />} />
              <Route path="enquiries" element={<AdminEnquiries />} />
              <Route path="enquiries/:id" element={<AdminEnquiryDetail />} />
              <Route path="settings" element={<AdminSiteSettings />} />
              <Route path="activity-log" element={<AdminActivityLog />} />
              <Route path="admin-users" element={<AdminUsers />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
