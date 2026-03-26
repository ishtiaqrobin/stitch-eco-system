import Image from 'next/image';
import Link from 'next/link';
import { Package, Heart, MapPin, Bell, CreditCard, Settings, ChevronRight, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchOrders } from '@/lib/api';
import { formatPrice } from '@/lib/utils';

const statusColors: Record<string, string> = {
  delivered: 'success',
  shipped: 'default',
  processing: 'warning',
  pending: 'outline',
};

export default async function DashboardPage() {
  const orders = await fetchOrders();

  const menuItems = [
    { icon: Package, label: 'My Orders', count: orders.length, href: '#' },
    { icon: Heart, label: 'Wishlist', count: 12, href: '#' },
    { icon: MapPin, label: 'Addresses', count: 3, href: '#' },
    { icon: Bell, label: 'Notifications', count: 5, href: '#' },
    { icon: CreditCard, label: 'Payment Methods', count: 2, href: '#' },
    { icon: Settings, label: 'Settings', count: null, href: '#' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="overflow-hidden mb-4">
            <div className="h-20 bg-gradient-to-r from-primary to-blue-700" />
            <CardContent className="pt-0 pb-4 text-center">
              <div className="relative w-16 h-16 rounded-full border-4 border-white overflow-hidden bg-gray-100 mx-auto -mt-8 mb-3">
                <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="User" fill className="object-cover" />
              </div>
              <h2 className="font-headline font-bold">Mehedi Rahman</h2>
              <p className="text-sm text-gray-500 mb-1">mehedi@example.com</p>
              <Badge variant="success" className="text-xs">Premium Member</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3">
              <nav className="space-y-1">
                {menuItems.map(item => (
                  <a key={item.label} href={item.href}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-gray-500 group-hover:text-primary" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.count !== null && (
                        <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{item.count}</span>
                      )}
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </a>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Total Orders', value: orders.length, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Wishlist Items', value: 12, icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
              { label: 'Loyalty Points', value: '2,450', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
            ].map(stat => (
              <Card key={stat.label}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-xl">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {orders.slice(0, 5).map((order: any) => (
                  <div key={order.id} className="flex items-center justify-between px-6 py-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{order.id}</p>
                      <p className="text-xs text-gray-500 truncate">{order.product}</p>
                      <p className="text-xs text-gray-400">{order.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-sm">{formatPrice(order.amount)}</span>
                      <Badge variant={statusColors[order.status] as any} className="capitalize text-xs">
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
