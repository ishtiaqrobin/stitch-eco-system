'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { formatPrice, formatNumber } from '@/lib/utils';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  seller: string;
  sold: number;
  discount: number;
  badge?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-white rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          {product.badge && (
            <Badge className="absolute top-2 left-2 bg-accent text-white text-xs">{product.badge}</Badge>
          )}
          {product.discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">-{product.discount}%</Badge>
          )}
          <button
            onClick={e => { e.preventDefault(); setLiked(!liked); }}
            className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
        </div>
        <div className="p-3">
          <p className="text-xs text-primary font-medium mb-1">{product.category}</p>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 leading-snug">{product.name}</h3>
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-gray-400">({formatNumber(product.reviews)})</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-headline font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="w-full gap-1.5 text-xs"
            variant={added ? 'accent' : 'default'}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {added ? 'Added!' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </Link>
  );
}
