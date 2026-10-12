"use client";

import React, { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  Gift,
  ArrowRight,
  ShieldCheck,
  Lock,
  ShoppingBag,
  ArrowLeft,
  RefreshCw,
  Sparkles,
  Heart,
  Check,
} from "lucide-react";
import { useStore, StoreProvider } from "@/context/store-context";
import { Navbar } from "@/components/navigation/navbar";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { WishlistDrawer } from "@/components/wishlist/wishlist-drawer";
import { HamburgerMenu } from "@/components/navigation/hamburger-menu";
import { EcommFooter } from "@/components/home/ecomm-footer";

interface RecommendedProduct {
  id: string;
  shadeId: string;
  name: string;
  variant: string;
  price: number;
  image: string;
  badge: {
    label: string;
    dotColor: string;
  };
}

const RECOMMENDATIONS_DATA: RecommendedProduct[] = [
  {
    id: "rec-shade-4",
    shadeId: "shade-4",
    name: "NO.4 MEDIUM BROWN SYSTEM",
    variant: "Natural Chestnut • Air-Driven Touch Up",
    price: 2499,
    image: "/images/products/cards/shade_card_4.jpg",
    badge: {
      label: "MOST POPULAR",
      dotColor: "#FFC72C",
    },
  },
  {
    id: "rec-shade-7",
    shadeId: "shade-7",
    name: "NO.7 MEDIUM BLONDE SYSTEM",
    variant: "Warm Golden • Multi-Tonal Highlights",
    price: 2499,
    image: "/images/products/cards/shade_card_7.jpg",
    badge: {
      label: "HIGH DEMAND",
      dotColor: "#FF671F",
    },
  },
  {
    id: "rec-shade-1",
    shadeId: "shade-1",
    name: "NO.1 BLACK SYSTEM",
    variant: "Intense Raven • High-Pigment Dispersion",
    price: 2499,
    image: "/images/products/cards/shade_card_1.jpg",
    badge: {
      label: "INTENSE PIGMENT",
      dotColor: "#00A3E0",
    },
  },
  {
    id: "rec-shade-0",
    shadeId: "shade-6",
    name: "NO.0/0 CLEAR GLOSS SYSTEM",
    variant: "Universal Gloss & Translucent Blending",
    price: 2499,
    image: "/images/products/cards/shade_card_6.jpg",
    badge: {
      label: "MULTI-USE",
      dotColor: "#B584C4",
    },
  },
];

