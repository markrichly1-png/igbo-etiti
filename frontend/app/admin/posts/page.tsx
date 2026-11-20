'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { fetchNews } from '@/lib/api/newsApi'
import { BlogPost } from '@/lib/types'
import { CalendarDays, Eye, FileText, Plus, Search, Trash2 } from 'lucide-react'
import { format } from 'date-fns'

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews().then(setPosts).finally(() => setLoading(false))
  }, [])

  const categories = useMemo(() => [...new Set(posts.map((post) => post.category))], [posts])
  const filteredPosts = useMemo(() => posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.author.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch && (category === 'all' || post.category === category)
  }), [posts, searchTerm, category])

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-primary">Publishing</p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">News posts</h1>
          <p className="mt-2 text-sm text-foreground/55">Manage articles published across the Igbo-Etiti newsroom.</p>
        </div>
        <Button asChild className="h-11 rounded-xl px-5"><Link href="/admin/posts/new"><Plus className="mr-2 h-4 w-4" />Create news post</Link></Button>
      </div>

      <Card className="overflow-hidden rounded-2xl border-border/70">
        <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-center">
          <div className="relative flex-1"><Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" /><Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search title or author" className="h-11 rounded-xl pl-10" /></div>
          <div className="flex gap-2 overflow-x-auto">
            {['all', ...categories].map((item) => (
              <Button key={item} size="sm" variant={category === item ? 'default' : 'outline'} onClick={() => setCategory(item)} className="shrink-0 rounded-full capitalize">{item}</Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{[1,2,3].map((item) => <div key={item} className="h-72 animate-pulse rounded-2xl bg-muted" />)}</div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="group overflow-hidden rounded-2xl border-border/70 py-0 shadow-[0_8px_30px_rgba(30,41,59,.04)]">
              <div className="relative h-52 overflow-hidden bg-muted">
                {post.coverImage.includes('.mp4') ? <video src={post.coverImage} muted loop autoPlay className="h-full w-full object-cover" /> : <Image src={post.coverImage} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" sizes="(max-width:768px) 100vw, 33vw" />}
                <Badge className="absolute left-4 top-4 rounded-full bg-white/95 text-[#17201c] shadow-sm">{post.category}</Badge>
              </div>
              <CardContent className="p-5">
                <div className="mb-3 flex items-center gap-2 text-xs text-foreground/50"><CalendarDays className="h-3.5 w-3.5" /><span>{format(post.date, 'MMM d, yyyy')}</span><span>•</span><span>Published</span></div>
                <h2 className="line-clamp-2 min-h-12 text-lg font-bold leading-6">{post.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-foreground/55">{post.content}</p>
                <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
                  <p className="max-w-[55%] truncate text-xs font-medium text-foreground/50">By {post.author}</p>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" asChild className="rounded-lg"><Link href={`/blog/${post.slug}`}><Eye className="mr-1.5 h-4 w-4" />View</Link></Button>
                    <Button variant="ghost" size="sm" title="Delete post" className="rounded-lg text-destructive hover:bg-destructive/5 hover:text-destructive" onClick={() => setPosts((current) => current.filter((item) => item.id !== post.id))}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="rounded-2xl border-dashed"><CardContent className="py-16 text-center"><FileText className="mx-auto h-8 w-8 text-foreground/25" /><p className="mt-3 font-semibold">No news posts found</p><p className="mt-1 text-sm text-foreground/50">Try another search or publish a new article.</p></CardContent></Card>
      )}
    </div>
  )
}
