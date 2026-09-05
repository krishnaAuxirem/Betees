import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

export interface CommentItem {
  id: string;
  userName: string;
  avatar: string;
  text: string;
  time: string;
}

export interface CommunityPostItem {
  id: string;
  creatorId: string;
  user: string;
  handle: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  saves: number;
  tags: string[];
  category: "AI Curated" | "Bridal" | "Menswear" | "Ethnic" | "Street";
  productId: string;
  productName: string;
  productPrice: number;
  commentsList: CommentItem[];
}

export interface CreatorProfileData {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  coverImage: string;
  bio: string;
  location: string;
  followers: number;
  following: number;
  verified: boolean;
  specialty: string;
  collaborationsCount: number;
}

export const INITIAL_CREATORS: Record<string, CreatorProfileData> = {
  "mihir-style": {
    id: "mihir-style",
    name: "Mihir Shah",
    handle: "@mihir.style",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=600&fit=crop",
    bio: "Minimalist fashion archivist & digital creator. Exploring the intersection of architectural tailoring and contemporary Indian streetwear.",
    location: "Mumbai, India",
    followers: 48200,
    following: 342,
    verified: true,
    specialty: "Architectural Menswear & Cashmere",
    collaborationsCount: 14,
  },
  "ananya-couture": {
    id: "ananya-couture",
    name: "Ananya Roy",
    handle: "@ananya.couture",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1600&h=600&fit=crop",
    bio: "Bridal couture stylist & heritage textile patron. Celebrating handloom zardozi, raw silks, and sustainable Indian royal aesthetics.",
    location: "New Delhi, India",
    followers: 125000,
    following: 512,
    verified: true,
    specialty: "Royal Heritage & Bridal Zardozi",
    collaborationsCount: 29,
  },
  "karan-elegance": {
    id: "karan-elegance",
    name: "Karan Mehta",
    handle: "@karan.elegance",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&h=600&fit=crop",
    bio: "Bespoke suiting aficionado and contributing menswear editor. Advocate of floating canvas tailoring and Savile Row heritage.",
    location: "Bengaluru, India",
    followers: 64100,
    following: 280,
    verified: true,
    specialty: "Bespoke Suiting & Black-Tie Gala",
    collaborationsCount: 19,
  },
  "ishita-fashion": {
    id: "ishita-fashion",
    name: "Ishita Verma",
    handle: "@ishita.fashion",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1600&h=600&fit=crop",
    bio: "High-fashion editorial model & creative director. Exploring obsidian monochrome drape, sculptural capes, and AI aesthetics.",
    location: "London & Mumbai",
    followers: 92400,
    following: 420,
    verified: true,
    specialty: "Editorial Drape & Contemporary Gowns",
    collaborationsCount: 22,
  },
  "rohan-street": {
    id: "rohan-street",
    name: "Rohan Malhotra",
    handle: "@rohan.street",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e83?w=1600&h=600&fit=crop",
    bio: "Fusion streetwear curator. Fluid silks, oversized relaxed tailoring, and zero-waste slow fashion.",
    location: "Goa & Mumbai",
    followers: 38900,
    following: 195,
    verified: false,
    specialty: "Streetwear & Fluid Habotai Silk",
    collaborationsCount: 8,
  },
  "priya-luxury": {
    id: "priya-luxury",
    name: "Priya Sengupta",
    handle: "@priya.couture",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1575886876069-f50e42e55c75?w=1600&h=600&fit=crop",
    bio: "Celebrity red-carpet stylist & luxury consultant. Curating bespoke outfits for film galas and sovereign private salons.",
    location: "Kolkata & Mumbai",
    followers: 112000,
    following: 610,
    verified: true,
    specialty: "Red Carpet & Sovereign Gala",
    collaborationsCount: 34,
  },
};

