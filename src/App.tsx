import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { BackToTop } from "@/components/layout/BackToTop";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { DesignerLayout } from "@/components/layout/DesignerLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

// Public pages
import { Home } from "@/pages/Home";
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";
import { Shop } from "@/pages/Shop";
import { ProductDetail } from "@/pages/ProductDetail";
import { AIStylist } from "@/pages/AIStylist";
import { Discover } from "@/pages/Discover";
import { Designers } from "@/pages/Designers";
import { Community } from "@/pages/Community";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { FAQ } from "@/pages/FAQ";
import { VirtualTryOn } from "@/pages/VirtualTryOn";
import { CustomStudio } from "@/pages/CustomStudio";
import { Trends } from "@/pages/Trends";
import { PrivacyPolicy, Terms } from "@/pages/Legal";

// Customer Dashboard pages
import { CustomerDashboard } from "@/pages/dashboard/customer/CustomerDashboard";
import { CartCheckout } from "@/pages/dashboard/customer/CartCheckout";
import { Orders } from "@/pages/dashboard/customer/Orders";
import { Settings } from "@/pages/dashboard/customer/Settings";

// Designer/Admin Dashboard pages
import { DesignerDashboard } from "@/pages/dashboard/designer/DesignerDashboard";
import { AdminDashboard } from "@/pages/dashboard/admin/AdminDashboard";

// Simple page wrapper for public routes
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    {children}
    <Footer />
    <BackToTop />
  </>
);

// Simple stub page
const SimplePage = ({ title }: { title: string }) => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="text-center">
      <h1 className="font-display text-3xl text-charcoal">{title}</h1>
      <p className="text-on-surface-variant mt-2">This section is coming soon.</p>
    </div>
  </div>
);

const NotFound = () => (
  <PublicLayout>
    <div className="min-h-[70vh] flex items-center justify-center text-center">
      <div className="space-y-4">
        <p className="font-display text-8xl font-bold text-charcoal">404</p>
        <h1 className="font-display text-3xl text-charcoal">Page Not Found</h1>
        <p className="text-on-surface-variant">The page you're looking for doesn't exist.</p>
        <a href="/" className="btn-primary inline-flex">Return Home</a>
      </div>
    </div>
  </PublicLayout>
);

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<PublicLayout><SimplePage title="Forgot Password" /></PublicLayout>} />

        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/discover" element={<PublicLayout><Discover /></PublicLayout>} />
        <Route path="/shop" element={<PublicLayout><Shop /></PublicLayout>} />
        <Route path="/shop/:category" element={<PublicLayout><Shop /></PublicLayout>} />
        <Route path="/product/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
        <Route path="/ai-stylist" element={<PublicLayout><AIStylist /></PublicLayout>} />
        <Route path="/virtual-try-on" element={<PublicLayout><VirtualTryOn /></PublicLayout>} />
        <Route path="/custom-studio" element={<PublicLayout><CustomStudio /></PublicLayout>} />
        <Route path="/designers" element={<PublicLayout><Designers /></PublicLayout>} />
        <Route path="/designers/:id" element={<PublicLayout><Designers /></PublicLayout>} />
        <Route path="/tailors" element={<PublicLayout><Designers /></PublicLayout>} />
        <Route path="/creators" element={<PublicLayout><Community /></PublicLayout>} />
        <Route path="/trends" element={<PublicLayout><Trends /></PublicLayout>} />
        <Route path="/community" element={<PublicLayout><Community /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
        <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
        <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />

        {/* Customer Dashboard */}
        <Route path="/dashboard/customer" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><CustomerDashboard /></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/marketplace" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><PublicLayout><Shop /></PublicLayout></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/cart" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><CartCheckout /></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/orders" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><Orders /></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/wishlist" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><div className="p-8"><h1 className="font-display text-2xl text-charcoal mb-6">My Wishlist</h1><SimplePage title="Wishlist" /></div></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/wardrobe" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><div className="p-8"><h1 className="font-display text-2xl text-charcoal mb-6">Digital Wardrobe</h1><SimplePage title="Digital Wardrobe" /></div></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/size-assistant" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><div className="p-8"><h1 className="font-display text-2xl text-charcoal mb-6">Smart Size & Fit Assistant</h1><SimplePage title="Size Assistant" /></div></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/notifications" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><div className="p-8"><h1 className="font-display text-2xl text-charcoal mb-6">Notifications</h1></div></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/offers" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><div className="p-8"><h1 className="font-display text-2xl text-charcoal mb-6">Offers & Loyalty</h1></div></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/settings" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><Settings /></CustomerLayout>
          </ProtectedRoute>
        } />

        {/* Designer/Tailor Dashboard */}
        <Route path="/dashboard/designer" element={
          <ProtectedRoute allowedRoles={["designer", "tailor"]}>
            <DesignerLayout><DesignerDashboard /></DesignerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/designer/*" element={
          <ProtectedRoute allowedRoles={["designer", "tailor"]}>
            <DesignerLayout><div className="p-8"><SimplePage title="Designer Studio" /></div></DesignerLayout>
          </ProtectedRoute>
        } />

        {/* Brand Dashboard */}
        <Route path="/dashboard/brand" element={
          <ProtectedRoute allowedRoles={["brand"]}>
            <AdminLayout><AdminDashboard /></AdminLayout>
          </ProtectedRoute>
        } />

        {/* Creator Dashboard */}
        <Route path="/dashboard/creator" element={
          <ProtectedRoute allowedRoles={["creator"]}>
            <DesignerLayout><div className="p-8"><h1 className="font-display text-2xl text-charcoal mb-4">Creator Studio</h1><DesignerDashboard /></div></DesignerLayout>
          </ProtectedRoute>
        } />

        {/* Admin Dashboard */}
        <Route path="/dashboard/admin" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout><AdminDashboard /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin/*" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout><div className="p-8"><SimplePage title="Admin Panel" /></div></AdminLayout>
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
