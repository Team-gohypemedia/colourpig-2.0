"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Heart, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, RefreshCw } from "lucide-react";
import { COLOURPIG_COLLECTION, PigmentCollectionItem } from "@/data/collection-products";
import { useStore, StoreProvider } from "@/context/store-context";
import { Navbar } from "@/components/navigation/navbar";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { WishlistDrawer } from "@/components/wishlist/wishlist-drawer";
import { HamburgerMenu } from "@/components/navigation/hamburger-menu";
import { EcommFooter } from "@/components/home/ecomm-footer";

type SortOption = "BESTSELLER" | "PRICE_ASC" | "PRICE_DESC" | "NAME";
type CategoryTab = "ALL" | "BRUNETTE" | "BLONDE" | "BLACK" | "CLEAR";
type TypeFilter = "ALL" | "Starter System" | "Gloss & Toner";

function CollectionsContent() {
  const { toggleWishlist, isInWishlist } = useStore();

  const [activeTab, setActiveTab] = useState<CategoryTab>("ALL");
  const [selectedSort, setSelectedSort] = useState<SortOption>("BESTSELLER");
  const [selectedType, setSelectedType] = useState<TypeFilter>("ALL");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  const categories: { key: CategoryTab; label: string }[] = [
    { key: "ALL", label: "ALL FORMULAS" },
    { key: "BRUNETTE", label: "BRUNETTES" },
    { key: "BLONDE", label: "BLONDES" },
    { key: "BLACK", label: "JET BLACK" },
    { key: "CLEAR", label: "CLEAR GLOSS" },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...COLOURPIG_COLLECTION];

    if (activeTab !== "ALL") {
      list = list.filter((p) => p.category === activeTab);
    }

    if (selectedType !== "ALL") {
      list = list.filter((p) => p.type === selectedType);
    }

    switch (selectedSort) {
      case "BESTSELLER":
        list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      case "PRICE_ASC":
        list.sort((a, b) => a.price - b.price);
        break;
      case "PRICE_DESC":
        list.sort((a, b) => b.price - a.price);
        break;
      case "NAME":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return list;
  }, [activeTab, selectedType, selectedSort]);

  const handleToggleWishlist = (product: PigmentCollectionItem, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist({
      id: `best-${product.id}`,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.images[0],
      shadeCode: product.shadeCode,
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F6F6] text-obsidian flex flex-col overflow-x-clip selection:bg-steel selection:text-white">
      {/* Side-Page Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <HamburgerMenu />

      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Collection Page Content */}
      <main className="flex-1 pt-32 xs:pt-36 sm:pt-40 md:pt-44 pb-16 sm:pb-20">
        <div className="px-3.5 sm:px-10 lg:px-14 max-w-[1600px] mx-auto">

          {/* Header Section */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12 space-y-2 sm:space-y-2.5 px-2">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-graphite font-semibold">
              <Link href="/" className="hover:text-obsidian transition-colors">
                HOME
              </Link>
              <span className="text-graphite/40">/</span>
              <span className="text-obsidian font-bold">PRECISION COLLECTION</span>
            </div>

            <h1 className="font-headline font-bold text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-obsidian tracking-wider uppercase leading-tight">
              PRECISION SHADE SYSTEM
            </h1>

            <p className="font-body text-[11px] sm:text-sm text-graphite font-medium tracking-wide uppercase max-w-xl mx-auto leading-relaxed">
              World’s First Reusable Air-Driven Permanent Hair Colour. No mixing, zero ammonia, 100% resistant grey coverage.
            </p>
            <div className="w-10 sm:w-12 h-[2px] bg-obsidian/30 mx-auto mt-3 sm:mt-4" />
          </div>

          {/* Filter & Categories Bar - Mobile Optimized */}
          <div className="bg-[#EAECEB]/90 sm:bg-[#EAECEB]/80 backdrop-blur-md border border-black/5 py-2.5 sm:py-3.5 px-3 sm:px-6 mb-5 sm:mb-8 flex flex-col gap-2.5 sm:gap-3.5 lg:flex-row lg:items-center lg:justify-between rounded-xl shadow-xs w-full relative z-30">

            {/* Top Row on Mobile: Horizontal Category Tabs */}
            <div className="flex items-center w-full lg:w-auto order-1 lg:order-2 overflow-x-auto lg:overflow-visible scrollbar-none no-scrollbar">
              <nav className="flex items-center py-0.5 overflow-x-auto lg:overflow-visible w-full lg:w-auto scrollbar-none no-scrollbar font-mono px-0.5 sm:px-1">
                <ul className="flex items-center gap-x-3.5 xs:gap-x-4 sm:gap-x-6 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em] whitespace-nowrap">
                  {categories.map((cat) => {
                    const isActive = activeTab === cat.key;
                    return (
                      <li key={cat.key} className="relative py-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => setActiveTab(cat.key)}
                          className={`transition-colors duration-200 relative pb-1 focus:outline-none ${isActive ? "text-obsidian font-bold" : "text-graphite hover:text-obsidian font-medium"
                            }`}
                        >
                          {cat.label}
                          {isActive && (
                            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-obsidian" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Desktop TYPE Selector */}
              <div className="hidden lg:flex items-center gap-3 shrink-0 relative font-mono ml-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsTypeOpen(!isTypeOpen);
                    setIsSortOpen(false);
                  }}
                  className="h-9 border border-black/15 bg-white/90 pl-3.5 pr-8 text-[11px] font-semibold uppercase tracking-[0.14em] hover:border-obsidian transition-colors rounded-lg flex items-center justify-between gap-3 min-w-[170px]"
                >
                  <span>TYPE: {selectedType}</span>
                  <ChevronDown className="w-3.5 h-3.5 stroke-[2] absolute right-2.5" />
                </button>

                {isTypeOpen && (
                  <div className="absolute top-full right-0 mt-1 w-52 bg-white border border-black/10 rounded-lg shadow-xl py-1.5 z-50 text-[11px] font-mono font-semibold uppercase tracking-wider">
                    {(["ALL", "Starter System", "Gloss & Toner"] as TypeFilter[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setSelectedType(t);
                          setIsTypeOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-neutral-50 transition-colors ${selectedType === t ? "text-obsidian font-bold bg-[#F5F6F6]" : "text-graphite"
                          }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Row on Mobile / Left on Desktop: SORT BY & Mobile TYPE */}
            <div className="flex items-center justify-between lg:justify-start w-full lg:w-auto gap-2 sm:gap-6 pt-2 lg:pt-0 border-t border-black/5 lg:border-t-0 order-2 lg:order-1 font-mono text-[10px] sm:text-[12px]">
              {/* SORT BY */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsSortOpen(!isSortOpen);
                    setIsTypeOpen(false);
                  }}
                  className="inline-flex items-center gap-1 sm:gap-1.5 font-semibold tracking-[0.1em] sm:tracking-[0.14em] uppercase text-obsidian hover:text-black transition-colors"
                >
                  <span className="text-graphite font-medium">SORT:</span>
                  <span className="text-obsidian underline underline-offset-4 decoration-obsidian/30 max-w-[120px] xs:max-w-none truncate">
                    {selectedSort === "BESTSELLER" && "BESTSELLER"}
                    {selectedSort === "PRICE_ASC" && "PRICE: LOW-HIGH"}
                    {selectedSort === "PRICE_DESC" && "PRICE: HIGH-LOW"}
                    {selectedSort === "NAME" && "SHADE CODE"}
                  </span>
                  <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2] shrink-0" />
                </button>

                {isSortOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 sm:w-52 bg-white border border-black/10 rounded-lg shadow-xl py-1.5 z-50 text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider">
                    {(["BESTSELLER", "PRICE_ASC", "PRICE_DESC", "NAME"] as SortOption[]).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSelectedSort(opt);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 hover:bg-neutral-50 transition-colors ${selectedSort === opt ? "text-obsidian font-bold bg-[#F5F6F6]" : "text-graphite"
                          }`}
                      >
                        {opt === "BESTSELLER" && "Bestseller"}
                        {opt === "PRICE_ASC" && "Price: Low to High"}
                        {opt === "PRICE_DESC" && "Price: High to Low"}
                        {opt === "NAME" && "Shade Code"}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile TYPE Filter */}
              <div className="relative lg:hidden">
                <button
                  type="button"
                  onClick={() => {
                    setIsTypeOpen(!isTypeOpen);
                    setIsSortOpen(false);
                  }}
                  className="inline-flex items-center gap-1 font-semibold tracking-[0.08em] uppercase text-obsidian hover:text-black"
                >
                  <span className="text-graphite font-medium">TYPE:</span>
                  <span className="text-obsidian underline underline-offset-4 decoration-obsidian/30 max-w-[95px] truncate">{selectedType}</span>
                  <ChevronDown className="w-3 h-3 stroke-[2] shrink-0" />
                </button>

                {isTypeOpen && (
                  <div className="absolute top-full right-0 mt-2 w-44 bg-white border border-black/10 rounded-lg shadow-xl py-1.5 z-50 text-[10px] font-mono font-semibold uppercase tracking-wider">
                    {(["ALL", "Starter System", "Gloss & Toner"] as TypeFilter[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setSelectedType(t);
                          setIsTypeOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 hover:bg-neutral-50 transition-colors ${selectedType === t ? "text-obsidian font-bold bg-[#F5F6F6]" : "text-graphite"
                          }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Items available count */}
          <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.16em] sm:tracking-[0.2em] text-graphite uppercase mb-3.5 sm:mb-4 px-0.5">
            <span className="hidden xs:inline">AIR-DRIVEN DISPENSER: ALLOCATED</span>
            <span className="ml-auto">({filteredAndSortedProducts.length} FORMULAS AVAILABLE)</span>
          </div>

          {/* Product Grid - 2 cols on mobile, 4 cols on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 xs:gap-3.5 sm:gap-6 lg:gap-8">
            {filteredAndSortedProducts.map((item) => {
              const inWishlist = isInWishlist(`best-${item.id}`);

              return (
                <div key={item.id} className="group flex flex-col">
                  {/* Portrait Image Container */}
                  <div className="relative aspect-[2/3] w-full rounded-md sm:rounded-lg overflow-hidden bg-[#E2E5E4] shadow-2xs group-hover:shadow-md transition-all duration-300">
                    <Link
                      href={`/product?shade=${item.id}`}
                      className="block w-full h-full relative"
                    >
                      <Image
                        src={item.images[0]}
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
                      className={`absolute top-2 right-2 sm:top-3.5 sm:right-3.5 z-20 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur shadow-2xs flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${inWishlist
                        ? "opacity-100 text-rose-600"
                        : "opacity-90 sm:opacity-0 sm:group-hover:opacity-100 text-obsidian hover:text-black"
                        }`}
                      aria-label="Wishlist"
                    >
                      <Heart
                        className={`w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 stroke-[1.5] ${inWishlist ? "fill-rose-600 text-rose-600" : ""
                          }`}
                      />
                    </button>

                    {/* Floating Pill Action Button on hover */}
                    <div className="hidden sm:flex absolute bottom-4 inset-x-0 mx-auto z-20 justify-center px-4 pointer-events-none group-hover:pointer-events-auto">
                      <Link
                        href={`/product?shade=${item.id}`}
                        className="w-full max-w-[210px] py-2.5 px-4 rounded-full bg-[#EAECEB]/95 hover:bg-obsidian text-obsidian hover:text-white backdrop-blur-md shadow-md border border-black/5 text-[11px] font-mono font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span className="truncate">ORDER SYSTEM</span>
                      </Link>
                    </div>
                  </div>

                  {/* Product Typography below Image */}
                  <Link
                    href={`/product?shade=${item.id}`}
                    className="mt-2 sm:mt-3.5 space-y-0.5 sm:space-y-1 text-left block group/link px-0.5"
                  >
                    <h3 className="font-headline font-bold text-[11px] xs:text-xs sm:text-sm tracking-wider uppercase text-obsidian group-hover/link:text-black group-hover/link:underline transition-colors truncate">
                      {item.name}
                    </h3>
                    <p className="font-mono text-[11px] xs:text-xs sm:text-sm font-semibold text-obsidian">
                      ${item.price} {item.currency}
                    </p>
                    <p className="font-body text-[10px] sm:text-[11px] text-graphite truncate hidden xs:block">
                      {item.undertone}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Technical System Highlights */}
          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-black/10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 font-mono">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-black/5">
              <div className="w-8 h-8 rounded-full bg-obsidian text-white flex items-center justify-center shrink-0">
                <RefreshCw className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-[11px] sm:text-xs uppercase tracking-wider text-obsidian">REUSABLE CANISTER</h4>
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
                <h4 className="font-bold text-[11px] sm:text-xs uppercase tracking-wider text-obsidian">NO MIXING REQUIRED</h4>
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
                <h4 className="font-bold text-[11px] sm:text-xs uppercase tracking-wider text-obsidian">30-DAY TRIAL</h4>
                <p className="font-body text-[10.5px] sm:text-[11px] text-graphite">
                  100% shade match guarantee.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom link */}
          <div className="text-center mt-10 sm:mt-16">
            <Link
              href="/#shades"
              className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono tracking-[0.16em] sm:tracking-[0.2em] uppercase text-obsidian border-b border-obsidian/40 pb-1 hover:border-obsidian hover:text-black transition-all font-semibold"
            >
              <span>EXPLORE ALL 9 SHADE FORMULAS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </main>

      {/* 3. Global Footer */}
      <EcommFooter />
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <StoreProvider>
      <Suspense fallback={<div className="min-h-screen bg-[#F5F6F6]" />}>
        <CollectionsContent />
      </Suspense>
    </StoreProvider>
  );
}
