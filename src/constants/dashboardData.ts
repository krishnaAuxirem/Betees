import { PRODUCTS, DESIGNERS } from "./data";

export interface VerificationItem {
  id: string;
  name: string;
  entityType: "Brand" | "Designer" | "Tailor" | "Creator";
  appliedDate: string;
  docsStatus: "Complete" | "Pending ID" | "Under Review";
  gstNumber?: string;
  panNumber?: string;
  idProofUrl?: string;
  portfolioSamples: string[];
  email: string;
  phone: string;
  city: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
}

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: "customer" | "designer" | "tailor" | "brand" | "creator" | "admin";
  joinedDate: string;
  status: "active" | "suspended" | "pending";
  totalOrders: number;
  totalSpentOrEarned: number;
  city: string;
}

export interface DisputeItem {
  id: string;
  orderId: string;
  customerName: string;
  sellerName: string;
  issue: string;
  amount: number;
  status: "open" | "under_review" | "resolved" | "dismissed";
  openedDate: string;
  customerStatement: string;
  sellerStatement: string;
  evidenceImages: string[];
}

export interface PaymentTransaction {
  id: string;
  orderId: string;
  user: string;
  seller: string;
  amount: number;
  gateway: "Razorpay" | "UPI" | "Stripe" | "NetBanking";
  status: "success" | "refunded" | "failed";
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  coverImage: string;
  excerpt: string;
  content: string;
  publishedDate: string;
  status: "published" | "draft";
  views: number;
}

// Initial Admin Data
export const INITIAL_VERIFICATIONS: VerificationItem[] = [
  {
    id: "VER-101",
    name: "Kavya Textiles Pvt Ltd",
    entityType: "Brand",
    appliedDate: "Sep 3, 2026",
    docsStatus: "Complete",
    gstNumber: "27AAECK1234F1Z5",
    panNumber: "AAECK1234F",
    email: "contact@kavyatextiles.in",
    phone: "+91 98201 12345",
    city: "Surat, Gujarat",
    status: "pending",
    portfolioSamples: [
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4e83?w=600&h=800&fit=crop&q=80"
    ]
  },
  {
    id: "VER-102",
    name: "Ravi Bhandari Couture",
    entityType: "Designer",
    appliedDate: "Sep 2, 2026",
    docsStatus: "Pending ID",
    gstNumber: "08AABCB9876G1Z2",
    email: "ravi@bhandaricouture.com",
    phone: "+91 94140 55432",
    city: "Jaipur, Rajasthan",
    status: "pending",
    portfolioSamples: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=80"
    ]
  },
  {
    id: "VER-103",
    name: "Studio K Bespoke",
    entityType: "Tailor",
    appliedDate: "Sep 1, 2026",
    docsStatus: "Complete",
    panNumber: "BOPPM4521K",
    email: "studiok.tailors@gmail.com",
    phone: "+91 80234 98761",
    city: "Bengaluru, Karnataka",
    status: "pending",
    portfolioSamples: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80"
    ]
  },
  {
    id: "VER-104",
    name: "Ananya Roy Aesthetics",
    entityType: "Creator",
    appliedDate: "Aug 29, 2026",
    docsStatus: "Complete",
    email: "ananya@couturegram.com",
    phone: "+91 98110 44321",
    city: "Delhi NCR",
    status: "approved",
    portfolioSamples: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop&q=80"
    ]
  }
];

