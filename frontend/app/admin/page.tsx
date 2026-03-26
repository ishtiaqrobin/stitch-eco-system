import { TrendingUp, Users, ShoppingBag, Package, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fetchStats, fetchOrders } from '@/lib/api';
import { formatPrice, formatNumber } from '@/lib/utils';

const statusIcons: Record<string, any> = {
  delivered: CheckCircle,
  shipped: TrendingUp,
  processing: Clock,
  pending: AlertCircle,
};
const statusColors: Record<string, string> = {
  delivered: 'text-green-600',
  shipped: 'text-blue-600',
  processing: 'text-yellow-600',
  pending: 'text-gray-500',
};

export default async function AdminPage() {
  const [stats, orders] = await Promise.all([fetchStats(), fetchOrders()]);

  const kpis = [
    { label: 'Total Revenue', value: formatPrice(stats.totalSales), change: '+23.5%', positive: true, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Orders', value: formatNumber(stats.totalOrders), change: '+12.1%', positive: true, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Users', value: formatNumber(stats.totalUsers), change: '+8.4%', positive: true, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Listed Products', value: formatNumber(stats.totalProducts), change: '+5.2%', positive: true, icon: Package, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const revenueCards = [
    { label: "Today's Revenue", value: formatPrice(stats.revenue.today) },
    { label: "This Week", value: formatPrice(stats.revenue.week) },
    { label: "This Month", value: formatPrice(stats.revenue.month) },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-headline text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">UniMart Platform Overview</p>
        </div>
        <Badge className="bg-green-100 text-green-700 text-xs">● System Online</Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map(kpi => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 ${kpi.bg} rounded-lg flex items-center justify-center`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <span className={`text-xs font-medium ${kpi.positive ? 'text-green-600' : 'text-red-500'}`}>{kpi.change}</span>
              </div>
              <p className="font-headline font-bold text-xl mb-0.5">{kpi.value}</p>
              <p className="text-xs text-gray-500">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {revenueCards.map(r => (
          <Card key={r.label} className="bg-gradient-to-br from-primary to-blue-700 text-white border-0">
            <CardContent className="p-4">
              <p className="text-blue-100 text-sm mb-1">{r.label}</p>
              <p className="font-headline font-bold text-2xl">{r.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      {['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {orders.map((order: any) => {
                      const Icon = statusIcons[order.status];
                      return (
                        <tr key={order.id} className="hover:bg-muted/50">
                          <td className="px-4 py-3 font-mono text-xs text-gray-500">{order.id}</td>
                          <td className="px-4 py-3 font-medium">{order.customer}</td>
                          <td className="px-4 py-3 text-gray-600 truncate max-w-[120px]">{order.product}</td>
                          <td className="px-4 py-3 font-medium">{formatPrice(order.amount)}</td>
                          <td className="px-4 py-3">
                            <div className={`flex items-center gap-1.5 ${statusColors[order.status]}`}>
                              <Icon className="w-3.5 h-3.5" />
                              <span className="capitalize text-xs font-medium">{order.status}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-400 text-xs">{order.date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2">
              {[
                { label: 'Manage Products', href: '/products', icon: Package },
                { label: 'View Sellers', href: '/sellers', icon: Users },
                { label: 'All Orders', href: '/dashboard', icon: ShoppingBag },
                { label: 'Platform Analytics', href: '#', icon: TrendingUp },
              ].map(a => (
                <a key={a.label} href={a.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group">
                  <a.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium group-hover:text-primary">{a.label}</span>
                </a>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Platform Health</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              {[
                { label: 'API Response', status: '98ms', ok: true },
                { label: 'DB Status', status: 'Healthy', ok: true },
                { label: 'Pending Reviews', status: stats.pendingOrders, ok: false },
                { label: 'Active Listings', status: formatNumber(stats.activeListings), ok: true },
              ].map(h => (
                <div key={h.label} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{h.label}</span>
                  <span className={`font-medium text-xs ${h.ok ? 'text-green-600' : 'text-orange-500'}`}>{h.status}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
