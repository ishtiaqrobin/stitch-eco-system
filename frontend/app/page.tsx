import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Zap, Star, TrendingUp, Users, ShoppingBag, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import { fetchProducts, fetchCategories, fetchFlashDeals } from '@/lib/api';
import { formatPrice, formatNumber } from '@/lib/utils';

export default async function HomePage() {
  const [{ products }, categories, flashDeals] = await Promise.all([
    fetchProducts({ limit: '8' }),
    fetchCategories(),
    fetchFlashDeals(),
  ]);

  const stats = [
    { label: 'Happy Customers', value: '1.2M+', icon: Users },
    { label: 'Products Listed', value: '48K+', icon: ShoppingBag },
    { label: 'Verified Sellers', value: '12K+', icon: Award },
    { label: 'Daily Orders', value: '50K+', icon: TrendingUp },
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-primary via-blue-700 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">🇧🇩 Bangladesh's #1 Platform</Badge>
            <h1 className="font-headline text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Shop. Sell. <br />
              <span className="text-accent">Connect.</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-md">
              Discover millions of products, follow your favorite sellers, and experience social commerce like never before.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link href="/products">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Start Shopping
                </Button>
              </Link>
              <Link href="/social">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 gap-2">
                  <Users className="w-5 h-5" />
                  Explore Feed
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-3 max-w-sm">
            {products.slice(0, 4).map((p: { id: number; image: string; name: string; price: number }) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group relative aspect-square rounded-xl overflow-hidden bg-white/10 border border-white/20">
                <Image src={p.image} alt={p.name} fill className="object-cover opacity-90 group-hover:scale-105 transition-transform" />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-xs text-white font-medium truncate">{formatPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-headline font-bold text-xl text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent fill-accent" />
            <h2 className="font-headline text-2xl font-bold">Flash Deals</h2>
          </div>
          <Link href="/products" className="flex items-center gap-1 text-sm text-primary hover:underline">
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {flashDeals.map((deal: { id: number; product: { id: number; image: string; name: string; category: string; rating: number; reviews: number; seller: string }; flashPrice: number; endTime: string }) => (
            <Link key={deal.id} href={`/products/${deal.product.id}`} className="group">
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-video overflow-hidden bg-gray-50">
                  <Image src={deal.product.image} alt={deal.product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-accent text-white">⚡ Flash Deal</Badge>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-headline font-bold text-lg">{formatPrice(deal.flashPrice)}</p>
                    <p className="text-white/80 text-sm line-clamp-1">{deal.product.name}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="font-headline text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {categories.map((cat: { id: number; icon: string; name: string; count: number }) => (
            <Link key={cat.id} href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-border hover:border-primary hover:shadow-sm transition-all group">
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-medium text-center text-gray-700 group-hover:text-primary">{cat.name}</span>
              <span className="text-xs text-gray-400">{formatNumber(cat.count)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <h2 className="font-headline text-2xl font-bold">Featured Products</h2>
          </div>
          <Link href="/products" className="flex items-center gap-1 text-sm text-primary hover:underline">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p: { id: number; name: string; price: number; originalPrice: number; category: string; image: string; rating: number; reviews: number; seller: string; sold: number; discount: number; badge?: string }) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-headline text-3xl font-bold mb-2">Start Selling Today</h2>
            <p className="text-blue-100">Join 12,000+ sellers on UniMart and reach millions of customers</p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                Become a Seller
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
