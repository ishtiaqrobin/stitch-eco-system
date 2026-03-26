import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const products = [
  { id: 1, name: 'Sony WH-1000XM5 Wireless Headphones', price: 12500, originalPrice: 15000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', rating: 4.8, reviews: 2341, seller: 'TechHub BD', sold: 5200, discount: 17, badge: 'Best Seller', description: 'Industry-leading noise cancellation with 30-hour battery life.' },
  { id: 2, name: 'Apple iPhone 15 Pro 256GB', price: 145000, originalPrice: 155000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400', rating: 4.9, reviews: 5120, seller: 'Apple BD Official', sold: 12000, discount: 6, badge: 'Hot', description: 'Titanium design with A17 Pro chip and 48MP camera system.' },
  { id: 3, name: 'Samsung Galaxy S24 Ultra', price: 135000, originalPrice: 150000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400', rating: 4.7, reviews: 3890, seller: 'Samsung BD', sold: 8900, discount: 10, badge: 'New', description: 'The ultimate Galaxy with built-in S Pen and Snapdragon 8 Gen 3.' },
  { id: 4, name: 'Nike Air Max 270', price: 8500, originalPrice: 12000, category: 'Fashion', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', rating: 4.6, reviews: 1876, seller: 'SportZone', sold: 3200, discount: 29, badge: 'Sale', description: 'Max Air cushioning for all-day comfort and style.' },
  { id: 5, name: 'Levi\'s 511 Slim Fit Jeans', price: 3200, originalPrice: 4500, category: 'Fashion', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', rating: 4.5, reviews: 987, seller: 'Fashion Forward', sold: 4500, discount: 29, badge: 'Popular', description: 'Classic slim fit with stretch denim for modern comfort.' },
  { id: 6, name: 'Instant Pot Duo 7-in-1', price: 9800, originalPrice: 13000, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400', rating: 4.8, reviews: 4521, seller: 'Kitchen World', sold: 7800, discount: 25, badge: 'Best Seller', description: 'Pressure cooker, slow cooker, rice cooker and more in one.' },
  { id: 7, name: 'Adidas Ultraboost 23', price: 14000, originalPrice: 18000, category: 'Fashion', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400', rating: 4.7, reviews: 2109, seller: 'SportZone', sold: 3600, discount: 22, badge: 'Sale', description: 'Responsive Boost midsole with Primeknit upper for running excellence.' },
  { id: 8, name: 'ASUS ROG Gaming Laptop', price: 95000, originalPrice: 110000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400', rating: 4.8, reviews: 1234, seller: 'TechHub BD', sold: 2100, discount: 14, badge: 'Gaming', description: 'RTX 4070, 16GB RAM, 1TB SSD for ultimate gaming performance.' },
  { id: 9, name: 'Dyson V15 Detect Vacuum', price: 55000, originalPrice: 65000, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', rating: 4.9, reviews: 876, seller: 'HomeEssentials', sold: 1800, discount: 15, badge: 'Premium', description: 'Laser dust detection and powerful suction technology.' },
  { id: 10, name: 'Kindle Paperwhite 11th Gen', price: 9500, originalPrice: 12000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', rating: 4.7, reviews: 3456, seller: 'BookWorld BD', sold: 5600, discount: 21, badge: 'Popular', description: 'Adjustable warm light, waterproof, and 10 weeks battery life.' },
  { id: 11, name: 'Zara Summer Floral Dress', price: 2800, originalPrice: 4200, category: 'Fashion', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400', rating: 4.4, reviews: 654, seller: 'Fashion Forward', sold: 2300, discount: 33, badge: 'Trending', description: 'Light and flowy summer dress with vibrant floral pattern.' },
  { id: 12, name: 'Nespresso Vertuo Coffee Maker', price: 18000, originalPrice: 22000, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400', rating: 4.6, reviews: 2198, seller: 'Kitchen World', sold: 3400, discount: 18, badge: 'New', description: 'Barcode technology for perfect coffee every time.' },
];

const categories = [
  { id: 1, name: 'Electronics', icon: '📱', count: 1250 },
  { id: 2, name: 'Fashion', icon: '👗', count: 3400 },
  { id: 3, name: 'Home & Kitchen', icon: '🏠', count: 890 },
  { id: 4, name: 'Beauty', icon: '💄', count: 640 },
  { id: 5, name: 'Sports', icon: '⚽', count: 520 },
  { id: 6, name: 'Books', icon: '📚', count: 2100 },
  { id: 7, name: 'Toys', icon: '🎮', count: 380 },
  { id: 8, name: 'Automotive', icon: '🚗', count: 290 },
];

const sellers = [
  { id: 1, name: 'TechHub BD', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100', rating: 4.9, sales: 15000, followers: 28000, verified: true, category: 'Electronics', joinDate: '2021-03-15' },
  { id: 2, name: 'Fashion Forward', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b742?w=100', rating: 4.7, sales: 8900, followers: 15000, verified: true, category: 'Fashion', joinDate: '2020-08-22' },
  { id: 3, name: 'Kitchen World', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100', rating: 4.8, sales: 6200, followers: 9500, verified: false, category: 'Home & Kitchen', joinDate: '2022-01-10' },
  { id: 4, name: 'SportZone', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', rating: 4.6, sales: 4500, followers: 7800, verified: true, category: 'Sports', joinDate: '2021-11-05' },
  { id: 5, name: 'BookWorld BD', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', rating: 4.9, sales: 3200, followers: 5400, verified: true, category: 'Books', joinDate: '2020-06-18' },
];

const orders = [
  { id: 'ORD-2024-001', customer: 'Rahim Ahmed', product: 'Sony WH-1000XM5', status: 'delivered', date: '2024-03-20', amount: 12500, items: 1 },
  { id: 'ORD-2024-002', customer: 'Karim Hassan', product: 'Nike Air Max 270', status: 'shipped', date: '2024-03-22', amount: 8500, items: 2 },
  { id: 'ORD-2024-003', customer: 'Fatema Begum', product: 'Instant Pot Duo', status: 'processing', date: '2024-03-24', amount: 9800, items: 1 },
  { id: 'ORD-2024-004', customer: 'Nadia Islam', product: 'Zara Summer Dress', status: 'pending', date: '2024-03-25', amount: 2800, items: 3 },
  { id: 'ORD-2024-005', customer: 'Mehedi Hasan', product: 'ASUS ROG Laptop', status: 'delivered', date: '2024-03-18', amount: 95000, items: 1 },
  { id: 'ORD-2024-006', customer: 'Aisha Khatun', product: 'Kindle Paperwhite', status: 'shipped', date: '2024-03-23', amount: 9500, items: 2 },
];

const posts = [
  { id: 1, user: 'Nadia Islam', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b742?w=100', content: 'Just got my new Sony headphones from TechHub BD! Amazing quality, totally worth every taka! 🎵', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', likes: 234, comments: 45, shares: 12, time: '2h ago', tags: ['#electronics', '#sony', '#unimart'] },
  { id: 2, user: 'Rahim Chowdhury', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', content: 'Summer fashion haul! Got 5 amazing pieces from Fashion Forward. Check out this beautiful floral dress! 👗✨', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600', likes: 456, comments: 89, shares: 34, time: '4h ago', tags: ['#fashion', '#summer', '#haul'] },
  { id: 3, user: 'Tasnia Begum', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100', content: 'My kitchen game is now on point with the Instant Pot! Made biriyani, dal, and even dessert today! 🍛', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600', likes: 189, comments: 67, shares: 23, time: '6h ago', tags: ['#cooking', '#kitchen', '#instantpot'] },
  { id: 4, user: 'Karim Ahmed', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100', content: 'Training with my new Adidas Ultraboost! These shoes are an absolute game changer for marathon prep! 🏃‍♂️', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600', likes: 312, comments: 54, shares: 18, time: '8h ago', tags: ['#running', '#adidas', '#fitness'] },
];

const flashDeals = [
  { id: 1, product: products[0], endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), flashPrice: 9999 },
  { id: 2, product: products[3], endTime: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(), flashPrice: 6500 },
  { id: 3, product: products[5], endTime: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(), flashPrice: 7500 },
];

const stats = {
  totalSales: 2845600,
  totalOrders: 18420,
  totalUsers: 125000,
  totalProducts: 48500,
  monthlyGrowth: 23.5,
  activeListings: 42800,
  pendingOrders: 342,
  revenue: { today: 85400, week: 524300, month: 2845600 }
};

app.get('/api/products', (req, res) => {
  const { category, search, sort, limit = 12, page = 1 } = req.query;
  let result = [...products];
  if (category && category !== 'All') result = result.filter(p => p.category === category);
  if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
  if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
  if (sort === 'popular') result.sort((a, b) => b.sold - a.sold);
  const total = result.length;
  const start = (Number(page) - 1) * Number(limit);
  result = result.slice(start, start + Number(limit));
  res.json({ products: result, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.get('/api/categories', (req, res) => res.json(categories));

app.get('/api/sellers', (req, res) => res.json(sellers));
app.get('/api/sellers/:id', (req, res) => {
  const seller = sellers.find(s => s.id === Number(req.params.id));
  if (!seller) return res.status(404).json({ error: 'Seller not found' });
  const sellerProducts = products.filter((_, i) => i % sellers.length === Number(req.params.id) - 1).slice(0, 6);
  res.json({ ...seller, products: sellerProducts });
});

app.get('/api/orders', (req, res) => res.json(orders));
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

app.get('/api/posts', (req, res) => res.json(posts));
app.get('/api/flash-deals', (req, res) => res.json(flashDeals));
app.get('/api/stats', (req, res) => res.json(stats));

app.get('/api/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.json({ products: [], sellers: [] });
  const matchedProducts = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase()));
  const matchedSellers = sellers.filter(s => s.name.toLowerCase().includes(q.toLowerCase()));
  res.json({ products: matchedProducts, sellers: matchedSellers });
});

app.listen(PORT, () => {
  console.log(`UniMart API running on http://localhost:${PORT}`);
});
