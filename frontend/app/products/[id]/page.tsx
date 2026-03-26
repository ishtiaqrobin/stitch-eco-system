import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, Share2, Shield, Truck, RotateCcw, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { fetchProduct, fetchProducts } from '@/lib/api';
import { formatPrice, formatNumber } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, { products: related }] = await Promise.all([
    fetchProduct(params.id),
    fetchProducts({ limit: '4' }),
  ]);

  const features = [
    { icon: Shield, text: 'Authentic Product Guarantee' },
    { icon: Truck, text: 'Free Delivery on Orders ৳500+' },
    { icon: RotateCcw, text: 'Easy 7-Day Returns' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/products" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-6">
        <ChevronLeft className="w-4 h-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <div className="relative">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 border border-border">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
            {product.discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1">-{product.discount}% OFF</Badge>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-start justify-between mb-3">
            <Badge variant="secondary" className="text-xs">{product.category}</Badge>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon"><Heart className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon"><Share2 className="w-5 h-5" /></Button>
            </div>
          </div>

          <h1 className="font-headline text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className={`w-4 h-4 ${i <= Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
              ))}
            </div>
            <span className="font-medium">{product.rating}</span>
            <span className="text-gray-400 text-sm">({formatNumber(product.reviews)} reviews)</span>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-500 text-sm">{formatNumber(product.sold)} sold</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-headline text-3xl font-extrabold text-primary">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
            {product.discount > 0 && (
              <span className="text-sm font-medium text-green-600">You save {formatPrice(product.originalPrice - product.price)}</span>
            )}
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-2 mb-6 p-3 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary text-xs font-bold">S</span>
            </div>
            <div>
              <p className="text-sm font-medium">{product.seller}</p>
              <p className="text-xs text-gray-500">Verified Seller</p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">Visit Shop</Button>
          </div>

          <div className="flex gap-3 mb-6">
            <Button size="lg" className="flex-1 gap-2">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>
            <Button size="lg" variant="accent" className="flex-1">Buy Now</Button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {features.map(f => (
              <div key={f.text} className="flex items-center gap-3 text-sm text-gray-600">
                <f.icon className="w-4 h-4 text-primary flex-shrink-0" />
                {f.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-headline text-xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.filter((p: any) => p.id !== product.id).slice(0, 4).map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