function CartPageContent() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    formatPrice,
    addToCart,
    isInWishlist,
    toggleWishlist,
  } = useStore();

  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddToCart = (product: RecommendedProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      variant: product.variant,
      price: product.price,
      image: product.image,
      quantity: 1,
      inStock: 5,
    });
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1800);
  };

  const handleToggleWishlist = (product: RecommendedProduct, e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist({
      id: `rec-${product.id}`,
      name: product.name,
      category: product.variant,
      price: product.price,
      image: product.image,
    });
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Progressive Offer Milestones calculation
  const nextTierRemaining = totalItems < 2 ? 2 - totalItems : totalItems < 3 ? 3 - totalItems : 0;
  const discountPercent = totalItems >= 3 ? 15 : totalItems >= 2 ? 10 : 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = subtotal - discountAmount;

  return (
    <div className="min-h-screen w-full bg-[#F5F6F6] text-obsidian flex flex-col overflow-x-clip selection:bg-steel selection:text-white">
      {/* Side Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <HamburgerMenu />

      {/* Navigation */}
      <Navbar />

      {/* Main Cart & Checkout Page */}
      <main className="flex-1 pt-32 xs:pt-36 sm:pt-40 md:pt-44 pb-16 sm:pb-20">
        <div className="px-3.5 sm:px-10 lg:px-14 max-w-[1500px] mx-auto">
          
          {/* Header Section matching Collections & Bestsellers */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-2.5 px-2">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-graphite font-semibold">
              <Link href="/" className="hover:text-obsidian transition-colors">
                HOME
              </Link>
              <span className="text-graphite/40">/</span>
              <span className="text-obsidian font-bold">SHOPPING CART</span>
            </div>

            <h1 className="font-headline font-bold text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-obsidian tracking-wider uppercase leading-tight">
              YOUR SHOPPING CART
            </h1>

            <p className="font-body text-[11px] sm:text-sm text-graphite font-medium tracking-wide uppercase max-w-xl mx-auto leading-relaxed">
              Precision Reusable Hair Colour System • Complimentary shipping over ₹2,499
            </p>
            <div className="w-10 sm:w-12 h-[2px] bg-obsidian/30 mx-auto mt-3 sm:mt-4" />
          </div>

          {/* Progress / Offer Stepper Bar - Styled in matching glassmorphic container */}
          <div className="bg-[#EAECEB]/90 sm:bg-[#EAECEB]/80 backdrop-blur-md border border-black/5 py-4 sm:py-5 px-4 sm:px-8 mb-6 sm:mb-10 rounded-xl sm:rounded-2xl shadow-xs max-w-3xl mx-auto">
            <p className="text-center font-mono text-[10px] xs:text-[11px] sm:text-[12px] font-bold tracking-[0.12em] sm:tracking-[0.16em] uppercase text-obsidian mb-4 leading-relaxed">
              {nextTierRemaining > 0 ? (
                <>
                  ADD <span className="text-[#C9B07A] font-extrabold">{nextTierRemaining} MORE</span> {nextTierRemaining === 1 ? "FORMULA" : "FORMULAS"} TO GET{" "}
                  <span className="text-[#C9B07A] font-extrabold">{totalItems === 1 ? "10% OFF" : "15% OFF"}</span>
                </>
              ) : (
                <span className="text-emerald-700 font-extrabold">CONGRATULATIONS! 15% VIP BUNDLE DISCOUNT UNLOCKED</span>
              )}
            </p>

            {/* Stepper Graphic */}
            <div className="relative max-w-md mx-auto">
              {/* Connecting Background Line - exactly between center of first circle (16.67%) and center of third circle (83.33%) */}
              <div className="absolute top-3.5 sm:top-4 left-[16.67%] right-[16.67%] h-[2px] bg-black/10 z-0 overflow-hidden">
                {/* Connecting Active Progress Line */}
                <div
                  className="h-full bg-[#C9B07A] transition-all duration-500"
                  style={{
                    width: totalItems <= 1 ? "0%" : totalItems === 2 ? "50%" : "100%",
                  }}
                />
              </div>

              {/* Step Columns */}
              <div className="grid grid-cols-3 relative z-10">
                {/* Step 1: 1 Item */}
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                      totalItems >= 1
                        ? "bg-white border-[#C9B07A] text-[#C9B07A] shadow-xs"
                        : "bg-white border-black/20 text-graphite"
                    }`}
                  >
                    <Gift className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <span className="font-mono text-[8.5px] sm:text-[10px] text-graphite uppercase tracking-[0.16em] mt-1 sm:mt-1.5 font-semibold">
                    1 ITEM
                  </span>
                  <span className="font-headline font-bold text-[9px] sm:text-[11px] text-obsidian uppercase tracking-wider">
                    FREE SHIELD
                  </span>
                </div>

                {/* Step 2: 2 Items */}
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center font-mono text-[10px] sm:text-[11px] font-bold transition-colors ${
                      totalItems >= 2
                        ? "bg-[#C9B07A] border-[#C9B07A] text-white shadow-xs"
                        : "bg-white border-black/20 text-graphite"
                    }`}
                  >
                    %
                  </div>
                  <span className="font-mono text-[8.5px] sm:text-[10px] text-graphite uppercase tracking-[0.16em] mt-1 sm:mt-1.5 font-semibold">
                    2 ITEMS
                  </span>
                  <span className="font-headline font-bold text-[9px] sm:text-[11px] text-obsidian uppercase tracking-wider">
                    10% OFF
                  </span>
                </div>

                {/* Step 3: 3 Items */}
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center font-mono text-[10px] sm:text-[11px] font-bold transition-colors ${
                      totalItems >= 3
                        ? "bg-[#C9B07A] border-[#C9B07A] text-white shadow-xs"
                        : "bg-white border-black/20 text-graphite"
                    }`}
                  >
                    %
                  </div>
                  <span className="font-mono text-[8.5px] sm:text-[10px] text-graphite uppercase tracking-[0.16em] mt-1 sm:mt-1.5 font-semibold">
                    3 ITEMS
                  </span>
                  <span className="font-headline font-bold text-[9px] sm:text-[11px] text-obsidian uppercase tracking-wider">
                    15% OFF
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Empty State */}
          {cart.length === 0 ? (
            <div className="text-center py-16 sm:py-20 bg-white/80 backdrop-blur-md rounded-2xl border border-black/8 max-w-lg mx-auto p-6 sm:p-8 shadow-xs space-y-4">
              <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-graphite/40 mx-auto stroke-[1.5]" />
              <h2 className="font-headline font-bold text-lg sm:text-xl uppercase tracking-wider text-obsidian">
                Your cart is empty
              </h2>
              <p className="font-body text-xs sm:text-sm text-graphite max-w-sm mx-auto leading-relaxed">
                Discover our permanent air-driven shade formulas and reusable canister system.
              </p>
              <div className="pt-2">
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-obsidian hover:bg-black text-white text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-md active:scale-95"
                >
                  <span>BROWSE COLLECTION</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            /* 2-Column Responsive Checkout Layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
              
              {/* Left Column: Product Details List */}
              <div className="lg:col-span-8 space-y-3.5 sm:space-y-4">
                
                {/* Column Table Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-black/10 font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.18em] sm:tracking-[0.2em] uppercase text-graphite px-1">
                  <span>PRODUCT DETAILS ({totalItems})</span>
                  <span>SUBTOTAL</span>
                </div>

                {/* Cart Items List */}
                <div className="space-y-3 sm:space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-xs border border-black/8 shadow-2xs hover:border-black/15 transition-all flex flex-col gap-3 relative group"
                    >
                      {/* Top Row: Thumbnail + Product Info + Remove Button */}
                      <div className="flex items-start gap-3.5 sm:gap-5 w-full min-w-0 pr-7 sm:pr-8">
                        {/* Thumbnail */}
                        <div className="relative w-16 h-22 sm:w-20 sm:h-28 rounded-lg sm:rounded-xl overflow-hidden bg-[#E2E5E4] border border-black/5 shrink-0 shadow-2xs">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="96px"
                            className="object-cover object-center"
                          />
                        </div>

                        {/* Text Details */}
                        <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1">
                          <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.18em] uppercase text-graphite/70 block">
                            COLOURPIG SYSTEM
                          </span>
                          <h3 className="font-headline font-bold text-xs xs:text-sm sm:text-base uppercase tracking-wider text-obsidian line-clamp-2 sm:truncate">
                            {item.name}
                          </h3>
                          {item.variant && (
                            <p className="font-body text-[11px] sm:text-xs text-graphite/80 line-clamp-1">
                              {item.variant}
                            </p>
                          )}
                          <p className="font-mono text-[11px] sm:text-xs font-semibold text-obsidian/80 pt-0.5">
                            {formatPrice(item.price)} each
                          </p>
                        </div>

                        {/* Remove Cross Button */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="absolute top-3.5 right-3.5 text-graphite/40 hover:text-rose-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4 stroke-[1.8]" />
                        </button>
                      </div>

                      {/* Bottom Row: Quantity Counter + Line Total */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-black/5 w-full">
                        {/* Quantity Counter */}
                        <div className="inline-flex items-center border border-black/10 rounded-full bg-[#EAECEB]/70 overflow-hidden shadow-2xs">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="p-1.5 sm:px-2.5 sm:py-1.5 hover:bg-black/10 text-obsidian transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                          <span className="px-2.5 sm:px-3 py-1 font-mono text-xs font-bold text-obsidian min-w-[28px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="p-1.5 sm:px-2.5 sm:py-1.5 hover:bg-black/10 text-obsidian transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                        </div>

                        {/* Line Total */}
                        <div className="text-right">
                          <span className="font-mono text-xs xs:text-sm sm:text-base font-bold text-obsidian">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping Link */}
                <div className="pt-2">
                  <Link
                    href="/collections"
                    className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono tracking-[0.16em] uppercase text-graphite hover:text-obsidian transition-colors font-semibold"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>CONTINUE BROWSING SHADES</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Order Summary Card */}
              <div className="lg:col-span-4 mt-2 lg:mt-0">
                <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-md border border-black/8 shadow-sm space-y-4 sm:space-y-5 lg:sticky lg:top-36">
                  
                  {/* Summary Title */}
                  <h3 className="font-headline font-bold text-xs sm:text-sm tracking-[0.2em] uppercase text-obsidian pb-3 border-b border-black/10">
                    ORDER SUMMARY
                  </h3>

                  {/* Pricing Breakdown Rows */}
                  <div className="space-y-2 sm:space-y-2.5 font-mono text-xs sm:text-[13px]">
                    <div className="flex items-center justify-between text-graphite font-medium">
                      <span>SUBTOTAL ({totalItems} {totalItems === 1 ? "ITEM" : "ITEMS"})</span>
                      <span className="font-semibold text-obsidian">{formatPrice(subtotal)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex items-center justify-between text-emerald-700 font-bold">
                        <span>TIER DISCOUNT ({discountPercent}%)</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}
                  </div>

                  {/* Total Line */}
                  <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                    <span className="font-headline font-bold text-xs sm:text-sm tracking-wider uppercase text-obsidian">
                      TOTAL
                    </span>
                    <span className="font-mono font-bold text-base sm:text-xl text-obsidian">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>

                  {/* Pre-Paid Order Banner */}
                  <div className="p-2.5 sm:p-3 rounded-xl bg-[#EAECEB] border border-black/5 text-center">
                    <p className="font-mono text-[9.5px] sm:text-[11px] font-bold tracking-[0.14em] uppercase text-obsidian/80">
                      ADDITIONAL DISCOUNT AVAILABLE ON PRE-PAID ORDERS
                    </p>
                  </div>

                  {/* Proceed to Checkout Action Button */}
                  <button
                    type="button"
                    onClick={() => alert("Proceeding to secure checkout payment gateway...")}
                    className="w-full py-3.5 sm:py-4 px-4 rounded-xl sm:rounded-2xl bg-obsidian hover:bg-black text-white text-[11px] sm:text-[12px] font-mono font-bold tracking-[0.18em] sm:tracking-[0.2em] uppercase transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                    <span>PROCEED TO CHECKOUT</span>
                  </button>

                  {/* Guaranteed Badges */}
                  <div className="pt-1 flex items-center justify-center gap-2 text-graphite text-[9px] sm:text-[10px] font-mono tracking-[0.16em] uppercase">
                    <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
                    <span>100% SECURE ENCRYPTED CHECKOUT</span>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* CURATED RECOMMENDATIONS / YOU MAY ALSO LIKE Section - Matching User Reference */}
          <section className="mt-14 sm:mt-20 pt-10 sm:pt-14 border-t border-black/10">
            <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 space-y-1.5">
              <p className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] uppercase text-graphite">
                CURATED RECOMMENDATIONS
              </p>
              <h2 className="font-headline font-extrabold text-2xl xs:text-3xl sm:text-4xl text-obsidian tracking-wider uppercase">
                YOU MAY ALSO LIKE
              </h2>
              <div className="w-12 sm:w-14 h-[2px] bg-obsidian/30 mx-auto mt-2.5" />
            </div>

            {/* 4 Recommendations Cards Grid - Matching Collections/Second Image Card Design */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 xs:gap-3.5 sm:gap-6 lg:gap-8">
              {RECOMMENDATIONS_DATA.map((item) => {
                const inWishlist = isInWishlist(`rec-${item.id}`);
                const isJustAdded = addedId === item.id;

                return (
                  <div key={item.id} className="group flex flex-col">
                    {/* Portrait Image Container */}
                    <div className="relative aspect-[2/3] w-full rounded-md sm:rounded-lg overflow-hidden bg-[#E2E5E4] shadow-2xs group-hover:shadow-md transition-all duration-300">
                      <Link
                        href={`/product?shade=${item.shadeId}`}
                        className="block w-full h-full relative"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover object-center transition-transform duration-700 ease-out sm:group-hover:scale-105"
                        />
                      </Link>

                      {/* Badge Pill on Top Left */}
                      <div className="absolute top-2 left-2 sm:top-3.5 sm:left-3.5 z-10 flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/95 backdrop-blur text-obsidian text-[8px] xs:text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider shadow-2xs pointer-events-none uppercase">
                        <span
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0"
                          style={{ backgroundColor: item.badge.dotColor }}
                        />
                        <span className="truncate max-w-[85px] xs:max-w-none">{item.badge.label}</span>
                      </div>

                      {/* Top-Right Circular Wishlist Button */}
                      <button
                        type="button"
                        onClick={(e) => handleToggleWishlist(item, e)}
                        className={`absolute top-2 right-2 sm:top-3.5 sm:right-3.5 z-20 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur shadow-2xs flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
                          inWishlist
                            ? "opacity-100 text-rose-600"
                            : "opacity-90 sm:opacity-0 sm:group-hover:opacity-100 text-obsidian hover:text-black"
                        }`}
                        aria-label="Wishlist"
                      >
                        <Heart
                          className={`w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 stroke-[1.5] ${
                            inWishlist ? "fill-rose-600 text-rose-600" : ""
                          }`}
                        />
                      </button>

                      {/* Floating Pill Action Button on hover on desktop */}
                      <div className="hidden sm:flex absolute bottom-4 inset-x-0 mx-auto z-20 justify-center px-4 pointer-events-none group-hover:pointer-events-auto">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(item)}
                          className={`w-full max-w-[210px] py-2.5 px-4 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 shadow-md backdrop-blur-md cursor-pointer active:scale-95 ${
                            isJustAdded
                              ? "bg-emerald-700 text-white"
                              : "bg-[#EAECEB]/95 hover:bg-obsidian text-obsidian hover:text-white border border-black/5"
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              <span>ADDED TO CART</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span className="truncate">ORDER SYSTEM</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Product Typography below Image (directly on page like second image) */}
                    <div className="mt-2 sm:mt-3.5 space-y-0.5 sm:space-y-1 text-left block px-0.5">
                      <Link
                        href={`/product?shade=${item.shadeId}`}
                        className="block group/link"
                      >
                        <h3 className="font-headline font-bold text-[11px] xs:text-xs sm:text-sm tracking-wider uppercase text-obsidian group-hover/link:underline truncate">
                          {item.name}
                        </h3>
                      </Link>

                      <div className="flex items-center justify-between">
                        <p className="font-mono text-[11px] xs:text-xs sm:text-sm font-semibold text-obsidian">
                          {formatPrice(item.price)}
                        </p>

                        {/* Mobile quick-add button */}
                        <button
                          type="button"
                          onClick={() => handleAddToCart(item)}
                          className={`sm:hidden px-2.5 py-1 rounded text-[9px] font-mono font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-1 cursor-pointer active:scale-95 ${
                            isJustAdded
                              ? "bg-emerald-700 text-white"
                              : "bg-obsidian text-white"
                          }`}
                        >
                          {isJustAdded ? "ADDED" : "BUY NOW +"}
                        </button>
                      </div>

                      <p className="font-body text-[10px] sm:text-[11px] text-graphite truncate hidden xs:block">
                        {item.variant}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Technical System Highlights matching Collections & Bestsellers */}
          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-black/10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 font-mono">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-black/5">
              <div className="w-8 h-8 rounded-full bg-obsidian text-white flex items-center justify-center shrink-0">
                <RefreshCw className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-headline font-bold text-[11px] sm:text-xs uppercase tracking-wider text-obsidian">REUSABLE CANISTER</h4>
                <p className="font-body text-[10.5px] sm:text-[11px] text-graphite">
                  90% less waste with refills.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-black/5">
              <div className="w-8 h-8 rounded-full bg-obsidian text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-headline font-bold text-[11px] sm:text-xs uppercase tracking-wider text-obsidian">NO MIXING REQUIRED</h4>
                <p className="font-body text-[10.5px] sm:text-[11px] text-graphite">
                  1:1 automatic dispensing.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-black/5">
              <div className="w-8 h-8 rounded-full bg-obsidian text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-headline font-bold text-[11px] sm:text-xs uppercase tracking-wider text-obsidian">30-DAY TRIAL</h4>
                <p className="font-body text-[10.5px] sm:text-[11px] text-graphite">
                  100% shade match guarantee.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Global Footer */}
      <EcommFooter />
    </div>
  );
}

export default function CartPage() {
  return (
    <StoreProvider>
      <Suspense fallback={<div className="min-h-screen bg-[#F5F6F6]" />}>
        <CartPageContent />
      </Suspense>
    </StoreProvider>
  );
}
