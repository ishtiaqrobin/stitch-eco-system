'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';

const initialCartItems = [
  { id: 1, name: 'Sony WH-1000XM5 Wireless Headphones', price: 12500, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200', seller: 'TechHub BD' },
  { id: 2, name: 'Nike Air Max 270', price: 8500, quantity: 2, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200', seller: 'SportZone' },
  { id: 3, name: 'Instant Pot Duo 7-in-1', price: 9800, quantity: 1, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=200', seller: 'Kitchen World' },
];

export default function CartPage() {
  const [items, setItems] = useState(initialCartItems);
  const [coupon, setCoupon] = useState('');

  const updateQty = (id: number, delta: number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };
  const remove = (id: number) => setItems(prev => prev.filter(i => i.id !== id));

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery = 60;
  const discount = 500;
  const total = subtotal + delivery - discount;

  if (items.length === 0) return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
      <h2 className="font-headline text-2xl font-bold mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-6">Add some products to get started!</p>
      <Link href="/products"><Button size="lg">Browse Products</Button></Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="font-headline text-2xl font-bold mb-6">Shopping Cart ({items.length} items)</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {items.map(item => (
            <Card key={item.id}>
              <CardContent className="p-4 flex gap-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm line-clamp-2 mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">Sold by {item.seller}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">{formatPrice(item.price)}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-border rounded-lg">
                        <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors rounded-l-lg">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors rounded-r-lg">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button onClick={() => remove(item.id)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-headline font-semibold mb-4">Apply Coupon</h3>
              <div className="flex gap-2">
                <Input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Enter coupon code" className="flex-1" />
                <Button variant="outline" size="sm"><Tag className="w-4 h-4" /></Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-headline font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Delivery</span><span>{formatPrice(delivery)}</span></div>
                <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatPrice(discount)}</span></div>
                <div className="border-t border-border pt-2 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
              <Button size="lg" className="w-full gap-2">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Button>
              <Link href="/products">
                <Button variant="ghost" size="sm" className="w-full mt-2">Continue Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
