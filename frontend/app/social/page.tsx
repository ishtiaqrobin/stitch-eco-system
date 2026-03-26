'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { API_URL } from '@/lib/utils';

export default function SocialFeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetch(`${API_URL}/api/posts`)
      .then(r => r.json())
      .then(data => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const toggleLike = (id: number) => {
    setLiked(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline text-2xl font-bold">Social Feed</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Following</Button>
          <Button size="sm">For You</Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold text-sm">U</span>
          </div>
          <input className="flex-1 bg-muted rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="What's on your mind?" readOnly />
          <Button size="sm">Post</Button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post: any) => (
            <div key={post.id} className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="flex items-center justify-between p-4 pb-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src={post.avatar} alt={post.user} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{post.user}</p>
                    <p className="text-xs text-gray-400">{post.time}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              <p className="px-4 text-sm text-gray-800 mb-3 leading-relaxed">{post.content}</p>

              <div className="flex flex-wrap gap-1.5 px-4 mb-3">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-xs text-primary border-primary/30">{tag}</Badge>
                ))}
              </div>

              {post.image && (
                <div className="relative aspect-video w-full">
                  <Image src={post.image} alt="Post" fill className="object-cover" />
                </div>
              )}

              <div className="px-4 py-3 flex items-center justify-between border-t border-border mt-3">
                <div className="flex items-center gap-4">
                  <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors">
                    <Heart className={`w-4 h-4 ${liked.has(post.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    {post.likes + (liked.has(post.id) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors">
                    <Share2 className="w-4 h-4" />
                    {post.shares}
                  </button>
                </div>
                <button className="text-gray-400 hover:text-primary transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