export const INITIAL_USERS: AdminUserItem[] = [
  { id: "USR-001", name: "Priya Sharma", email: "customer@betees.com", role: "customer", joinedDate: "Jan 15, 2026", status: "active", totalOrders: 24, totalSpentOrEarned: 248500, city: "Mumbai" },
  { id: "USR-002", name: "Arjun Kapoor", email: "designer@betees.com", role: "designer", joinedDate: "Feb 02, 2026", status: "active", totalOrders: 38, totalSpentOrEarned: 642000, city: "Delhi" },
  { id: "USR-003", name: "Suresh Nair", email: "tailor@betees.com", role: "tailor", joinedDate: "Feb 10, 2026", status: "active", totalOrders: 52, totalSpentOrEarned: 412000, city: "Kochi" },
  { id: "USR-004", name: "Vikram Mehta (Aurelia)", email: "brand@betees.com", role: "brand", joinedDate: "Jan 04, 2026", status: "active", totalOrders: 184, totalSpentOrEarned: 3850000, city: "Mumbai" },
  { id: "USR-005", name: "Neha Gupta", email: "creator@betees.com", role: "creator", joinedDate: "Mar 12, 2026", status: "active", totalOrders: 16, totalSpentOrEarned: 262000, city: "Bengaluru" },
  { id: "USR-006", name: "Admin User", email: "admin@betees.com", role: "admin", joinedDate: "Jan 01, 2026", status: "active", totalOrders: 0, totalSpentOrEarned: 0, city: "Mumbai" },
  { id: "USR-007", name: "Rohit Malhotra", email: "rohit.m@gmail.com", role: "customer", joinedDate: "Apr 18, 2026", status: "active", totalOrders: 7, totalSpentOrEarned: 94000, city: "Pune" },
  { id: "USR-008", name: "Zoya Fashion Studio", email: "zoya@fashion.in", role: "brand", joinedDate: "May 09, 2026", status: "suspended", totalOrders: 12, totalSpentOrEarned: 185000, city: "Jaipur" },
];

export const INITIAL_DISPUTES: DisputeItem[] = [
  {
    id: "#D-128",
    orderId: "#BT-7821",
    customerName: "Priya S.",
    sellerName: "Aurelia Couture",
    issue: "Wrong size delivered — Sleeve length off by 3 inches",
    amount: 18500,
    status: "open",
    openedDate: "Sep 3, 2026",
    customerStatement: "The sleeve length specified in my AI measurement profile was 24 inches, but the garment received measures 21 inches.",
    sellerStatement: "Pattern cutting followed standard 40R metrics. We are ready to alter free of charge or issue partial credit.",
    evidenceImages: ["https://images.unsplash.com/photo-1594938298603-c8148c4b4e83?w=600&h=800&fit=crop&q=80"]
  },
  {
    id: "#D-127",
    orderId: "#BT-7819",
    customerName: "Vikram M.",
    sellerName: "House of Rohit Bal",
    issue: "Late delivery — 5 days past agreed wedding date",
    amount: 35000,
    status: "resolved",
    openedDate: "Sep 1, 2026",
    customerStatement: "Courier delayed dispatch without notification. Needed for rehearsal dinner.",
    sellerStatement: "Custom hand zardozi detailing required 48 extra hours. Customer compensated with ₹5,000 store credit voucher.",
    evidenceImages: []
  },
  {
    id: "#D-126",
    orderId: "#BT-7810",
    customerName: "Sneha Patel",
    sellerName: "Atelier Vesper",
    issue: "Fabric shade variation from catalog preview",
    amount: 52000,
    status: "under_review",
    openedDate: "Aug 28, 2026",
    customerStatement: "Catalog displayed deep midnight charcoal, product received has distinctly grey cast.",
    sellerStatement: "Natural Biella wool dye lots have minor tone variations under daylight.",
    evidenceImages: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80"]
  }
];

