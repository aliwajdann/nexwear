"use client";

import { ShoppingBag, User, AlignJustify, X } from "lucide-react";
import { useState, useEffect } from "react";
import { selectCartCount } from "@/redux/cartSelectors";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "@/redux/drawerSlice";
import { UserButton, Show, useUser } from "@clerk/nextjs";
import HeaderBar from "./HeaderBar";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/logo.png";
import Image from "next/image";
import dynamic from "next/dynamic";
const CartDrawer = dynamic(() => import("./CartDrawer"), { ssr: false });

export default function FixedHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const { user } = useUser();

  useEffect(() => setHasMounted(true), []);

  // admin check preserved
  const allowedAdminEmails = [
    "aliwajdan.it@gmail.com",
    "mominabbbasminhas5@email.com",
  ];
  const isAdmin =
    user && allowedAdminEmails.includes(user?.primaryEmailAddress?.emailAddress || "");

  // scroll detection (simple: > 25px)
  useEffect(() => {
    const onScroll = () => setIsScrolled((window.scrollY || 0) > 25);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCartClick = () => dispatch(toggle());
  const toggleMenu = () => setIsMenuOpen((s) => !s);
  const closeMenu = () => setIsMenuOpen(false);

  // hero is white, so everything stays dark
  const iconColor = "text-gray-900";

  const menuItems = [
    { name: "New In", href: "/categories/new-in" },
    { name: "Lingerie", href: "/categories/lingerie" },
    { name: "Sets", href: "/categories/sets" },
    { name: "Bestsellers", href: "/categories/bestsellers" },
    { name: "Provocative", href: "/categories/provocative" },
    { name: "Bras", href: "/categories/bras" },
    { name: "Swim", href: "/categories/swim" },
    { name: "Nightwear", href: "/categories/nightwear" },
    { name: "Hosiery", href: "/categories/hosiery" },
    { name: "Gifts", href: "/categories/gifts" },
    { name: "Clothing", href: "/categories/clothing" },
    { name: "Archive", href: "/categories/archive" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <div className="relative z-50 bg-[#CC0D14]">
          <HeaderBar />
        </div>

        {/* Header container */}
        <header className="relative md:px-3 md:py-1 overflow-hidden">
          {/* Sliding white background (comes down from the top on scroll) */}
          <div
            aria-hidden
            className={`absolute inset-x-0 top-0 h-full pointer-events-none transition-transform duration-[600ms] ease-[cubic-bezier(.2,.9,.2,1)] ${isScrolled ? "translate-y-0" : "-translate-y-full"
              }`}
            style={{ willChange: "transform" }}
          >
            <div className="w-full h-full bg-white" />
          </div>

          {/* Header content */}
          <div
            className={`relative flex items-center justify-between h-14 px-4 md:px-6 ${iconColor}`}
            role="navigation"
            aria-label="Main"
          >
            {/* Left: Hamburger */}
            <div className="flex items-center">
              <button
                onClick={toggleMenu}
                aria-label="Open menu"
                className="flex gap-2 items-center justify-center rounded hover:opacity-90 transition"
              >
                <AlignJustify className={`w-5 h-5 ${iconColor}`} />
                <span className={`hidden md:inline ${iconColor}`}>Menu</span>
              </button>
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <a href="/" className="inline-block">
                <Image
                  src={logo}
                  height={100}
                  className="w-[90%] md:w-[100%] mt-3"
                  alt="Velano"
                />
              </a>
            </div>

            {/* Right: Account + Cart */}
            <div className="flex items-center md:gap-2 gap-1">
              <Show when="signed-in">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-700">
                    Hi, {user?.firstName || "User"}!
                  </span>
                  <UserButton appearance={{ elements: { avatarBox: "w-7 h-7" } }} />
                </div>
              </Show>

              <Show when="signed-out">
                <a href="/sign-in" className="p-1 rounded flex items-center">
                  <User className={`w-5 h-5 ${iconColor}`} />
                </a>
              </Show>

              <button
                onClick={handleCartClick}
                className="relative p-1 rounded"
                aria-label="Open cart"
              >
                <ShoppingBag className={`w-5 h-5 ${iconColor}`} />
                {hasMounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Slide menu */}
      <div
        className={`fixed top-0 left-0 h-full z-[9999] bg-white transform transition-transform duration-400 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } w-full md:w-[30%] shadow-lg`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <span className="text-md tracking-[0.18em]">Menu</span>
            <button onClick={closeMenu} className="p-2 rounded-full">
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-6 text-sm">
            <ul className="px-6 space-y-1">
              {menuItems.map((m, i) => (
                <li key={i}>
                  <a
                    onClick={closeMenu}
                    href={m.href}
                    className="block w-full text-sm py-3 border-b border-gray-100 hover:bg-gray-50"
                  >
                    {m.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 px-6 border-t pt-4 space-y-2">
              <a onClick={closeMenu} href="/about" className="block text-sm py-3 border-b">About Us</a>
              <a onClick={closeMenu} href="/contact" className="block text-sm py-3 border-b">Help</a>
              <a onClick={closeMenu} href="/shipping" className="block text-sm py-3 border-b">Shipping</a>
              <a onClick={closeMenu} href="/returns" className="block text-sm py-3 border-b">Returns</a>
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 z-[888]"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
}