export const INITIAL_COMMUNITY_POSTS: CommunityPostItem[] = [
  {
    id: "1",
    creatorId: "mihir-style",
    user: "Mihir Shah",
    handle: "@mihir.style",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=500&fit=crop",
    caption: "My Betees AI curated this look for my Tokyo trip. The cashmere camel coat + wide trousers combo is perfection. 🔥",
    likes: 342,
    comments: 28,
    saves: 91,
    tags: ["#BeteesStyle", "#AIFashion", "#Menswear"],
    category: "AI Curated",
    productId: "1",
    productName: "Imperial Burgundy Cashmere Trench",
    productPrice: 78500,
    commentsList: [
      {
        id: "c1-1",
        userName: "Neha Gupta",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop",
        text: "The shoulder structure on this coat is phenomenal. Did you do custom measurements?",
        time: "2 hours ago",
      },
      {
        id: "c1-2",
        userName: "Mihir Shah",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop",
        text: "@Neha Yes! The 3D fit scan had zero collar roll.",
        time: "1 hour ago",
      },
      {
        id: "c1-3",
        userName: "Karan Mehta",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop",
        text: "Immaculate proportions brother. Tokyo street approved!",
        time: "30 mins ago",
      },
    ],
  },
  {
    id: "2",
    creatorId: "ananya-couture",
    user: "Ananya Roy",
    handle: "@ananya.couture",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop",
    image: product3,
    caption: "My custom bridal lehenga from House of Rohit Bal via Betees. The AI matched my skin tone to this exact color palette — I cried when I first wore it. ✨",
    likes: 1247,
    comments: 156,
    saves: 388,
    tags: ["#BeteesWedding", "#Bridal", "#IndianCouture"],
    category: "Bridal",
    productId: "3",
    productName: "Silk Zardozi Embroidered Lehenga",
    productPrice: 145000,
    commentsList: [
      {
        id: "c2-1",
        userName: "Ishita Verma",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop",
        text: "This is pure poetry Ananya! The rose gold zari work is breathtaking.",
        time: "5 hours ago",
      },
      {
        id: "c2-2",
        userName: "Aurelia Atelier",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop",
        text: "You look ethereal! Congratulations on your special day.",
        time: "3 hours ago",
      },
    ],
  },
  {
    id: "3",
    creatorId: "karan-elegance",
    user: "Karan Mehta",
    handle: "@karan.elegance",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop",
    image: product2,
    caption: "Atelier Vesper tuxedo blazer arrived today. The Milanese lapel stitching is extraordinary. Zero alterations needed — Betees AI fit prediction is incredibly accurate.",
    likes: 521,
    comments: 47,
    saves: 134,
    tags: ["#BespokeFashion", "#BeteesStyle", "#EditorialFashion"],
    category: "Menswear",
    productId: "2",
    productName: "Structured Wool-Silk Tuxedo Blazer",
    productPrice: 52000,
    commentsList: [
      {
        id: "c3-1",
        userName: "Vikram Mehta",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop",
        text: "Sharp peak lapels! Floating canvas makes all the difference in mobility.",
        time: "4 hours ago",
      },
    ],
  },
  {
    id: "4",
    creatorId: "ishita-fashion",
    user: "Ishita Verma",
    handle: "@ishita.fashion",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop",
    image: product4,
    caption: "The Obsidian Drape Cape from Maison Noir. Wore this to a gallery opening and received 50+ compliments. Betees knows my aesthetic better than I do! 🖤",
    likes: 789,
    comments: 63,
    saves: 212,
    tags: ["#EditorialFashion", "#BeteesStyle", "#ZeroWasteStyle"],
    category: "Street",
    productId: "4",
    productName: "Obsidian Drape Cape Dress",
    productPrice: 38900,
    commentsList: [
      {
        id: "c4-1",
        userName: "Mihir Shah",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop",
        text: "Sculptural perfection. The asymmetric shoulder is museum quality.",
        time: "6 hours ago",
      },
    ],
  },
  {
    id: "5",
    creatorId: "rohan-street",
    user: "Rohan Malhotra",
    handle: "@rohan.street",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e83?w=400&h=500&fit=crop",
    caption: "Fluid Habotai silk palazzos styled for evening beach soiree. Breathable, relaxed, and custom hemmed to exact barefoot measurement.",
    likes: 412,
    comments: 34,
    saves: 110,
    tags: ["#ZeroWasteStyle", "#BeteesStyle", "#IndianCouture"],
    category: "Ethnic",
    productId: "5",
    productName: "Fluid Silk Palazzo Trousers",
    productPrice: 24500,
    commentsList: [
      {
        id: "c5-1",
        userName: "Karan Mehta",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop",
        text: "Effortless resort wear aesthetic! Loving the ivory drape.",
        time: "1 day ago",
      },
    ],
  },
  {
    id: "6",
    creatorId: "priya-luxury",
    user: "Priya Sengupta",
    handle: "@priya.couture",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop",
    image: "https://images.unsplash.com/photo-1575886876069-f50e42e55c75?w=400&h=500&fit=crop",
    caption: "Sculpted Rose Silk Halter styled with gold filigree choker for evening gala reception. Unweighted pure silk drapes like liquid glass.",
    likes: 856,
    comments: 92,
    saves: 275,
    tags: ["#AICouture", "#EditorialFashion", "#BeteesStyle"],
    category: "AI Curated",
    productId: "8",
    productName: "Sculpted Rose Silk Halter Top",
    productPrice: 18500,
    commentsList: [
      {
        id: "c6-1",
        userName: "Ananya Roy",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop",
        text: "The dusty rose hue is sensational Priya!",
        time: "2 days ago",
      },
    ],
  },
];
