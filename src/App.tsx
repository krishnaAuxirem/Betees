import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { BackToTop } from "@/components/layout/BackToTop";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomerLayout } from "@/components/layout/CustomerLayout";
import { DesignerLayout } from "@/components/layout/DesignerLayout";
import { BrandLayout } from "@/components/layout/BrandLayout";
import { CreatorLayout } from "@/components/layout/CreatorLayout";
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
import { CreatorProfile } from "@/pages/CreatorProfile";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { FAQ } from "@/pages/FAQ";
import { VirtualTryOn } from "@/pages/VirtualTryOn";
import { CustomStudio } from "@/pages/CustomStudio";
import { Trends } from "@/pages/Trends";
import { PrivacyPolicy, Terms } from "@/pages/Legal";
import { Blog } from "@/pages/blog";
import { BlogDetails } from "@/pages/BlogDetails";

// Customer Dashboard pages
import { CustomerDashboard } from "@/pages/dashboard/customer/CustomerDashboard";
import { FashionProfile } from "@/pages/dashboard/customer/FashionProfile";
import { CustomerMarketplace } from "@/pages/dashboard/customer/CustomerMarketplace";
import { CustomerWishlist } from "@/pages/dashboard/customer/CustomerWishlist";
import { CartCheckout } from "@/pages/dashboard/customer/CartCheckout";
import { Orders } from "@/pages/dashboard/customer/Orders";
import { CustomerAIStylist } from "@/pages/dashboard/customer/CustomerAIStylist";
import { SizeAssistant } from "@/pages/dashboard/customer/SizeAssistant";
import { CustomerTryOn } from "@/pages/dashboard/customer/CustomerTryOn";
import { DigitalWardrobe } from "@/pages/dashboard/customer/DigitalWardrobe";
import { OutfitBuilder } from "@/pages/dashboard/customer/OutfitBuilder";
import { CustomerCustomStudio } from "@/pages/dashboard/customer/CustomerCustomStudio";
import { CustomerDesigners } from "@/pages/dashboard/customer/CustomerDesigners";
import { FashionDiscovery } from "@/pages/dashboard/customer/FashionDiscovery";
import { CustomerCommunity } from "@/pages/dashboard/customer/CustomerCommunity";
import { CustomerReviews } from "@/pages/dashboard/customer/CustomerReviews";
import { CustomerOffers } from "@/pages/dashboard/customer/CustomerOffers";
import { CustomerNotifications } from "@/pages/dashboard/customer/CustomerNotifications";
import { Settings as CustomerSettings } from "@/pages/dashboard/customer/Settings";

// Designer Dashboard pages
import { DesignerDashboard } from "@/pages/dashboard/designer/DesignerDashboard";
import { DesignerPortfolio } from "@/pages/dashboard/designer/DesignerPortfolio";
import { DesignerRequests } from "@/pages/dashboard/designer/DesignerRequests";
import { DesignerOrders } from "@/pages/dashboard/designer/DesignerOrders";
import { DesignerMessages } from "@/pages/dashboard/designer/DesignerMessages";
import { DesignerCustomers } from "@/pages/dashboard/designer/DesignerCustomers";
import { DesignerReviews } from "@/pages/dashboard/designer/DesignerReviews";
import { DesignerEarnings } from "@/pages/dashboard/designer/DesignerEarnings";
import { DesignerAnalytics } from "@/pages/dashboard/designer/DesignerAnalytics";
import { DesignerSettings } from "@/pages/dashboard/designer/DesignerSettings";

// Brand Dashboard pages
import { BrandOverview } from "@/pages/dashboard/brand/BrandOverview";
import { BrandStore } from "@/pages/dashboard/brand/BrandStore";
import { BrandProducts } from "@/pages/dashboard/brand/BrandProducts";
import { BrandInventory } from "@/pages/dashboard/brand/BrandInventory";
import { BrandPricing } from "@/pages/dashboard/brand/BrandPricing";
import { BrandDiscounts } from "@/pages/dashboard/brand/BrandDiscounts";
import { BrandOrders } from "@/pages/dashboard/brand/BrandOrders";
import { BrandCustomers } from "@/pages/dashboard/brand/BrandCustomers";
import { BrandMessages } from "@/pages/dashboard/brand/BrandMessages";
import { BrandShipping } from "@/pages/dashboard/brand/BrandShipping";
import { BrandAnalytics } from "@/pages/dashboard/brand/BrandAnalytics";
import { BrandReports } from "@/pages/dashboard/brand/BrandReports";
import { BrandTrends } from "@/pages/dashboard/brand/BrandTrends";
import { BrandSettings } from "@/pages/dashboard/brand/BrandSettings";

