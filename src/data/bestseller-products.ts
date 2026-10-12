export interface BestsellerProduct {
  id: string;
  name: string; // e.g. "NO.3 BROWN KIT"
  shadeCode: string; // e.g. "No.3"
  shadeName: string; // "Dark Espresso"
  category: "BRUNETTE" | "BLONDE" | "BLACK" | "CLEAR";
  price: number; // 89
  currency: string; // "USD"
  rating: number; // 4.9
  reviews: number; // 195
  undertone: string;
  image: string;
}

export const BESTSELLER_PAGE_PRODUCTS: BestsellerProduct[] = [
  {
    id: "shade-3",
    name: "NO.3 BROWN KIT",
    shadeCode: "No.3",
    shadeName: "Dark Espresso",
    category: "BRUNETTE",
    price: 89,
    currency: "USD",
    rating: 4.9,
    reviews: 195,
    undertone: "Dark Espresso • Reusable System",
    image: "/images/products/cards/shade_card_3.jpg",
  },
  {
    id: "shade-5",
    name: "NO.5 LIGHT BROWN KIT",
    shadeCode: "No.5",
    shadeName: "Warm Amber",
    category: "BRUNETTE",
    price: 89,
    currency: "USD",
    rating: 4.8,
    reviews: 167,
    undertone: "Warm Amber • Reusable System",
    image: "/images/products/cards/shade_card_5.jpg",
  },
  {
    id: "shade-6",
    name: "NO.6 DARK BLONDE KIT",
    shadeCode: "No.6",
    shadeName: "Deep Honey Blonde",
    category: "BLONDE",
    price: 89,
    currency: "USD",
    rating: 4.9,
    reviews: 182,
    undertone: "Deep Honey Blonde • Reusable System",
    image: "/images/products/cards/shade_card_6.jpg",
  },
  {
    id: "shade-8",
    name: "NO.8 LIGHT BLONDE KIT",
    shadeCode: "No.8",
    shadeName: "Luminous Sunlit",
    category: "BLONDE",
    price: 89,
    currency: "USD",
    rating: 4.9,
    reviews: 149,
    undertone: "Luminous Sunlit • Reusable System",
    image: "/images/products/cards/shade_card_8.jpg",
  },
  {
    id: "shade-4",
    name: "NO.4 MEDIUM BROWN KIT",
    shadeCode: "No.4",
    shadeName: "Medium Brown",
    category: "BRUNETTE",
    price: 89,
    currency: "USD",
    rating: 4.9,
    reviews: 310,
    undertone: "Natural Chestnut • Reusable System",
    image: "/images/products/cards/shade_card_4.jpg",
  },
  {
    id: "shade-7",
    name: "NO.7 MEDIUM BLONDE KIT",
    shadeCode: "No.7",
    shadeName: "Medium Blonde",
    category: "BLONDE",
    price: 89,
    currency: "USD",
    rating: 4.9,
    reviews: 215,
    undertone: "Warm Golden • Reusable System",
    image: "/images/products/cards/shade_card_7.jpg",
  },
  {
    id: "shade-1",
    name: "NO.1 BLACK KIT",
    shadeCode: "No.1",
    shadeName: "Jet Black",
    category: "BLACK",
    price: 89,
    currency: "USD",
    rating: 5.0,
    reviews: 242,
    undertone: "Pure Mineral Jet • Reusable System",
    image: "/images/products/cards/shade_card_2.jpg",
  },
  {
    id: "shade-0-0",
    name: "NO.0/0 CLEAR GLOSS KIT",
    shadeCode: "No.0/0",
    shadeName: "Clear Gloss",
    category: "CLEAR",
    price: 89,
    currency: "USD",
    rating: 4.9,
    reviews: 118,
    undertone: "Universal Gloss • Reusable System",
    image: "/images/products/cards/shade_card_1.jpg",
  },
];
