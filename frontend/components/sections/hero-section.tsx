'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, FileText, FileUser, Map, MapMinus, MapPin, MapPinHouse, MessageCircle, Pen, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'

const deskLinks = [
  {
    href: '/services/identification',
    index: '01',
    title: 'Local Government ID',
    description: 'Apply for official identification.',
    icon: FileUser,
  },
  {
    href: '/services/birth-certificate',
    index: '02',
    title: 'Birth Certificate',
    description: 'Register and collect vital records.',
    icon: FileText,
  },
  {
    href: '/verify',
    index: '03',
    title: 'Verify a document',
    description: 'Confirm certificates issued by this LGA.',
    icon: ShieldCheck,
  },
]



export function HeroSection() {

  const heroTexts =[
  "Roads, Drainage and Public Infrastructure",
  "Primary Healthcare and Maternal Care",
  "Education and Youth Employment",
  "Agriculture and Local Business Development",
  "Security and Community Peacebuilding",
  "Clean Water, Sanitation and Waste Management",
  "Transparent and Accountable Governance"
]
const[heroText, setHeroText]=useState('Welcome')

let interval;
let timeout;
let index = 0;

const changeHeroText=()=>{
interval = setInterval(()=>{
  
  index+=1;
  let n=0;
  const newText = (heroTexts[index %heroTexts.length])
  setHeroText(newText)
 



},4000)

}

useEffect(()=>{
  changeHeroText()
},[])

  return (
    <section className="landing-band bg-muted relative overflow-hidden">
      {/* <div aria-hidden className="hero-watermark" /> */}

      <div className="landing-wrap relative">
        <div className="landing-hero">
          <div className="flex flex-col justify-center md:-mt-40">
            <p className="eyebrow text-gray-600">Enugu State, Nigeria</p>

            <h1 className="mt-5 max-w-xl font-sans text-[2.75rem] text-center md:text-left font-black leading-[0.92] tracking-[-0.04em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="font-[800] scale-[1.4] text-40xl">Igbo-Etiti</span>
              <span className="mt-2 block font-[500] text-gray-600">Local Government</span>
            </h1>

            <p className="mt-5 bgMover text-transparent bg-clip-text bg-gradient-to-r from-foreground/90 to-transparent max-w-lg font-sans text-md md:text-xl italic leading-snug  md:text-2xl">
              {heroText}
            </p>

             <div className="hero-stage rounded-[10px]  bg-primary/50 overflow-hidden md:hidden block">
            <figure className="hero-portrait  ">
              <Image
                src="/lgaChairman.png"
                alt="Hon. Martins Ugwu-Amadieze O., Executive Chairman of Igbo-Etiti Local Government"
                fill
                priority
                sizes="(max-width: 960px) 100vw, 40vw"
                className="object-cover object-top"
              />
              <div className="hero-portrait__shade" />
              <Image
                src="/coatOfArm.png"
                alt=""
                
                className="hero-portrait__seal h-[30px] animate pulse opacity-60 w-[30px] md:h-[72px] md:w-[72px] rounded-full ani"
              />
              <figcaption className="hero-portrait__caption">
                
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                  Executive Chairman
                </p>
                
                <p className="mt-1 font-display text-2xl leading-tight md:text-2xl">
                  HON. MARTINS UGWU-AMADIEZE O.
                </p>
              </figcaption>
            </figure>

            <div className="hero-desk" role="navigation" aria-label="Priority services">
               <p className="mt-1 text-md leading-relaxed text-gray-700 p-4 md:text-2xl">
                 "It is time to upgrade infrastructure and expand empowerment opportunities across our council area. We are leaving no stone unturned"
                </p><br></br>
            </div>
          </div>

            
           
            <p className="mt-4 hidden md:block  max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg itallics">
              The official e-governance portal for records, development updates, and direct contact with the administration in Ogbede.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">

              
              <Link
                href="/services"
                className="inline-flex items-center gap-2 shadow-sm rounded-lg border border-[var(--gold)] px-5 py-3 text-sm font-semibold text-[var(--gold)] transition hover:brightness-110"
              >
                Access services
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/verify"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-[var(--gold)] shadow-sm hover:text-[var(--gold)]"
              >
                <ShieldCheck className="h-4 w-4" />
                Verify a document
              </Link>
              <Link
                href="/anonymous-message"
                className="inline-flex items-center rounded-lg border-b border-b-[2px] border-muted-foreground shadow-md gap-2 px-2 py-3 text-sm font-semibold text-muted-foreground transition hover:text-[var(--gold)]"
              >
                
                Write to us
                <Pen className="h-4 w-4" />
              </Link>
            </div>

            <dl className="flex mt-4 px-6 justify-between">
              <div>
                <dt className='mb-4'>Headquarters</dt>
                <dd className="flex items-center gap-1.5">
                  <MapPin className="h-6 w-6 animate-bounce text-[var(--gold)]" />
                  Ogbede
                </dd>
              </div>
              <div>
                <dt className='mb-4'>Wards</dt>
                
                <dd className="flex items-center gap-1.5">
                  <MapPinHouse className="h-6 w-6 text-[var(--gold)] font-[800]" />
                  20</dd>
              </div>
              <div>
                <dt className='mb-4'>Land area</dt>
                <dd  className="flex items-center gap-1.5">
                  <Map className="h-6 w-6 font-bold text-[var(--gold)]" />
                  325 km²</dd>
              </div>
              {/* <div>
                <dt>Office hours</dt>
                <dd>Mon to Fri, 8am to 5pm</dd>
              </div> */}
            </dl>
          </div>

          <div className="hero-stage rounded-tl-[40px] rounded-tr-[40px] bg-primary/50 shadow-lg hidden md:block overflow-hidden md:rounded-tl-md">
            <figure className="hero-portrait  ">
              <Image
                src="/lgaChairman.png"
                alt="Hon. Martins Ugwu-Amadieze O., Executive Chairman of Igbo-Etiti Local Government"
                fill
                priority
                sizes="(max-width: 960px) 100vw, 40vw"
                className="object-cover object-top"
              />
              <div className="hero-portrait__shade" />
              <Image
                src="/coatOfArm.png"
                alt=""
                width={72}
                height={72}
                className="hero-portrait__seal rounded-full animate-pulse"
              />
              <figcaption className="hero-portrait__caption">
                
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                  Executive Chairman
                </p>
                
                <p className="mt-1 font-display text-2xl leading-tight md:text-2xl">
                HON. MARTINS UGWU-AMADIEZE O.
                </p>
              </figcaption>
            </figure>

            <div className="hero-desk" role="navigation" aria-label="Priority services">
               <p className="mt-1 text-md leading-relaxed text-gray-700 p-4 md:text-2xl">
                 "It is time to upgrade infrastructure and expand empowerment opportunities across our council area. We are leaving no stone unturned"
                </p><br></br>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