// Creator Dashboard pages
import { CreatorOverview } from "@/pages/dashboard/creator/CreatorOverview";
import { CreatorContent } from "@/pages/dashboard/creator/CreatorContent";
import { CreatorRequests } from "@/pages/dashboard/creator/CreatorRequests";
import { CreatorCollaborations } from "@/pages/dashboard/creator/CreatorCollaborations";
import { CreatorCampaigns } from "@/pages/dashboard/creator/CreatorCampaigns";
import { CreatorMessages } from "@/pages/dashboard/creator/CreatorMessages";
import { CreatorFollowers } from "@/pages/dashboard/creator/CreatorFollowers";
import { CreatorAnalytics } from "@/pages/dashboard/creator/CreatorAnalytics";
import { CreatorEarnings } from "@/pages/dashboard/creator/CreatorEarnings";
import { CreatorSettings } from "@/pages/dashboard/creator/CreatorSettings";

// Admin Dashboard pages
import { AdminDashboard } from "@/pages/dashboard/admin/AdminDashboard";
import { AdminUsers } from "@/pages/dashboard/admin/AdminUsers";
import { AdminVerification } from "@/pages/dashboard/admin/AdminVerification";
import { AdminProducts } from "@/pages/dashboard/admin/AdminProducts";
import { AdminOrders } from "@/pages/dashboard/admin/AdminOrders";
import { AdminPayments } from "@/pages/dashboard/admin/AdminPayments";
import { AdminDisputes } from "@/pages/dashboard/admin/AdminDisputes";
import { AdminAnalytics } from "@/pages/dashboard/admin/AdminAnalytics";
import { AdminBlog } from "@/pages/dashboard/admin/AdminBlog";
import { AdminSettings } from "@/pages/dashboard/admin/AdminSettings";

