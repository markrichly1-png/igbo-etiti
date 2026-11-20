'use client'

import { useEffect, useMemo, useState } from 'react'
import { BlogCard } from '@/components/cards/blog-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fetchPaginatedNews } from '@/lib/api/newsApi'
import { BlogPost } from '@/lib/types'
import { ArrowLeft, ArrowRight, CalendarDays, Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'

const NEWS_PAGE_SIZE = 9

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [isChangingPage, setIsChangingPage] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const loadPosts = async (pageNumber: number) => {
    try {
      setIsChangingPage(pageNumber !== 1)
      setLoading(pageNumber === 1)
      const { items, page, totalPages: pages } = await fetchPaginatedNews(pageNumber, NEWS_PAGE_SIZE)
      setPosts(items)
      setCurrentPage(page)
      setTotalPages(pages)
    } catch (error) {
      console.error('Failed to load news articles:', error)
      setPosts([])
    } finally {
      setLoading(false)
      setIsChangingPage(false)
    }
  }

  useEffect(() => { void loadPosts(1) }, [])

  const categories = useMemo(() => [...new Set(posts.map((post) => post.category))], [posts])
  const filteredPosts = useMemo(() => posts
    .filter((post) => post.status === 'published')
    .filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.content.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch && (!selectedCategory || post.category === selectedCategory)
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [posts, searchTerm, selectedCategory])

  const featured = filteredPosts[0]
  const remaining = filteredPosts.slice(1)

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#17201c]">
      <header className="border-b border-[#17201c]/10 bg-[#fdfcf8]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
              <img src="/coatOfArm.png" alt="Nigerian Coat of Arms" className="h-9 w-9 object-contain" />
            </span>
            <span>
              <span className="block text-sm font-bold leading-tight">Igbo-Etiti</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7d6a3e]">Newsroom</span>
            </span>
          </Link>
          <Link href="/" className="hidden items-center gap-2 text-sm font-semibold sm:flex"><ArrowLeft className="h-4 w-4" />Back to website</Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pt-14">
        <div className="mb-8 flex flex-col gap-6 border-b border-[#17201c]/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#9b762f]">Latest from Igbo-Etiti</p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">News &amp; Community Updates</h1>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#17201c]/60">Announcements, public projects, leadership updates and stories from across the local government area.</p>
        </div>

        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-[#17201c]/8 bg-white p-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#17201c]/40" />
            <Input placeholder="Search the newsroom" className="h-11 border-0 bg-[#f7f5ef] pl-10 shadow-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
            <Button size="sm" variant={!selectedCategory ? 'default' : 'ghost'} onClick={() => setSelectedCategory('')} className="shrink-0 rounded-full">All stories</Button>
            {categories.map((category) => (
              <Button key={category} size="sm" variant={selectedCategory === category ? 'default' : 'ghost'} onClick={() => setSelectedCategory(category)} className="shrink-0 rounded-full capitalize">{category}</Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-5 md:grid-cols-3"><div className="h-[420px] animate-pulse rounded-2xl bg-[#e9e5da] md:col-span-2" /><div className="h-[420px] animate-pulse rounded-2xl bg-[#e9e5da]" /></div>
        ) : filteredPosts.length > 0 ? (
          <>
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="group mb-8 grid overflow-hidden rounded-3xl bg-[#17201c] text-white lg:grid-cols-[1.45fr_.75fr]">
                <div className="relative min-h-[300px] overflow-hidden md:min-h-[460px]">
                  {featured.coverImage.includes('.mp4') ? (
                    <video src={featured.coverImage} muted loop playsInline autoPlay className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]" />
                  ) : (
                    <Image src={featured.coverImage} alt={featured.title} fill className="object-cover transition duration-700 group-hover:scale-[1.02]" sizes="(max-width: 1024px) 100vw, 65vw" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                </div>
                <div className="flex flex-col justify-end p-7 md:p-10">
                  <span className="mb-5 w-fit rounded-full border border-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#e6c77d]">{featured.category}</span>
                  <h2 className="text-3xl font-bold leading-tight md:text-4xl">{featured.title}</h2>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-white/65">{featured.content}</p>
                  <div className="mt-8 flex items-center justify-between border-t border-white/15 pt-5 text-xs text-white/60"><span className="flex items-center gap-2"><CalendarDays className="h-4 w-4" />{format(featured.date, 'MMMM d, yyyy')}</span><ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" /></div>
                </div>
              </Link>
            )}

            {remaining.length > 0 && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {remaining.map((post) => <BlogCard key={post.id} post={post} />)}
              </div>
            )}

            <div className="mt-10 flex items-center justify-between border-t border-[#17201c]/10 pt-6">
              <Button variant="outline" onClick={() => void loadPosts(currentPage - 1)} disabled={currentPage <= 1 || isChangingPage} className="rounded-full border-[#17201c]/15 bg-transparent"><ArrowLeft className="mr-2 h-4 w-4" />Previous</Button>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#17201c]/45">Page {currentPage} / {totalPages}</p>
              <Button onClick={() => void loadPosts(currentPage + 1)} disabled={currentPage >= totalPages || isChangingPage} className="rounded-full">Next<ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </>
        ) : (
          <div className="rounded-3xl border border-dashed border-[#17201c]/15 py-20 text-center"><p className="text-lg font-semibold">No stories found</p><p className="mt-2 text-sm text-[#17201c]/50">Try another search or category.</p></div>
        )}
      </section>
    </main>
  )
}
