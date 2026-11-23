import { Navbar } from '@/components/common/navbar'
import { Footer } from '@/components/common/footer'
import { HeroSection } from '@/components/sections/hero-section'
import { ServicesSection } from '@/components/sections/services-section'
import { StatsSection } from '@/components/sections/stats-section'
import { ChairmanMessage } from '@/components/sections/chairman-message'
import { AnnouncementsSection } from '@/components/sections/announcements-section'

export const metadata = {
  title: 'Igbo-Etiti Government Portal',
  description: 'Official portal for Igbo-Etiti Local Government services including identification, birth certificates, and community information.',
}

export default function Home() {
  return (
    <div className="landing-shell">
      <Navbar />
      <main className="landing-main">
        <HeroSection />
        <ServicesSection />
        <section className="landing-band">
          <div className="landing-band-content">
            {/* <ChairmanMessage /> */}
        
          </div>
        </section>
        <AnnouncementsSection />
      </main>
      <Footer />
    </div>
  )
}
