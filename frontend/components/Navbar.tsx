'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Search, ShoppingCart, Heart, Bell, User, Menu, X, Store, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop' },
    { href: '/social', label: 'Feed' },
    { href: '/sellers', label: 'Sellers' },
    { href: '/dashboard', label: 'My Account' },
    { href: '/admin', label: 'Admin' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Store className="w-7 h-7 text-primary" />
              <span className="font-headline text-2xl font-extrabold text-primary">UniMart</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.slice(0, 4).map(l => (
                <Link key={l.href} href={l.href} className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-primary hover:bg-muted rounded-md transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products, sellers..."
                className="pl-9 pr-4 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="hidden md:flex">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-white rounded-full">3</Badge>
              </Button>
            </Link>
            <Link href="/dashboard" className="hidden md:flex">
              <Button size="sm" variant="outline" className="gap-1.5">
                <User className="w-4 h-4" />
                Account
              </Button>
            </Link>
            <Link href="/admin" className="hidden md:flex">
              <Button size="sm" className="gap-1.5">
                <Zap className="w-4 h-4" />
                Admin
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-3 border-t border-border">
            <div className="mb-3">
              <Input placeholder="Search products..." className="bg-muted border-0" />
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map(l => (
                <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-muted rounded-md transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