export const INITIAL_PAYMENTS: PaymentTransaction[] = [
  { id: "TXN-9081", orderId: "#BT-7821", user: "Priya Sharma", seller: "Aurelia Couture", amount: 78500, gateway: "Razorpay", status: "success", date: "Sep 3, 2026 14:22" },
  { id: "TXN-9080", orderId: "#BT-7820", user: "Aryan Kapoor", seller: "Atelier Vesper", amount: 52000, gateway: "UPI", status: "success", date: "Sep 2, 2026 11:45" },
  { id: "TXN-9079", orderId: "#BT-7819", user: "Sneha Patel", seller: "House of Rohit Bal", amount: 145000, gateway: "NetBanking", status: "success", date: "Aug 30, 2026 19:10" },
  { id: "TXN-9078", orderId: "#BT-7816", user: "Karan Mehta", seller: "Maison Noir", amount: 38900, gateway: "Stripe", status: "refunded", date: "Aug 26, 2026 16:30" },
  { id: "TXN-9077", orderId: "#BT-7814", user: "Ishita Verma", seller: "Studio Cadence", amount: 24500, gateway: "UPI", status: "success", date: "Aug 24, 2026 09:15" },
  { id: "TXN-9076", orderId: "#BT-7812", user: "Mihir Shah", seller: "Aurelia Couture", amount: 18500, gateway: "Razorpay", status: "failed", date: "Aug 22, 2026 18:02" },
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "BLOG-1",
    title: "The Architecture of Milanese Canvassed Tailoring",
    slug: "milanese-canvassed-tailoring-architecture",
    category: "Couture Craft",
    author: "Matteo Moretti",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop&q=80",
    excerpt: "Why true floating horsehair chest pieces remain the gold standard in luxury menswear construction.",
    content: "True bespoke tailoring relies on internal architecture rather than surface adhesives...",
    publishedDate: "Sep 1, 2026",
    status: "published",
    views: 4820
  },
  {
    id: "BLOG-2",
    title: "How Betees AI Predicts Indian Bridal Trousseau Palettes",
    slug: "ai-bridal-trousseau-palettes",
    category: "AI & Innovation",
    author: "Priya Nair",
    coverImage: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=500&fit=crop&q=80",
    excerpt: "Calibrating undertones, heritage silks, and architectural drape with computer vision.",
    content: "Traditional bridal consultations often struggle with chromatic harmony under changing venue lights...",
    publishedDate: "Aug 25, 2026",
    status: "published",
    views: 8940
  },
  {
    id: "BLOG-3",
    title: "Autumn 2026 Fabric Forecast: Raw Tussar & Biella Wool",
    slug: "autumn-2026-fabric-forecast",
    category: "Trends",
    author: "Alistair Finch",
    coverImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&h=500&fit=crop&q=80",
    excerpt: "Sustainable weaves and structural silhouettes dominating luxury runways across Paris and Milan.",
    content: "The intersection of Indian handlooms and European suiting marks this autumn's definitive direction...",
    publishedDate: "Aug 18, 2026",
    status: "draft",
    views: 1240
  }
];

// Initial Designer / Tailor Data
export interface DesignerPortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number;
  description: string;
  tags: string[];
  likes: number;
  featured: boolean;
}

export const INITIAL_DESIGNER_PORTFOLIO: DesignerPortfolioItem[] = [
  {
    id: "DP-1",
    title: "Burgundy Hand-Canvassed Sherwani",
    category: "Bespoke Ethnic",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=800&fit=crop&q=80",
    price: 68000,
    description: "Pure tussar silk with hand-rolled burgundy piping and antique brass buttons.",
    tags: ["Sherwani", "Handloom", "Wedding"],
    likes: 184,
    featured: true
  },
  {
    id: "DP-2",
    title: "Double-Breasted Italian Wool Tuxedo",
    category: "Suits & Tuxedos",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80",
    price: 54000,
    description: "Biella super 150s wool with silk peak lapel and unlined breathable shoulder pad.",
    tags: ["Bespoke", "Tuxedo", "Italian Wool"],
    likes: 246,
    featured: true
  },
  {
    id: "DP-3",
    title: "Architectural Silk Draped Kurta",
    category: "Fusion Wear",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e83?w=600&h=800&fit=crop&q=80",
    price: 32000,
    description: "Asymmetric front placket with organic Belgian linen blend collar.",
    tags: ["Contemporary", "Silk Kurta"],
    likes: 98,
    featured: false
  },
  {
    id: "DP-4",
    title: "Royal Velvet Bundi Waistcoat",
    category: "Waistcoats",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=80",
    price: 28000,
    description: "Rich mulberry velvet with hand zardozi pocket square detailing.",
    tags: ["Festive", "Velvet", "Bundi"],
    likes: 142,
    featured: false
  }
];

export interface DesignerRequestItem {
  id: string;
  customer: string;
  email: string;
  item: string;
  budget: number;
  deadline: string;
  measurementsSummary: string;
  status: "pending" | "quoted" | "accepted" | "declined";
  date: string;
  notes: string;
}