// Public page wrapper
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    {children}
    <Footer />
    <BackToTop />
  </>
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
        <Route path="/creator/:id" element={<PublicLayout><CreatorProfile /></PublicLayout>} />
        <Route path="/trends" element={<PublicLayout><Trends /></PublicLayout>} />
        <Route path="/community" element={<PublicLayout><Community /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
        <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
        <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
        <Route path="/blog/:slug" element={<PublicLayout><BlogDetails /></PublicLayout>} />

        {/* ================================================================= */}
        {/* CUSTOMER DASHBOARD (Role: customer)                               */}
        {/* ================================================================= */}
        <Route path="/dashboard/customer" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><CustomerDashboard /></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/fashion-profile" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><FashionProfile /></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/marketplace" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><CustomerMarketplace /></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/wishlist" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><CustomerWishlist /></CustomerLayout>
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
        <Route path="/dashboard/customer/ai-stylist" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><CustomerAIStylist /></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/size-assistant" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><SizeAssistant /></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/try-on" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><CustomerTryOn /></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/wardrobe" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><DigitalWardrobe /></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/outfit-builder" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><OutfitBuilder /></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/custom-studio" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><CustomerCustomStudio /></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/designers" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><CustomerDesigners /></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/discover" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><FashionDiscovery /></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/community" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><CustomerCommunity /></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/reviews" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><CustomerReviews /></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/offers" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><CustomerOffers /></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/notifications" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><CustomerNotifications /></CustomerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customer/settings" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayout><CustomerSettings /></CustomerLayout>
          </ProtectedRoute>
        } />

        {/* ================================================================= */}
        {/* DESIGNER / TAILOR DASHBOARD (Role: designer, tailor)              */}
        {/* ================================================================= */}
        <Route path="/dashboard/designer" element={
          <ProtectedRoute allowedRoles={["designer", "tailor"]}>
            <DesignerLayout><DesignerDashboard /></DesignerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/designer/portfolio" element={
          <ProtectedRoute allowedRoles={["designer", "tailor"]}>
            <DesignerLayout><DesignerPortfolio /></DesignerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/designer/requests" element={
          <ProtectedRoute allowedRoles={["designer", "tailor"]}>
            <DesignerLayout><DesignerRequests /></DesignerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/designer/orders" element={
          <ProtectedRoute allowedRoles={["designer", "tailor"]}>
            <DesignerLayout><DesignerOrders /></DesignerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/designer/messages" element={
          <ProtectedRoute allowedRoles={["designer", "tailor"]}>
            <DesignerLayout><DesignerMessages /></DesignerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/designer/customers" element={
          <ProtectedRoute allowedRoles={["designer", "tailor"]}>
            <DesignerLayout><DesignerCustomers /></DesignerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/designer/reviews" element={
          <ProtectedRoute allowedRoles={["designer", "tailor"]}>
            <DesignerLayout><DesignerReviews /></DesignerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/designer/earnings" element={
          <ProtectedRoute allowedRoles={["designer", "tailor"]}>
            <DesignerLayout><DesignerEarnings /></DesignerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/designer/analytics" element={
          <ProtectedRoute allowedRoles={["designer", "tailor"]}>
            <DesignerLayout><DesignerAnalytics /></DesignerLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/designer/settings" element={
          <ProtectedRoute allowedRoles={["designer", "tailor"]}>
            <DesignerLayout><DesignerSettings /></DesignerLayout>
          </ProtectedRoute>
        } />

        {/* ================================================================= */}
        {/* FASHION BRAND DASHBOARD (Role: brand)                             */}
        {/* ================================================================= */}
        <Route path="/dashboard/brand" element={
          <ProtectedRoute allowedRoles={["brand"]}>
            <BrandLayout><BrandOverview /></BrandLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/brand/store" element={
          <ProtectedRoute allowedRoles={["brand"]}>
            <BrandLayout><BrandStore /></BrandLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/brand/products" element={
          <ProtectedRoute allowedRoles={["brand"]}>
            <BrandLayout><BrandProducts /></BrandLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/brand/inventory" element={
          <ProtectedRoute allowedRoles={["brand"]}>
            <BrandLayout><BrandInventory /></BrandLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/brand/pricing" element={
          <ProtectedRoute allowedRoles={["brand"]}>
            <BrandLayout><BrandPricing /></BrandLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/brand/discounts" element={
          <ProtectedRoute allowedRoles={["brand"]}>
            <BrandLayout><BrandDiscounts /></BrandLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/brand/orders" element={
          <ProtectedRoute allowedRoles={["brand"]}>
            <BrandLayout><BrandOrders /></BrandLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/brand/customers" element={
          <ProtectedRoute allowedRoles={["brand"]}>
            <BrandLayout><BrandCustomers /></BrandLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/brand/messages" element={
          <ProtectedRoute allowedRoles={["brand"]}>
            <BrandLayout><BrandMessages /></BrandLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/brand/shipping" element={
          <ProtectedRoute allowedRoles={["brand"]}>
            <BrandLayout><BrandShipping /></BrandLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/brand/analytics" element={
          <ProtectedRoute allowedRoles={["brand"]}>
            <BrandLayout><BrandAnalytics /></BrandLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/brand/reports" element={
          <ProtectedRoute allowedRoles={["brand"]}>
            <BrandLayout><BrandReports /></BrandLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/brand/trends" element={
          <ProtectedRoute allowedRoles={["brand"]}>
            <BrandLayout><BrandTrends /></BrandLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/brand/settings" element={
          <ProtectedRoute allowedRoles={["brand"]}>
            <BrandLayout><BrandSettings /></BrandLayout>
          </ProtectedRoute>
        } />

        {/* ================================================================= */}
        {/* CREATOR / INFLUENCER DASHBOARD (Role: creator)                    */}
        {/* ================================================================= */}
        <Route path="/dashboard/creator" element={
          <ProtectedRoute allowedRoles={["creator"]}>
            <CreatorLayout><CreatorOverview /></CreatorLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/creator/content" element={
          <ProtectedRoute allowedRoles={["creator"]}>
            <CreatorLayout><CreatorContent /></CreatorLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/creator/requests" element={
          <ProtectedRoute allowedRoles={["creator"]}>
            <CreatorLayout><CreatorRequests /></CreatorLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/creator/collaborations" element={
          <ProtectedRoute allowedRoles={["creator"]}>
            <CreatorLayout><CreatorCollaborations /></CreatorLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/creator/campaigns" element={
          <ProtectedRoute allowedRoles={["creator"]}>
            <CreatorLayout><CreatorCampaigns /></CreatorLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/creator/messages" element={
          <ProtectedRoute allowedRoles={["creator"]}>
            <CreatorLayout><CreatorMessages /></CreatorLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/creator/followers" element={
          <ProtectedRoute allowedRoles={["creator"]}>
            <CreatorLayout><CreatorFollowers /></CreatorLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/creator/analytics" element={
          <ProtectedRoute allowedRoles={["creator"]}>
            <CreatorLayout><CreatorAnalytics /></CreatorLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/creator/earnings" element={
          <ProtectedRoute allowedRoles={["creator"]}>
            <CreatorLayout><CreatorEarnings /></CreatorLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/creator/settings" element={
          <ProtectedRoute allowedRoles={["creator"]}>
            <CreatorLayout><CreatorSettings /></CreatorLayout>
          </ProtectedRoute>
        } />

        {/* ================================================================= */}
        {/* ADMIN DASHBOARD (Role: admin)                                     */}
        {/* ================================================================= */}
        <Route path="/dashboard/admin" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout><AdminDashboard /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin/users" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout><AdminUsers /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin/verification" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout><AdminVerification /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin/products" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout><AdminProducts /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin/orders" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout><AdminOrders /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin/payments" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout><AdminPayments /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin/disputes" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout><AdminDisputes /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin/analytics" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout><AdminAnalytics /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin/blog" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout><AdminBlog /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/admin/settings" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout><AdminSettings /></AdminLayout>
          </ProtectedRoute>
        } />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
