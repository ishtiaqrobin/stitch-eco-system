import Image from 'next/image';
import Link from 'next/link';
import { Star, Users, ShoppingBag, BadgeCheck, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { fetchSeller } from '@/lib/api';
import { formatNumber } from '@/lib/utils';

export default async function SellerDetailPage({ params }: { params: { id: string } }) {
  const seller = await fetchSeller(params.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/sellers" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-6">
        <ChevronLeft className="w-4 h-4" /> Back to Sellers
      </Link>

      <div className="bg-white rounded-xl border border-border overflow-hidden mb-8">
        <div className="h-48 bg-gradient-to-r from-primary via-blue-700 to-blue-900" />
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between -mt-16 mb-4">
            <div className="flex items-end gap-4">
              <div className="relative w-28 h-28 rounded-full border-4 border-white overflow-hidden bg-gray-100">
                <Image src={seller.avatar} alt={seller.name} fill className="object-cover" />
              </div>
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="font-headline text-2xl font-bold">{seller.name}</h1>
                  {seller.verified && <BadgeCheck className="w-6 h-6 text-primary fill-primary" />}
                </div>
                <Badge variant="outline">{seller.category}</Badge>
              </div>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button>Follow Seller</Button>
              <Button variant="outline">Message</Button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{seller.rating}</span>
              <span className="text-gray-500 text-sm">rating</span>
            </div>
            <div className="flex items-center gap-1">
              <ShoppingBag className="w-4 h-4 text-primary" />
              <span className="font-medium">{formatNumber(seller.sales)}</span>
              <span className="text-gray-500 text-sm">sales</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-medium">{formatNumber(seller.followers)}</span>
              <span className="text-gray-500 text-sm">followers</span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="font-headline text-xl font-bold mb-4">Products by {seller.name}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {seller.products?.map((p: any) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