export const INITIAL_DESIGNER_REQUESTS: DesignerRequestItem[] = [
  {
    id: "REQ-201",
    customer: "Riya Malhotra",
    email: "riya.m@gmail.com",
    item: "Bridal Zardozi Lehenga Blouse",
    budget: 80000,
    deadline: "Oct 15, 2026",
    measurementsSummary: "Chest: 34in · Waist: 28in · Shoulder: 15in",
    status: "pending",
    date: "Sep 3, 2026",
    notes: "Requires antique rose gold threadwork to match ancestral heirloom dupatta."
  },
  {
    id: "REQ-202",
    customer: "Aryan Kapoor",
    email: "aryan.k@techcorp.in",
    item: "Three-Piece Cocktail Tuxedo",
    budget: 55000,
    deadline: "Sep 28, 2026",
    measurementsSummary: "Chest: 40in · Waist: 33in · Inseam: 31in",
    status: "quoted",
    date: "Sep 2, 2026",
    notes: "Peak lapels in burgundy satin, double vent back, horn buttons."
  },
  {
    id: "REQ-203",
    customer: "Priya Sharma",
    email: "priya@betees.com",
    item: "Bespoke Raw Silk Anarkali Set",
    budget: 35000,
    deadline: "Oct 02, 2026",
    measurementsSummary: "Chest: 36in · Waist: 30in · Length: 52in",
    status: "accepted",
    date: "Sep 1, 2026",
    notes: "Muted emerald silk base with subtle champagne border."
  }
];

export interface DesignerOrderItem {
  id: string;
  customer: string;
  item: string;
  amount: number;
  status: "assigned" | "in_progress" | "fitting_ready" | "shipped" | "completed";
  dueDate: string;
  advancePaid: number;
  notes: string;
}

export const INITIAL_DESIGNER_ORDERS: DesignerOrderItem[] = [
  { id: "#DO-501", customer: "Karan Mehta", item: "Milanese Canvassed Blazer", amount: 48000, status: "in_progress", dueDate: "Sep 12, 2026", advancePaid: 24000, notes: "Chest canvas hand-basted. First fitting Sep 8." },
  { id: "#DO-502", customer: "Sneha Patel", item: "Handloom Tussar Kurta Set", amount: 26000, status: "fitting_ready", dueDate: "Sep 10, 2026", advancePaid: 26000, notes: "Ready for studio trial visit." },
  { id: "#DO-503", customer: "Mihir Shah", item: "Bespoke Bandhgala Jacket", amount: 38000, status: "shipped", dueDate: "Sep 05, 2026", advancePaid: 38000, notes: "Shipped via BlueDart AWB# 78129384." },
  { id: "#DO-504", customer: "Aditi Rao", item: "Sculpted Rose Silk Dress", amount: 42000, status: "completed", dueDate: "Aug 28, 2026", advancePaid: 42000, notes: "Delivered & client rated 5 stars." },
];

export interface ChatMessage {
  id: string;
  sender: "me" | "them";
  senderName: string;
  text: string;
  time: string;
}

export interface ConversationThread {
  id: string;
  partnerName: string;
  partnerRole: string;
  partnerAvatar?: string;
  unreadCount: number;
  lastMessage: string;
  lastTime: string;
  messages: ChatMessage[];
}

export const INITIAL_DESIGNER_CHATS: ConversationThread[] = [
  {
    id: "CHAT-D1",
    partnerName: "Riya Malhotra",
    partnerRole: "Client",
    unreadCount: 2,
    lastMessage: "Can we adjust the neckline to a sweetheart cut?",
    lastTime: "10:45 AM",
    messages: [
      { id: "m1", sender: "them", senderName: "Riya Malhotra", text: "Hello! I saw your recent hand-canvassed lehenga blazers on Betees.", time: "10:15 AM" },
      { id: "m2", sender: "me", senderName: "Suresh Nair", text: "Thank you Riya! Yes, every piece is custom drafted to your posture profile.", time: "10:22 AM" },
      { id: "m3", sender: "them", senderName: "Riya Malhotra", text: "Can we adjust the neckline to a sweetheart cut?", time: "10:45 AM" }
    ]
  },
  {
    id: "CHAT-D2",
    partnerName: "Aryan Kapoor",
    partnerRole: "Client",
    unreadCount: 0,
    lastMessage: "The fabric swatch arrived. The burgundy shade is stunning.",
    lastTime: "Yesterday",
    messages: [
      { id: "m4", sender: "me", senderName: "Suresh Nair", text: "Sent the Biella wool swatch booklet to your Bandra address.", time: "Yesterday 2:15 PM" },
      { id: "m5", sender: "them", senderName: "Aryan Kapoor", text: "The fabric swatch arrived. The burgundy shade is stunning.", time: "Yesterday 5:30 PM" }
    ]
  }
];

