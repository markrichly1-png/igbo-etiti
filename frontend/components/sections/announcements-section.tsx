import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { fetchNews } from '@/lib/api/newsApi'

export async function AnnouncementsSection() {
  const featuredPosts = (await fetchNews()).slice(0, 3)
  const [featured, ...rest] = featuredPosts

  return (
    <section className="landing-band paper-panel py-16 md:py-20">
      <div className="landing-wrap">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="eyebrow">Bulletin</p>
            <h2 className="text-3xl md:text-5xl">News & announcements</h2>
            <div className="gold-rule" />
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-[var(--ink)] underline decoration-[var(--gold)] underline-offset-4 transition hover:text-[var(--gold)]"
          >
            All news
          </Link>
        </div>

        {featuredPosts.length === 0 ? (
          <div className="border border-dashed border-border py-16 text-center text-muted-foreground">
            No news articles available yet.
          </div>
        ) : (
          <div className="landing-news">
            {featured ? (
              <Link href={`/blog/${featured.slug}`} className="group block overflow-hidden border border-border">
                <div className="relative h-64 bg-muted md:h-80">
                  {featured.coverImage?.includes('.mp4') ? (
                    <video
                      muted
                      playsInline
                      loop
                      src={featured.coverImage}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={featured.coverImage}
                      alt={featured.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 960px) 100vw, 60vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
                      {featured.category}
                    </span>
                    <h3 className="mt-2 text-2xl leading-tight md:text-3xl">{featured.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-white/75">{featured.content}</p>
                  </div>
                </div>
              </Link>
            ) : null}

            <div className="flex flex-col divide-y divide-border border border-border">
              {rest.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-4 p-5 transition hover:bg-muted/60">
                  <div className="relative hidden h-24 w-28 shrink-0 overflow-hidden bg-muted sm:block">
                    {post.coverImage?.includes('.mp4') ? (
                      <video muted playsInline src={post.coverImage} className="h-full w-full object-cover" />
                    ) : (
                      <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="112px" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--gold)]">
                      {post.category}
                    </p>
                    <h3 className="mt-1 font-sans text-base font-semibold leading-snug group-hover:text-[var(--gold)]">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {format(post.date, 'MMM d, yyyy')}
                    </p>
                  </div>
                </Link>
              ))}
              {rest.length === 0 ? (
                <p className="p-6 text-sm text-muted-foreground">More stories will appear here.</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
