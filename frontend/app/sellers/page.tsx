import Image from 'next/image';
import Link from 'next/link';
import { Star, Users, ShoppingBag, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { fetchSellers } from '@/lib/api';
import { formatNumber } from '@/lib/utils';

export default async function SellersPage() {
  const sellers = await fetchSellers();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold mb-2">Top Sellers</h1>
        <p className="text-gray-500">Discover trusted sellers on UniMart</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellers.map((seller: any) => (
          <Card key={seller.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-24 bg-gradient-to-r from-primary to-blue-700" />
            <CardContent className="pt-0 pb-6">
              <div className="relative -mt-12 mb-4">
                <div className="relative w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-gray-100">
                  <Image src={seller.avatar} alt={seller.name} fill className="object-cover" />
                </div>
                {seller.verified && (
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-white">
                    <BadgeCheck className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                )}
              </div>

              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-headline font-bold text-lg">{seller.name}</h3>
                  <Badge variant="outline" className="text-xs mt-1">{seller.category}</Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{seller.rating}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-muted rounded-lg p-3 text-center">
                  <ShoppingBag className="w-4 h-4 text-primary mx-auto mb-1" />
                  <p className="font-bold text-sm">{formatNumber(seller.sales)}</p>
                  <p className="text-xs text-gray-500">Sales</p>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <Users className="w-4 h-4 text-primary mx-auto mb-1" />
                  <p className="font-bold text-sm">{formatNumber(seller.followers)}</p>
                  <p className="text-xs text-gray-500">Followers</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">Follow</Button>
                <Link href={`/sellers/${seller.id}`} className="flex-1">
                  <Button size="sm" variant="outline" className="w-full">View Shop</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