export interface DesignerCustomerItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  measurementsSummary: string;
}

export const INITIAL_DESIGNER_CUSTOMERS: DesignerCustomerItem[] = [
  { id: "CUST-1", name: "Riya Malhotra", email: "riya.m@gmail.com", phone: "+91 98200 11223", city: "Mumbai", totalOrders: 3, totalSpent: 164000, lastOrderDate: "Sep 3, 2026", measurementsSummary: "Bust: 34in · Waist: 28in · Hip: 37in · Height: 5'6\"" },
  { id: "CUST-2", name: "Aryan Kapoor", email: "aryan.k@techcorp.in", phone: "+91 98111 88776", city: "Delhi", totalOrders: 2, totalSpent: 107000, lastOrderDate: "Sep 2, 2026", measurementsSummary: "Chest: 40R · Waist: 33in · Inseam: 31in · Height: 5'11\"" },
  { id: "CUST-3", name: "Sneha Patel", email: "sneha.p@patel.co", phone: "+91 99099 33445", city: "Ahmedabad", totalOrders: 4, totalSpent: 185000, lastOrderDate: "Aug 30, 2026", measurementsSummary: "Bust: 36in · Waist: 30in · Hip: 39in · Height: 5'5\"" },
  { id: "CUST-4", name: "Karan Mehta", email: "karan.mehta@studio.in", phone: "+91 98220 55667", city: "Pune", totalOrders: 1, totalSpent: 48000, lastOrderDate: "Aug 20, 2026", measurementsSummary: "Chest: 42R · Waist: 34in · Inseam: 32in · Height: 6'0\"" },
];

export interface DesignerReviewItem {
  id: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
  product: string;
  reply?: string;
}

export const INITIAL_DESIGNER_REVIEWS: DesignerReviewItem[] = [
  {
    id: "REV-1",
    customerName: "Riya Malhotra",
    rating: 5,
    date: "Sep 2, 2026",
    comment: "The precision of the tailoring was unbelievable. Zero alter charges needed, fit like second skin on stage!",
    product: "Custom Velvet Bundi Waistcoat",
    reply: "Thank you Riya! It was an absolute delight crafting this for you."
  },
  {
    id: "REV-2",
    customerName: "Aryan Kapoor",
    rating: 5,
    date: "Aug 25, 2026",
    comment: "Biella wool suiting at this price point with floating canvas is unmatched in India.",
    product: "Italian Wool Bespoke Tuxedo"
  },
  {
    id: "REV-3",
    customerName: "Sneha Patel",
    rating: 4.8,
    date: "Aug 14, 2026",
    comment: "Delivery took 2 days longer than expected due to heavy rains, but the quality made up for every minute.",
    product: "Silk Zardozi Lehenga Blouse",
    reply: "Apologies for the courier weather delay Sneha, thrilled you love the embroidery!"
  }
];

// Initial Fashion Brand Data
export interface BrandProductItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  sizes: string[];
  status: "in_stock" | "low_stock" | "out_of_stock";
  salesCount: number;
  image: string;
}

