export interface PigmentCollectionItem {
  id: string; // shade-4, etc.
  name: string; // e.g. "NO.4 MEDIUM BROWN SYSTEM"
  shadeCode: string; // e.g. "No.4"
  undertone: string; // "Natural Chestnut • Air-Driven Touch Up"
  category: "ALL" | "BRUNETTE" | "BLONDE" | "BLACK" | "CLEAR" | "SYSTEM";
  type: "Starter System" | "Refill Cartridge" | "Gloss & Toner" | "Hardware Rig";
  price: number; // 89
  currency: string; // "USD"
  rating: number; // 4.9
  reviews: number; // 310
  badge: {
    label: string; // "MOST POPULAR", "HIGH DEMAND", "INTENSE PIGMENT", "MULTI-USE"
    dotColor: string; // e.g. "#FFC72C", "#FF671F", "#00A3E0", "#B584C4"
  };
  isBestseller?: boolean;
  images: string[];
}

export const COLOURPIG_COLLECTION: PigmentCollectionItem[] = [
  {
    id: "shade-4",
    name: "NO.4 MEDIUM BROWN SYSTEM",
    shadeCode: "No.4",
    undertone: "Natural Chestnut • Air-Driven Touch Up",
    category: "BRUNETTE",
    type: "Starter System",
    price: 89,
    currency: "USD",
    rating: 4.9,
    reviews: 310,
    badge: {
      label: "MOST POPULAR",
      dotColor: "#FFC72C",
    },
    isBestseller: true,
    images: [
      "/images/products/cards/shade_card_4.jpg",
      "/images/results/model_shade_4.jpg",
      "/images/products/swatches/shade_4_swatch.png",
      "/images/product-dispenser.jpg",
    ],
  },
  {
    id: "shade-7",
    name: "NO.7 MEDIUM BLONDE SYSTEM",
    shadeCode: "No.7",
    undertone: "Warm Golden • Multi-Tonal Highlights",
    category: "BLONDE",
    type: "Starter System",
    price: 89,
    currency: "USD",
    rating: 4.9,
    reviews: 215,
    badge: {
      label: "HIGH DEMAND",
      dotColor: "#FF671F",
    },
    isBestseller: true,
    images: [
      "/images/products/cards/shade_card_7.jpg",
      "/images/results/model_shade_7.jpg",
      "/images/products/swatches/shade_7_swatch.png",
      "/images/product-dispenser.jpg",
    ],
  },
  {
    id: "shade-1",
    name: "NO.1 BLACK SYSTEM",
    shadeCode: "No.1",
    undertone: "Pure Mineral Jet • 100% Resistant Coverage",
    category: "BLACK",
    type: "Starter System",
    price: 89,
    currency: "USD",
    rating: 5.0,
    reviews: 242,
    badge: {
      label: "INTENSE PIGMENT",
      dotColor: "#00A3E0",
    },
    isBestseller: true,
    images: [
      "/images/products/cards/shade_card_2.jpg",
      "/images/results/model_shade_2.jpg",
      "/images/products/swatches/shade_2_swatch.png",
      "/images/product-dispenser.jpg",
    ],
  },
  {
    id: "shade-0-0",
    name: "NO.0/0 CLEAR GLOSS SYSTEM",
    shadeCode: "No.0/0",
    undertone: "Universal Gloss • Translucent Grey Blending",
    category: "CLEAR",
    type: "Gloss & Toner",
    price: 89,
    currency: "USD",
    rating: 4.9,
    reviews: 118,
    badge: {
      label: "MULTI-USE",
      dotColor: "#B584C4",
    },
    isBestseller: true,
    images: [
      "/images/products/cards/shade_card_1.jpg",
      "/images/results/model_shade_1.jpg",
      "/images/products/swatches/shade_1_swatch.png",
      "/images/product-dispenser.jpg",
    ],
  },
  {
    id: "shade-3",
    name: "NO.3 ESPRESSO BROWN SYSTEM",
    shadeCode: "No.3",
    undertone: "Dark Espresso • Zero Brassiness",
    category: "BRUNETTE",
    type: "Starter System",
    price: 89,
    currency: "USD",
    rating: 4.9,
    reviews: 195,
    badge: {
      label: "DEEP VELVET",
      dotColor: "#FF671F",
    },
    isBestseller: true,
    images: [
      "/images/products/cards/shade_card_3.jpg",
      "/images/results/model_shade_3.jpg",
      "/images/products/swatches/shade_3_swatch.png",
      "/images/product-dispenser.jpg",
    ],
  },
  {
    id: "shade-5",
    name: "NO.5 LIGHT BROWN SYSTEM",
    shadeCode: "No.5",
    undertone: "Warm Amber • Seamless Regrowth",
    category: "BRUNETTE",
    type: "Starter System",
    price: 89,
    currency: "USD",
    rating: 4.8,
    reviews: 167,
    badge: {
      label: "WARM AMBER",
      dotColor: "#FFC72C",
    },
    isBestseller: false,
    images: [
      "/images/products/cards/shade_card_5.jpg",
      "/images/results/model_shade_5.jpg",
      "/images/products/swatches/shade_5_swatch.png",
      "/images/product-dispenser.jpg",
    ],
  },
  {
    id: "shade-6",
    name: "NO.6 DARK BLONDE SYSTEM",
    shadeCode: "No.6",
    undertone: "Honey Neutral • Brunette To Caramel Bridge",
    category: "BLONDE",
    type: "Starter System",
    price: 89,
    currency: "USD",
    rating: 4.9,
    reviews: 182,
    badge: {
      label: "CARAMEL BLEND",
      dotColor: "#7AC142",
    },
    isBestseller: false,
    images: [
      "/images/products/cards/shade_card_6.jpg",
      "/images/results/model_shade_6.jpg",
      "/images/products/swatches/shade_6_swatch.png",
      "/images/product-dispenser.jpg",
    ],
  },
  {
    id: "shade-8",
    name: "NO.8 LIGHT BLONDE SYSTEM",
    shadeCode: "No.8",
    undertone: "Sunlit Neutral • Anti-Yellow Brilliance",
    category: "BLONDE",
    type: "Starter System",
    price: 89,
    currency: "USD",
    rating: 4.8,
    reviews: 149,
    badge: {
      label: "SUNLIT CLARITY",
      dotColor: "#FFC72C",
    },
    isBestseller: true,
    images: [
      "/images/products/cards/shade_card_8.jpg",
      "/images/results/model_shade_8.jpg",
      "/images/products/swatches/shade_8_swatch.png",
      "/images/product-dispenser.jpg",
    ],
  },
  {
    id: "shade-9",
    name: "NO.9 VERY LIGHT BLONDE SYSTEM",
    shadeCode: "No.9",
    undertone: "Pale Champagne Platinum • Max Luminescence",
    category: "BLONDE",
    type: "Starter System",
    price: 89,
    currency: "USD",
    rating: 5.0,
    reviews: 188,
    badge: {
      label: "CHAMPAGNE PURE",
      dotColor: "#00A3E0",
    },
    isBestseller: true,
    images: [
      "/images/products/cards/shade_card_9.jpg",
      "/images/results/model_shade_9.jpg",
      "/images/products/swatches/shade_9_swatch.png",
      "/images/product-dispenser.jpg",
    ],
  },
];
