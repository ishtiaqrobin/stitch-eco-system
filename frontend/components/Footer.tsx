import Link from 'next/link';
import { Store, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Store className="w-6 h-6 text-primary" />
              <span className="font-headline text-xl font-extrabold text-white">UniMart</span>
            </div>
            <p className="text-sm text-gray-400 mb-4 max-w-xs">
              Bangladesh's leading social commerce platform. Shop, sell, and connect with millions of users.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {[
            { title: 'Shop', links: ['All Products', 'Flash Deals', 'New Arrivals', 'Best Sellers', 'Categories'] },
            { title: 'Sell', links: ['Become a Seller', 'Seller Dashboard', 'Seller Guide', 'Commission Rates', 'Seller Support'] },
            { title: 'Support', links: ['Help Center', 'Track Order', 'Returns', 'Contact Us', 'Live Chat'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-headline font-semibold text-white mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l}><a href="#" className="text-sm hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© 2024 UniMart. All rights reserved. Made in Bangladesh 🇧🇩</p>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
              <a key={l} href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
