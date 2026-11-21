'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, User } from 'lucide-react'
import { selectCartCount } from "@/redux/cartSelectors"
import { useSelector, useDispatch } from "react-redux"
import { toggle } from "@/redux/drawerSlice"
import { UserButton, Show, useUser } from "@clerk/nextjs"
import CartDrawer from "./CartDrawer"
import Image from 'next/image'
import logo from '@/logo-v.png'

const NewHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  const dispatch = useDispatch()
  const cartCount = useSelector(selectCartCount)
  const { user } = useUser()

  const allowedAdminEmails = [
    "aliwajdan.it@gmail.com",
    "mominabbbasminhas5@email.com"
  ]

  const isAdmin = user && allowedAdminEmails.includes(user?.primaryEmailAddress?.emailAddress || "")

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      {/* Main Header */}
      <header className={`fixed top-3 left-1/2 transform -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-6xl z-50 transition-all duration-300 bg-black/60 border border-white/20 rounded-full px-4 py-2 flex items-center justify-between hover:shadow-lg hover:shadow-black/10 md:top-5 sm:top-4 sm:px-5 sm:py-3`}>
        {/* Left Nav */}
        <div className="flex items-center gap-8 md:gap-5">
          {/* Mobile Hamburger */}
          <button
            onClick={toggleMobileMenu}
            className={`md:hidden flex flex-col p-1 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}
          >
            <span className="w-5 h-0.5 bg-white/80 mb-0.5 rounded-sm" />
            <span className="w-5 h-0.5 bg-white/80 mb-0.5 rounded-sm" />
            <span className="w-5 h-0.5 bg-white/80 rounded-sm" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex gap-8 lg:gap-8">
            {['jewellery', 'skincare', 'undergarments'].map(category => (
              <Link key={category} href={`/category/${category}`}>
                <span className="text-white/90 text-sm font-medium uppercase tracking-wider hover:text-white hover:-translate-y-0.5 relative group">
                  {category.replace('-', ' ')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="block">
            <div className="bg-transparent w-12 h-10 md:w-15 md:h-10 rounded-2xl flex items-center justify-center">
              <Image src={logo} alt="logo" className="rounded-2xl" />
            </div>
          </Link>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-8 md:gap-5">
          <nav className="hidden md:flex gap-8 lg:gap-8">
            {['about', 'contact'].map(page => (
              <Link key={page} href={`/${page}`}>
                <span className="text-white/90 text-sm font-medium uppercase tracking-wider hover:text-white hover:-translate-y-0.5 relative group">
                  {page.replace('-', ' ')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
                </span>
              </Link>
            ))}
          </nav>

          {/* Auth - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Show when="signed-in">
              {isAdmin && (
                <Link href="/admin" className="text-white/90 text-sm font-medium uppercase tracking-wider hover:text-white hover:-translate-y-0.5 relative group">
                  Admin
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
                </Link>
              )}
              <div className="flex items-center space-x-3">
                <span className="text-sm text-white/90">Hi, {user?.firstName || 'User'}!</span>
                <UserButton appearance={{ elements: { avatarBox: "w-8 h-8 hover:scale-105 transition-transform" } }} />
              </div>
            </Show>
            <Show when="signed-out">
              <Link href="/sign-in" className="text-white text-sm uppercase tracking-wider flex items-center gap-2 hover:underline">
                <User className="w-4 h-4" />
                Account
              </Link>
            </Show>
          </div>

          {/* Cart */}
          <div className="relative">
            <button onClick={() => dispatch(toggle())} className="w-9 h-9 sm:w-8 sm:h-8 bg-white/20 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-105">
              <ShoppingCart className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-white" />
            </button>
            {hasMounted && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#681C1C] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-[20px] transition-all duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col h-full overflow-y-auto pt-24 pb-20 px-6 gap-10 items-center">
          <button onClick={closeMobileMenu} className="absolute top-20 right-8 text-white text-3xl hover:text-pink-400 hover:rotate-90">×</button>

          {/* Auth Mobile */}
          <Show when="signed-in">
            {isAdmin && (
              <Link href="/admin" onClick={closeMobileMenu} className="text-white text-2xl uppercase font-medium tracking-wide hover:text-pink-400 hover:scale-110">
                Admin
              </Link>
            )}
            <div className="flex items-center gap-3">
              <span className="text-white text-xl">Hi, {user?.firstName || 'User'}!</span>
              <UserButton appearance={{ elements: { avatarBox: "w-8 h-8 hover:scale-105 transition-transform" } }} />
            </div>
          </Show>
          <Show when="signed-out">
            <Link href="/sign-in" onClick={closeMobileMenu} className="text-white text-2xl uppercase font-medium tracking-wide hover:text-pink-400 hover:scale-110 flex items-center gap-2">
              <User className="w-5 h-5" />
              Account
            </Link>
          </Show>

          {/* Mobile Nav */}
          {['jewellery', 'skin-care', 'under-garments', 'about', 'contact'].map(path => (
            <Link key={path} href={`/category/${path}`} onClick={closeMobileMenu} className="text-white text-2xl font-medium uppercase tracking-wide hover:text-pink-400 hover:scale-110">
              {path.replace('-', ' ')}
            </Link>
          ))}

          {/* Cart Mobile */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => {
                dispatch(toggle())
                closeMobileMenu()
              }}
              className="flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 text-white hover:bg-white/30"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {hasMounted && cartCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden" onClick={closeMobileMenu} />
      )}

      {/* Drawer */}
      {typeof window !== 'undefined' && <CartDrawer />}
    </>
  )
}

export default NewHeader
