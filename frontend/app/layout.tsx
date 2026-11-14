import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/common/navbar'
import { Footer } from '@/components/common/footer'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({
  subsets: ['latin'],
 display: 'swap',
})

export const metadata: Metadata = {
  title: 'Igbo-Etiti Local Government',
  description: 'Official website of Igbo-Etiti LGA - Services, Information, and Citizen Engagement',
  generator: 'Ezeh Mark',
  metadataBase: new URL('https://igsl.vercel.app'),
  alternates: {
    canonical: 'https://igsl.vercel.app',
  },
  keywords: [
    'Igbo-Etiti Local Government',
    'Igbo-Etiti',
    'Local Government Services',
    'Birth Certificate',
    'Government ID',
    'Citizen Portal',
    'Enugu State',
  ],
  authors: [{ name: 'Ezeh Mark' }],
  creator: 'Ezeh Mark',
  publisher: 'Igbo-Etiti Local Government',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Igbo-Etiti Local Government - Services & Citizen Engagement',
    description: 'Official portal of Igbo-Etiti Local Government - Services, Information, and Citizen Engagement',
    url: 'https://igsl.vercel.app',
    siteName: 'Igbo-Etiti Local Government',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Igbo-Etiti Local Government Portal',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Igbo-Etiti LGA - Services & Citizen Engagement',
    description: 'Official portal of Igbo-Etiti Local Government - Services, Information, and Citizen Engagement',
    images: ['/og-image.png'],
  },
  themeColor: '#faf8f3',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en"
      className="bg-background"
      style={{scrollbarWidth:'thin'}}
      suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        {/* Canonical URL */}
        <link rel="canonical" href="https://igsl.vercel.app" />
      </head>
      <body className={`${inter.className} bg-background antialiased flex flex-col  min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
          <main className="flex-1 ">
             {/* <Link href="/" className="flex items-center gap-3 font-bold top-5 left-5 text-xl md:top-5 md:left-10 absolute  md:block md:flex hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 shadow-md">
              <img 
                src="/coatOfArm.png" 
                alt="Nigerian Coat of Arms" 
                className="w-10 h-10"
              />
            </div>
            <span className="sm:inline text-gray-700 dark:text-gray-300">Igbo-Etiti</span>
          </Link> */}
            {children}
          </main>
          <Analytics />
          <Toaster richColors closeButton position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
