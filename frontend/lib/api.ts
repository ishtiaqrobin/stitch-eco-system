const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchProducts(params?: Record<string, string>) {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  const res = await fetch(`${API_BASE}/api/products${query}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProduct(id: string) {
  const res = await fetch(`${API_BASE}/api/products/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/api/categories`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function fetchSellers() {
  const res = await fetch(`${API_BASE}/api/sellers`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch sellers');
  return res.json();
}

export async function fetchSeller(id: string) {
  const res = await fetch(`${API_BASE}/api/sellers/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch seller');
  return res.json();
}

export async function fetchOrders() {
  const res = await fetch(`${API_BASE}/api/orders`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

export async function fetchPosts() {
  const res = await fetch(`${API_BASE}/api/posts`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function fetchFlashDeals() {
  const res = await fetch(`${API_BASE}/api/flash-deals`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch flash deals');
  return res.json();
}

export async function fetchStats() {
  const res = await fetch(`${API_BASE}/api/stats`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}