export const INITIAL_BRAND_PRODUCTS: BrandProductItem[] = [
  { id: "BP-101", sku: "AC-TR-01", name: "Imperial Burgundy Cashmere Trench", category: "Outerwear", price: 78500, originalPrice: 95000, stock: 18, sizes: ["XS", "S", "M", "L", "XL"], status: "in_stock", salesCount: 42, image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=80" },
  { id: "BP-102", sku: "AC-BL-04", name: "Structured Wool-Silk Tuxedo Blazer", category: "Blazers", price: 52000, stock: 6, sizes: ["38R", "40R", "42R"], status: "low_stock", salesCount: 38, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80" },
  { id: "BP-103", sku: "AC-LH-09", name: "Silk Zardozi Embroidered Lehenga", category: "Ethnic", price: 145000, originalPrice: 180000, stock: 4, sizes: ["S", "M", "L"], status: "low_stock", salesCount: 27, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop&q=80" },
  { id: "BP-104", sku: "AC-DR-12", name: "Obsidian Drape Cape Dress", category: "Dresses", price: 38900, stock: 22, sizes: ["XS", "S", "M", "L"], status: "in_stock", salesCount: 31, image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e83?w=600&h=800&fit=crop&q=80" },
  { id: "BP-105", sku: "AC-TP-07", name: "Sculpted Rose Silk Halter Blouse", category: "Tops", price: 18500, stock: 35, sizes: ["XS", "S", "M", "L"], status: "in_stock", salesCount: 54, image: "https://images.unsplash.com/photo-1575886876069-f50e42e55c75?w=600&h=800&fit=crop&q=80" },
  { id: "BP-106", sku: "AC-TR-03", name: "Fluid Silk Palazzo Trousers", category: "Trousers", price: 24500, stock: 0, sizes: ["S", "M", "L"], status: "out_of_stock", salesCount: 65, image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e83?w=600&h=800&fit=crop&q=80" },
];

export interface BrandCouponItem {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  value: number;
  minSpend: number;
  expiryDate: string;
  status: "active" | "expired" | "draft";
  redemptions: number;
}

export const INITIAL_BRAND_COUPONS: BrandCouponItem[] = [
  { id: "CP-1", code: "BETEESFESTIVE20", discountType: "percentage", value: 20, minSpend: 25000, expiryDate: "Oct 31, 2026", status: "active", redemptions: 148 },
  { id: "CP-2", code: "COUTURE5000", discountType: "fixed", value: 5000, minSpend: 50000, expiryDate: "Nov 15, 2026", status: "active", redemptions: 62 },
  { id: "CP-3", code: "FIRSTAI10", discountType: "percentage", value: 10, minSpend: 10000, expiryDate: "Dec 31, 2026", status: "active", redemptions: 389 },
];

// Initial Creator Data
export interface CreatorContentItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  category: "Lookbook" | "Reel" | "Capsule Wardrobe" | "Editorial";
  views: number;
  likes: number;
  saves: number;
  publishedDate: string;
  tags: string[];
}

export const INITIAL_CREATOR_CONTENT: CreatorContentItem[] = [
  {
    id: "CC-1",
    title: "Old Money Autumn: Charcoal & Burgundy Drape",
    caption: "Curated with Betees AI Stylist using pure cashmere and bespoke single-button suiting.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=80",
    category: "Lookbook",
    views: 48200,
    likes: 3840,
    saves: 1420,
    publishedDate: "Sep 2, 2026",
    tags: ["#OldMoneyAesthetic", "#BeteesStyle", "#Cashmere"]
  },
  {
    id: "CC-2",
    title: "Bespoke Bridal Sangeet Moodboard",
    caption: "House of Rohit Bal zardozi lehenga paired with sculpted rose gold jewelry.",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop&q=80",
    category: "Capsule Wardrobe",
    views: 62100,
    likes: 5490,
    saves: 2180,
    publishedDate: "Aug 27, 2026",
    tags: ["#BridalCouture", "#IndianWeddings", "#BeteesAI"]
  },
  {
    id: "CC-3",
    title: "Minimalist Executive Tailoring Breakdown",
    caption: "How floating canvas construction changes the silhouette of your everyday power suit.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80",
    category: "Editorial",
    views: 31400,
    likes: 2210,
    saves: 950,
    publishedDate: "Aug 15, 2026",
    tags: ["#MenswearBespoke", "#ExecutiveStyle"]
  }
];

export interface BrandCampaignBrief {
  id: string;
  brandName: string;
  brandLogo?: string;
  campaignTitle: string;
  payout: number;
  deliverables: string;
  deadline: string;
  category: string;
  status: "open" | "applied" | "shortlisted" | "accepted";
}

export const INITIAL_BRAND_CAMPAIGNS: BrandCampaignBrief[] = [
  {
    id: "CMP-01",
    brandName: "Aurelia Couture",
    campaignTitle: "Festive Cashmere & Silk Autumn Drop",
    payout: 75000,
    deliverables: "1 Dedicated Reel + 3 Carousel Slides + Betees Wardrobe Tag",
    deadline: "Sep 25, 2026",
    category: "Luxury Outerwear",
    status: "open"
  },
  {
    id: "CMP-02",
    brandName: "Atelier Vesper",
    campaignTitle: "Savile Row Precision Meets Contemporary India",
    payout: 90000,
    deliverables: "2 Style Reels + Fitting Session Vlog + Link in Bio",
    deadline: "Oct 05, 2026",
    category: "Bespoke Suiting",
    status: "applied"
  },
  {
    id: "CMP-03",
    brandName: "Studio Cadence",
    campaignTitle: "Fluid Silk Capsule Wardrobe Styling",
    payout: 45000,
    deliverables: "1 Reel + 4 Story Frames",
    deadline: "Sep 30, 2026",
    category: "Modern Fusion",
    status: "accepted"
  }
];

// Initial Customer Data
export interface WardrobeClothingItem {
  id: string;
  name: string;
  category: "Tops" | "Bottoms" | "Outerwear" | "Shoes" | "Ethnic" | "Accessories";
  brand: string;
  color: string;
  image: string;
  wearCount: number;
  lastWorn: string;
}

export const INITIAL_CUSTOMER_WARDROBE: WardrobeClothingItem[] = [
  { id: "WR-1", name: "Imperial Burgundy Cashmere Trench", category: "Outerwear", brand: "Aurelia Couture", color: "Burgundy", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=80", wearCount: 8, lastWorn: "Sep 2, 2026" },
  { id: "WR-2", name: "Structured Tuxedo Blazer", category: "Tops", brand: "Atelier Vesper", color: "Charcoal", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80", wearCount: 14, lastWorn: "Aug 29, 2026" },
  { id: "WR-3", name: "Fluid Silk Palazzo", category: "Bottoms", brand: "Studio Cadence", color: "Ivory", image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e83?w=600&h=800&fit=crop&q=80", wearCount: 11, lastWorn: "Aug 25, 2026" },
  { id: "WR-4", name: "Silk Zardozi Embroidered Lehenga", category: "Ethnic", brand: "House of Rohit Bal", color: "Rose Gold", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop&q=80", wearCount: 2, lastWorn: "Jul 14, 2026" },
  { id: "WR-5", name: "Sculpted Rose Silk Halter", category: "Tops", brand: "Aurelia Couture", color: "Dusty Rose", image: "https://images.unsplash.com/photo-1575886876069-f50e42e55c75?w=600&h=800&fit=crop&q=80", wearCount: 6, lastWorn: "Aug 18, 2026" },
];

export interface CustomerNotificationItem {
  id: string;
  type: "order" | "style" | "offer" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const INITIAL_CUSTOMER_NOTIFICATIONS: CustomerNotificationItem[] = [
  { id: "N-1", type: "order", title: "Order Shipped", message: "Your bespoke tuxedo #BT-7820 has been dispatched with BlueDart tracking BLUEDART123.", time: "10 mins ago", read: false },
  { id: "N-2", type: "style", title: "AI Look Recommendation", message: "New monsoon-to-autumn capsule curated for your body measurements.", time: "2 hours ago", read: false },
  { id: "N-3", type: "offer", title: "Festive Early Bird 20%", message: "Use coupon BETEESFESTIVE20 on custom couture orders above ₹25,000.", time: "1 day ago", read: true },
  { id: "N-4", type: "system", title: "Measurement Profile Verified", message: "Your 3D fit scan profile was verified by Atelier Vesper master tailor.", time: "3 days ago", read: true },
];
