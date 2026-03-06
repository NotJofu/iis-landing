import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, Shield, FileText, ChevronDown, Activity } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────────────────
// NOISE OVERLAY
// ─────────────────────────────────────────────────────────────────────────────
const NoiseOverlay = () => (
  <div
    className="pointer-events-none fixed inset-0 z-[9999]"
    style={{ opacity: 0.05 }}
    aria-hidden="true"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <filter id="iis-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#iis-noise)" />
    </svg>
  </div>
)

// ─────────────────────────────────────────────────────────────────────────────
// MAGNETIC BUTTON HOOK
// ─────────────────────────────────────────────────────────────────────────────
const magneticStyle = {
  transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
}
const onMagEnter = (e) => { e.currentTarget.style.transform = 'translateY(-1px) scale(1.03)' }
const onMagLeave = (e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)' }

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-4 left-1/2 z-50 flex items-center gap-6 px-5 py-2.5 transition-all duration-500"
      style={{
        transform: 'translateX(-50%)',
        borderRadius: '9999px',
        background: scrolled ? 'rgba(245,243,238,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        border: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.12)',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.12)' : 'none',
        color: scrolled ? '#111111' : '#F5F3EE',
      }}
    >
      <span className="font-mono text-sm font-bold tracking-[0.2em]">II&amp;S</span>

      <div className="hidden md:flex items-center gap-5 text-[11px] font-medium tracking-[0.12em] uppercase">
        <a href="#services" className="hover:opacity-50 transition-opacity duration-200">Services</a>
        <a href="#background" className="hover:opacity-50 transition-opacity duration-200">Background</a>
        <a href="#contact" className="hover:opacity-50 transition-opacity duration-200">Contact</a>
      </div>

      <a
        href="tel:+15738238788"
        className="text-[11px] font-mono tracking-wider px-4 py-2 text-[#F5F3EE]"
        style={{
          ...magneticStyle,
          background: '#E63B2E',
          borderRadius: '9999px',
        }}
        onMouseEnter={onMagEnter}
        onMouseLeave={onMagLeave}
      >
        Call Out: 573-823-8788
      </a>
    </nav>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
const Hero = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-tag', {
        y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
      })
      gsap.from('.hero-line-1', {
        y: 90, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.4,
      })
      gsap.from('.hero-line-2', {
        y: 90, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.55,
      })
      gsap.from('.hero-sub', {
        y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.9,
      })
      gsap.from('.hero-cta', {
        y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.1,
      })
      gsap.from('.hero-scroll', {
        opacity: 0, duration: 1, ease: 'power3.out', delay: 1.5,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100dvh' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/oil-refinery.jpg')`,
        }}
      />
      {/* Dual-gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, rgba(17,17,17,0.55) 0%, transparent 50%),' +
            'linear-gradient(to top, #111111 0%, rgba(17,17,17,0.75) 35%, transparent 70%)',
        }}
      />

      {/* Content — bottom-left */}
      <div className="absolute bottom-0 left-0 p-10 md:p-20 max-w-4xl">
        <p className="hero-tag font-mono text-[10px] tracking-[0.35em] uppercase text-[#E8E4DD]/55 mb-5">
          API 510 · 570 · 653 Certified &nbsp;·&nbsp; 15 Years of Field Excellence
        </p>

        <div className="overflow-hidden mb-1">
          <h1 className="hero-line-1 font-sans text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none text-[#F5F3EE]">
            Certified Expertise. Proven Integrity.
          </h1>
        </div>
        <div className="overflow-hidden mb-7">
          <h1 className="hero-line-2 font-serif italic text-5xl md:text-7xl lg:text-8xl leading-none" style={{ color: '#E63B2E' }}>
            Every Inspection.
          </h1>
        </div>

        <p className="hero-sub font-mono text-sm text-[#E8E4DD]/65 mb-8 leading-relaxed max-w-sm">
          API 510 &amp; 570 Certified Inspections.<br />
          15 Years of Industrial Excellence.
        </p>

        <div className="hero-cta flex flex-wrap items-center gap-4">
          <a
            href="tel:+15738238788"
            className="inline-flex items-center gap-2.5 px-7 py-4 font-mono text-sm tracking-wider text-[#F5F3EE]"
            style={{ ...magneticStyle, background: '#E63B2E' }}
            onMouseEnter={onMagEnter}
            onMouseLeave={onMagLeave}
          >
            <Phone size={13} />
            Request Inspection
          </a>
          <a
            href="mailto:caseydelozier001@hotmail.com"
            className="inline-flex items-center gap-2.5 px-7 py-4 font-mono text-sm tracking-wider text-[#E8E4DD]/70 border border-[#E8E4DD]/20"
            style={magneticStyle}
            onMouseEnter={onMagEnter}
            onMouseLeave={onMagLeave}
          >
            <Mail size={13} />
            Send Email
          </a>
        </div>

        <div className="hero-scroll mt-10 flex items-center gap-4">
          <div className="w-10 h-px bg-[#E8E4DD]/25" />
          <span className="font-mono text-[9px] tracking-[0.35em] text-[#E8E4DD]/35 uppercase">Scroll to explore</span>
          <ChevronDown size={11} className="text-[#E8E4DD]/35 animate-bounce" />
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FEATURE CARD 1 — Diagnostic Shuffler
// ─────────────────────────────────────────────────────────────────────────────
const DiagnosticShuffler = () => {
  const labels = ['Pressure Pipe', 'Vessels & Columns', 'Heaters & Boilers']
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCurrent(p => (p + 1) % labels.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex items-center gap-2">
        <Shield size={14} className="text-[#E63B2E]" />
        <span className="font-mono text-[9px] tracking-[0.28em] text-[#E8E4DD]/40 uppercase">Active Protocol</span>
      </div>

      <div>
        <h3 className="font-sans text-xl font-bold text-[#E8E4DD] mb-3 leading-tight">
          API Certified<br />Inspections
        </h3>

        {/* Slot-machine cycling label */}
        <div className="overflow-hidden" style={{ height: '26px' }}>
          <div
            className="transition-transform duration-500 ease-in-out"
            style={{ transform: `translateY(-${current * 26}px)` }}
          >
            {labels.map((label, i) => (
              <div key={i} className="h-[26px] flex items-center">
                <span className="font-mono text-xs text-[#E63B2E] tracking-wider">
                  → {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="font-mono text-[10px] text-[#E8E4DD]/40 mt-4 leading-relaxed">
          Systematic evaluation across all pressure-retaining equipment using visual, NDE, and corrosion mapping techniques.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {['510', '570', '653'].map(code => (
          <div key={code} className="border border-[#E8E4DD]/10 p-2 text-center">
            <span className="font-mono text-[9px] text-[#E8E4DD]/50 tracking-wider">API {code}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FEATURE CARD 2 — Telemetry Typewriter
// ─────────────────────────────────────────────────────────────────────────────
const TelemetryTypewriter = () => {
  const messages = [
    'Evaluating QA/QC protocols...',
    'Planning routine maintenance...',
    'Optimizing turnaround scope...',
    'Drafting inspection report...',
    'Coordinating with plant manager...',
    'Verifying repair procedures...',
  ]
  const [displayText, setDisplayText] = useState('')
  const [msgIndex, setMsgIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = messages[msgIndex]
    const speed = deleting ? 25 : 55
    const timer = setTimeout(() => {
      if (!deleting && charIndex < target.length) {
        setDisplayText(target.slice(0, charIndex + 1))
        setCharIndex(c => c + 1)
      } else if (!deleting && charIndex === target.length) {
        setTimeout(() => setDeleting(true), 1600)
      } else if (deleting && charIndex > 0) {
        setDisplayText(target.slice(0, charIndex - 1))
        setCharIndex(c => c - 1)
      } else {
        setDeleting(false)
        setMsgIndex(i => (i + 1) % messages.length)
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [charIndex, deleting, msgIndex])

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#E63B2E] animate-pulse" />
        <span className="font-mono text-[9px] tracking-[0.28em] text-[#E8E4DD]/40 uppercase">Live Telemetry</span>
      </div>

      <div>
        <h3 className="font-sans text-xl font-bold text-[#E8E4DD] mb-3 leading-tight">
          Repair &amp; Turnaround<br />Planning
        </h3>

        {/* Terminal display */}
        <div
          className="border border-[#E8E4DD]/10 p-4 font-mono text-xs text-[#E63B2E]"
          style={{ background: 'rgba(17,17,17,0.6)', minHeight: '64px' }}
        >
          <span className="text-[#E8E4DD]/30 select-none">{'>'} </span>
          <span>{displayText}</span>
          <span className="animate-blink">_</span>
        </div>

        <p className="font-mono text-[10px] text-[#E8E4DD]/40 mt-4 leading-relaxed">
          End-to-end management of turnaround scope from initial planning through mechanical completion and documentation sign-off.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {['Scope', 'Schedule', 'QA/QC', 'MOC'].map(tag => (
          <span key={tag} className="font-mono text-[9px] px-2.5 py-1 border border-[#E8E4DD]/15 text-[#E8E4DD]/45 tracking-wider">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FEATURE CARD 3 — Drafting Protocol (Blueprint SVG)
// ─────────────────────────────────────────────────────────────────────────────
const DraftingProtocol = () => {
  const svgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.draft-cursor', {
        motionPath: {
          path: [
            { x: 0, y: 0 },
            { x: 55, y: -35 },
            { x: 110, y: -35 },
            { x: 60, y: 15 },
            { x: 0, y: 0 },
          ],
        },
        duration: 5,
        repeat: -1,
        ease: 'power1.inOut',
      })
      gsap.to('.hl-iso', {
        opacity: 0.9,
        duration: 0.4,
        repeat: -1,
        yoyo: true,
        repeatDelay: 1.8,
        stagger: { each: 0.9 },
      })
    }, svgRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex items-center gap-2">
        <FileText size={14} className="text-[#E63B2E]" />
        <span className="font-mono text-[9px] tracking-[0.28em] text-[#E8E4DD]/40 uppercase">Drafting Mode</span>
      </div>

      <div>
        <h3 className="font-sans text-xl font-bold text-[#E8E4DD] mb-3 leading-tight">
          Document Redlining<br />&amp; P&amp;IDs
        </h3>

        {/* Blueprint SVG */}
        <div ref={svgRef} className="w-full" style={{ height: '110px' }}>
          <svg viewBox="0 0 220 110" className="w-full h-full">
            {/* Grid */}
            {[0, 22, 44, 66, 88, 110].map(y => (
              <line key={`h${y}`} x1="0" y1={y} x2="220" y2={y} stroke="#E8E4DD" strokeWidth="0.25" strokeOpacity="0.12" />
            ))}
            {[0, 27.5, 55, 82.5, 110, 137.5, 165, 192.5, 220].map(x => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="110" stroke="#E8E4DD" strokeWidth="0.25" strokeOpacity="0.12" />
            ))}

            {/* Isometric pipe layout */}
            <polyline
              points="20,85 65,45 155,45 200,85"
              fill="none" stroke="#E8E4DD" strokeWidth="1.2" strokeOpacity="0.45"
            />
            <line x1="65" y1="45" x2="65" y2="22" stroke="#E8E4DD" strokeWidth="1.2" strokeOpacity="0.45" />
            <line x1="155" y1="45" x2="155" y2="22" stroke="#E8E4DD" strokeWidth="1.2" strokeOpacity="0.45" />
            <line x1="65" y1="22" x2="155" y2="22" stroke="#E8E4DD" strokeWidth="1.2" strokeOpacity="0.45" />

            {/* Highlight boxes */}
            <rect className="hl-iso" x="55" y="12" width="28" height="20" fill="none" stroke="#E63B2E" strokeWidth="0.8" opacity="0.2" />
            <rect className="hl-iso" x="143" y="12" width="28" height="20" fill="none" stroke="#E63B2E" strokeWidth="0.8" opacity="0.2" />

            {/* Node dots */}
            {[[65,45],[155,45],[65,22],[155,22]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="2.5" fill="#E63B2E" fillOpacity="0.7" />
            ))}

            {/* Animated cursor */}
            <g className="draft-cursor">
              <line x1="-7" y1="0" x2="7" y2="0" stroke="#E63B2E" strokeWidth="1.5" />
              <line x1="0" y1="-7" x2="0" y2="7" stroke="#E63B2E" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="3.5" fill="none" stroke="#E63B2E" strokeWidth="1" />
            </g>
          </svg>
        </div>

        <p className="font-mono text-[10px] text-[#E8E4DD]/40 mt-3 leading-relaxed">
          Precision field redlines converted to accurate P&amp;IDs and isometric drawings — the definitive record of as-built conditions.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {['Isometric Drawings', 'Piping Circuits', 'P&IDs'].map(tag => (
          <span key={tag} className="font-mono text-[9px] px-2.5 py-1 border border-[#E8E4DD]/15 text-[#E8E4DD]/45 tracking-wider">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FEATURES SECTION
// ─────────────────────────────────────────────────────────────────────────────
const Features = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feat-header', {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
      })
      gsap.from('.feature-card', {
        y: 70, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="bg-[#111111] py-24 px-8 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="feat-header flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <p className="font-mono text-[9px] tracking-[0.32em] uppercase text-[#E8E4DD]/35 mb-4">
              Core Services
            </p>
            <h2 className="font-sans text-3xl md:text-5xl font-bold text-[#E8E4DD] leading-tight">
              Functional<br />
              <span className="font-serif italic" style={{ color: '#E63B2E' }}>Artifacts</span>
            </h2>
          </div>
          <p className="font-mono text-[10px] text-[#E8E4DD]/40 max-w-xs leading-relaxed">
            Three precision instruments covering the full spectrum of pressure equipment integrity, turnaround management, and documentation fidelity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[<DiagnosticShuffler />, <TelemetryTypewriter />, <DraftingProtocol />].map((Card, i) => (
            <div
              key={i}
              className="feature-card border border-[#E8E4DD]/[0.07] p-7"
              style={{ background: 'rgba(232,228,221,0.025)', minHeight: '380px' }}
            >
              {Card}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// GANTT CHART SECTION
// ─────────────────────────────────────────────────────────────────────────────
const GanttChart = () => {
  const sectionRef = useRef(null)
  const [triggered, setTriggered] = useState(false)

  const tasks = [
    { label: 'Mobilization',         start: 0,   duration: 8,  phase: 'Pre-Turnaround' },
    { label: 'Initial Inspection',   start: 5,   duration: 12, phase: 'Pre-Turnaround' },
    { label: 'NDE / Corrosion Map',  start: 10,  duration: 15, phase: 'Assessment' },
    { label: 'Fitness-for-Service',  start: 18,  duration: 10, phase: 'Assessment' },
    { label: 'P&ID Redlining',       start: 22,  duration: 14, phase: 'Documentation' },
    { label: 'Repair Authorization', start: 28,  duration: 8,  phase: 'Documentation' },
    { label: 'Contractor Oversight', start: 34,  duration: 20, phase: 'Execution' },
    { label: 'Weld QA/QC',          start: 40,  duration: 16, phase: 'Execution' },
    { label: 'Hydrotest Witnessing', start: 54,  duration: 6,  phase: 'Completion' },
    { label: 'Final Documentation',  start: 58,  duration: 8,  phase: 'Completion' },
  ]

  const totalDays = 70
  const phaseColors = {
    'Pre-Turnaround': '#5B7FA6',
    'Assessment':     '#E63B2E',
    'Documentation':  '#8A7E6A',
    'Execution':      '#E63B2E',
    'Completion':     '#4A7C59',
  }

  const phaseOpacity = {
    'Pre-Turnaround': 0.7,
    'Assessment':     0.9,
    'Documentation':  0.65,
    'Execution':      1,
    'Completion':     0.75,
  }

  const weeks = Array.from({ length: 11 }, (_, i) => `W${i + 1}`)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => setTriggered(true),
      })

      gsap.from('.gantt-title', {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#0D0D0D] py-24 px-8 md:px-20 border-t border-[#E8E4DD]/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className="gantt-title flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-[9px] tracking-[0.32em] uppercase text-[#E8E4DD]/35 mb-4">
              Turnaround Intelligence
            </p>
            <h2 className="font-sans text-3xl md:text-5xl font-bold text-[#E8E4DD] leading-tight">
              Inspection<br />
              <span className="font-serif italic" style={{ color: '#E63B2E' }}>Lifecycle</span>
            </h2>
          </div>
          <p className="font-mono text-[10px] text-[#E8E4DD]/40 max-w-xs leading-relaxed">
            A live view of how II&amp;S structures a full turnaround inspection engagement — from mobilization through final sign-off.
          </p>
        </div>

        {/* Chart */}
        <div
          className="border border-[#E8E4DD]/[0.07] overflow-hidden"
          style={{ background: 'rgba(232,228,221,0.02)' }}
        >
          {/* Week header */}
          <div className="flex border-b border-[#E8E4DD]/[0.07]" style={{ paddingLeft: '180px' }}>
            {weeks.map(w => (
              <div
                key={w}
                className="font-mono text-[8px] text-[#E8E4DD]/30 tracking-widest text-center py-2"
                style={{ flex: 1 }}
              >
                {w}
              </div>
            ))}
          </div>

          {/* Phase group labels + rows */}
          {tasks.map((task, i) => {
            const barLeft = (task.start / totalDays) * 100
            const barWidth = (task.duration / totalDays) * 100
            const delay = i * 0.08

            return (
              <div
                key={i}
                className="flex items-center border-b border-[#E8E4DD]/[0.04] group"
                style={{ height: '38px' }}
              >
                {/* Task label */}
                <div
                  className="flex-shrink-0 font-mono text-[9px] text-[#E8E4DD]/50 tracking-wide pl-4 pr-3 group-hover:text-[#E8E4DD]/80 transition-colors duration-200"
                  style={{ width: '180px' }}
                >
                  {task.label}
                </div>

                {/* Bar track */}
                <div className="flex-1 relative h-full flex items-center px-1">
                  <div className="relative w-full h-4">
                    {/* Track background */}
                    <div
                      className="absolute inset-0 rounded-sm"
                      style={{ background: 'rgba(232,228,221,0.04)' }}
                    />
                    {/* Animated fill bar */}
                    {triggered && (
                      <div
                        className="absolute top-0 bottom-0 rounded-sm"
                        style={{
                          left: `${barLeft}%`,
                          width: `${barWidth}%`,
                          background: phaseColors[task.phase],
                          opacity: phaseOpacity[task.phase],
                          transformOrigin: 'left center',
                          animation: `ganttFill 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s both`,
                        }}
                      />
                    )}
                    {/* Phase label on bar */}
                    {triggered && barWidth > 12 && (
                      <div
                        className="absolute top-0 bottom-0 flex items-center pointer-events-none"
                        style={{
                          left: `calc(${barLeft}% + 6px)`,
                          opacity: 0,
                          animation: `ganttFill 0.4s ease ${delay + 0.9}s both`,
                        }}
                      >
                        <span className="font-mono text-[7px] text-white/70 tracking-widest whitespace-nowrap">
                          {task.phase}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Footer legend */}
          <div className="flex flex-wrap items-center gap-5 px-4 py-4">
            {Object.entries(phaseColors).map(([phase, color]) => (
              <div key={phase} className="flex items-center gap-2">
                <div className="w-3 h-2 rounded-sm" style={{ background: color, opacity: 0.85 }} />
                <span className="font-mono text-[8px] text-[#E8E4DD]/35 tracking-wider">{phase}</span>
              </div>
            ))}
            <div className="ml-auto font-mono text-[8px] text-[#E8E4DD]/25 tracking-widest">
              TYPICAL 10-WEEK TURNAROUND ENGAGEMENT
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PHILOSOPHY
// ─────────────────────────────────────────────────────────────────────────────
const Philosophy = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-tag', {
        y: 20, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from('.phil-statement', {
        y: 60, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
      gsap.from('.phil-bio-left', {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.phil-bio-left', start: 'top 85%' },
      })
      gsap.from('.phil-bio-right', {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: '.phil-bio-right', start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="background"
      className="relative py-32 px-8 md:px-20 overflow-hidden"
      style={{ background: '#111111' }}
    >
      {/* Offshore texture overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=80')`,
          opacity: 0.055,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #111111 0%, transparent 60%, #111111 100%)' }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Contrast statement */}
        <div className="mb-28">
          <p className="phil-tag font-mono text-[10px] tracking-[0.32em] uppercase text-[#E8E4DD]/35 mb-8">
            Most inspectors just log the damage.
          </p>
          <h2 className="phil-statement font-serif italic leading-none text-[#E8E4DD]" style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}>
            We engineer the{' '}
            <span style={{ color: '#E63B2E' }}>Solution.</span>
          </h2>
        </div>

        {/* Bio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-[#E8E4DD]/[0.08] pt-16">
          <div className="phil-bio-left">
            <p className="font-mono text-[9px] tracking-[0.32em] uppercase text-[#E8E4DD]/35 mb-5">
              About Casey DeLozier
            </p>
            <h3 className="font-sans text-2xl font-bold text-[#E8E4DD] mb-5 leading-tight">
              15 Years at the Frontier of<br />Pressure Equipment Integrity
            </h3>
            <p className="font-mono text-[11px] text-[#E8E4DD]/55 leading-[1.9] mb-6">
              With over 15 years embedded in the world's most demanding industrial environments — including BP, Shell, and major Gulf Coast refineries — Casey DeLozier brings field-tested expertise that no report can replicate.
            </p>
            <p className="font-mono text-[11px] text-[#E8E4DD]/55 leading-[1.9]">
              His approach is not just compliance — it is engineering judgement. Every inspection produces a clear action path: what needs to be fixed, how to fix it, and who needs to sign off.
            </p>
          </div>

          <div className="phil-bio-right space-y-8">
            <div>
              <p className="font-mono text-[9px] tracking-[0.32em] uppercase text-[#E8E4DD]/35 mb-4">
                Certifications &amp; Fluency
              </p>
              <div className="space-y-2.5">
                {[
                  'API 510 — Pressure Vessel Inspector',
                  'API 570 — Piping Inspector',
                  'API 653 — Aboveground Storage Tanks',
                  'NBIC — National Board Inspector Commission',
                  'ASNT — NDT Level II / III',
                ].map(cert => (
                  <div key={cert} className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#E63B2E' }} />
                    <span className="font-mono text-[10px] text-[#E8E4DD]/65">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-[9px] tracking-[0.32em] uppercase text-[#E8E4DD]/35 mb-4">
                Industry Experience
              </p>
              <div className="flex flex-wrap gap-2">
                {['BP', 'Shell', 'Gulf Coast Refineries', 'Chemical Plants', 'Offshore Platforms', 'Turnarounds'].map(tag => (
                  <span key={tag} className="font-mono text-[9px] px-2.5 py-1 border border-[#E8E4DD]/15 text-[#E8E4DD]/45">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PROTOCOL SVGs
// ─────────────────────────────────────────────────────────────────────────────
const AssessSVG = () => {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.scan-line', {
        y: 72, duration: 2.2, repeat: -1, yoyo: true, ease: 'power1.inOut',
      })
      gsap.to('.scan-glow', {
        opacity: 0.65, duration: 2.2, repeat: -1, yoyo: true, ease: 'power1.inOut',
      })
      gsap.from('.meas-mark', {
        opacity: 0, duration: 0.3, stagger: 0.15, repeat: -1, repeatDelay: 2.2, ease: 'none',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} style={{ width: 200, height: 200 }}>
      <svg viewBox="0 0 200 200" width="200" height="200">
        {/* Pipe outline */}
        <ellipse cx="100" cy="130" rx="65" ry="22" fill="none" stroke="#E8E4DD" strokeWidth="1.5" strokeOpacity="0.35" />
        <rect x="35" y="70" width="130" height="60" fill="none" stroke="#E8E4DD" strokeWidth="1.5" strokeOpacity="0.35" />
        <ellipse cx="100" cy="70" rx="65" ry="22" fill="none" stroke="#E8E4DD" strokeWidth="1.5" strokeOpacity="0.35" />
        {/* Inner rings */}
        <ellipse cx="100" cy="70" rx="40" ry="14" fill="none" stroke="#E8E4DD" strokeWidth="0.6" strokeOpacity="0.18" />
        <ellipse cx="100" cy="130" rx="40" ry="14" fill="none" stroke="#E8E4DD" strokeWidth="0.6" strokeOpacity="0.18" />

        {/* Scan elements */}
        <g className="scan-line">
          <line x1="20" y1="90" x2="180" y2="90" stroke="#E63B2E" strokeWidth="1.2" strokeOpacity="0.9" />
          <rect className="scan-glow" x="20" y="86" width="160" height="8" fill="#E63B2E" fillOpacity="0.12" opacity="0.3" />
        </g>

        {/* Measurement marks */}
        {[70, 90, 110, 130].map((y) => (
          <g key={y} className="meas-mark">
            <line x1="12" y1={y} x2="22" y2={y} stroke="#E63B2E" strokeWidth="0.8" strokeOpacity="0.7" />
            <text x="5" y={y + 3.5} fill="#E63B2E" fontSize="5.5" fontFamily="Space Mono" opacity="0.55">{y}</text>
          </g>
        ))}

        {/* Ruler */}
        <line x1="175" y1="65" x2="175" y2="135" stroke="#E63B2E" strokeWidth="0.5" strokeOpacity="0.4" />
        <text x="178" y="103" fill="#E63B2E" fontSize="5" fontFamily="Space Mono" opacity="0.4">60mm</text>
      </svg>
    </div>
  )
}

const DraftSVG = () => {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = ref.current?.querySelectorAll('.draw-line')
      lines?.forEach((line, i) => {
        const length = line.getTotalLength?.() || 80
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 1.4,
          delay: i * 0.25,
          repeat: -1,
          repeatDelay: 2.5,
          ease: 'power2.inOut',
        })
      })
      gsap.to('.annot-dot', {
        scale: 1.6, opacity: 0.4, duration: 0.6,
        repeat: -1, yoyo: true, stagger: 0.4, ease: 'power1.inOut',
        transformOrigin: 'center center',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} style={{ width: 200, height: 200 }}>
      <svg viewBox="0 0 200 200" width="200" height="200">
        {/* Blueprint grid */}
        {[0, 40, 80, 120, 160, 200].map(y => (
          <line key={`h${y}`} x1="0" y1={y} x2="200" y2={y} stroke="#E8E4DD" strokeWidth="0.25" strokeOpacity="0.1" />
        ))}
        {[0, 40, 80, 120, 160, 200].map(x => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="200" stroke="#E8E4DD" strokeWidth="0.25" strokeOpacity="0.1" />
        ))}

        {/* Isometric pipe lines */}
        <polyline className="draw-line" points="25,155 80,100 120,100 175,155" fill="none" stroke="#E8E4DD" strokeWidth="2" strokeOpacity="0.75" />
        <line className="draw-line" x1="80" y1="100" x2="80" y2="55" stroke="#E8E4DD" strokeWidth="2" strokeOpacity="0.75" />
        <line className="draw-line" x1="120" y1="100" x2="120" y2="55" stroke="#E8E4DD" strokeWidth="2" strokeOpacity="0.75" />
        <line className="draw-line" x1="80" y1="55" x2="120" y2="55" stroke="#E8E4DD" strokeWidth="2" strokeOpacity="0.75" />

        {/* Annotation nodes */}
        {[[80,100],[120,100],[80,55],[120,55]].map(([x,y],i) => (
          <circle key={i} className="annot-dot" cx={x} cy={y} r="4" fill="#E63B2E" fillOpacity="0.85" />
        ))}

        {/* Dimension line */}
        <line x1="80" y1="46" x2="120" y2="46" stroke="#E63B2E" strokeWidth="0.7" strokeOpacity="0.55" />
        <line x1="80" y1="43" x2="80" y2="49" stroke="#E63B2E" strokeWidth="0.7" strokeOpacity="0.55" />
        <line x1="120" y1="43" x2="120" y2="49" stroke="#E63B2E" strokeWidth="0.7" strokeOpacity="0.55" />
        <text x="100" y="41" textAnchor="middle" fill="#E63B2E" fontSize="7" fontFamily="Space Mono" opacity="0.6">12"</text>

        {/* Tag box */}
        <rect x="130" y="85" width="42" height="18" fill="none" stroke="#E63B2E" strokeWidth="0.6" strokeOpacity="0.4" />
        <text x="151" y="97" textAnchor="middle" fill="#E63B2E" fontSize="6" fontFamily="Space Mono" opacity="0.5">P-101A</text>
      </svg>
    </div>
  )
}

const ExecuteSVG = () => (
  <div style={{ width: 200, height: 200 }} className="relative flex items-center justify-center">
    <svg viewBox="0 0 200 200" width="200" height="200">
      {/* Pulsing rings */}
      <circle cx="100" cy="100" r="55" fill="none" stroke="#E63B2E" strokeWidth="0.6" strokeOpacity="0.25" className="animate-ring-pulse-1" />
      <circle cx="100" cy="100" r="72" fill="none" stroke="#E63B2E" strokeWidth="0.5" strokeOpacity="0.15" className="animate-ring-pulse-2" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="#E63B2E" strokeWidth="0.4" strokeOpacity="0.08" className="animate-ring-pulse-3" />

      {/* Badge */}
      <circle cx="100" cy="100" r="42" fill="rgba(230,59,46,0.08)" stroke="#E63B2E" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="38" fill="none" stroke="#E63B2E" strokeWidth="0.5" strokeOpacity="0.4" />

      {/* Checkmark */}
      <polyline
        points="82,100 94,113 120,85"
        fill="none" stroke="#E63B2E" strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round"
      />

      {/* Badge labels */}
      <text x="100" y="152" textAnchor="middle" fill="#E8E4DD" fontSize="6.5" fontFamily="Space Mono" opacity="0.5" letterSpacing="2">COMPLIANT</text>
      <text x="100" y="163" textAnchor="middle" fill="#E8E4DD" fontSize="5.5" fontFamily="Space Mono" opacity="0.3" letterSpacing="1">API CERTIFIED</text>
    </svg>
  </div>
)

// ─────────────────────────────────────────────────────────────────────────────
// PROTOCOL SECTION — Pinned scroll sequence
// ─────────────────────────────────────────────────────────────────────────────
const Protocol = () => {
  const sectionRef = useRef(null)

  const steps = [
    {
      number: '01',
      title: 'Assess',
      subtitle: 'Internal/External API Evaluation',
      description:
        'Systematic evaluation of pressure equipment through visual inspection, NDE methods, and corrosion rate mapping. Every defect is catalogued, every risk quantified against API fitness-for-service criteria.',
      visual: <AssessSVG />,
    },
    {
      number: '02',
      title: 'Draft',
      subtitle: 'P&IDs and Field Redlining',
      description:
        'Precision documentation of findings through isometric drawings, P&ID redlines, and field markup — creating the definitive record of as-built equipment condition and defect locations.',
      visual: <DraftSVG />,
    },
    {
      number: '03',
      title: 'Execute',
      subtitle: 'QA/QC and Turnaround Management',
      description:
        'From planning to mechanical completion, we manage the full turnaround scope — coordinating contractors, witnessing repairs, verifying weld QA/QC, and delivering complete compliance documentation.',
      visual: <ExecuteSVG />,
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.proto-card')

      // Set cards 2 and 3 initially off-screen
      cards.forEach((card, i) => {
        if (i > 0) gsap.set(card, { yPercent: 100, opacity: 0 })
      })

      // Build a timeline that scrubs through all card transitions
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${window.innerHeight * (cards.length - 1) * 1.2}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
        },
      })

      // Transition 1→2
      tl.to(cards[0], { yPercent: -30, opacity: 0, ease: 'power2.in', duration: 0.4 })
      tl.to(cards[1], { yPercent: 0, opacity: 1, ease: 'power2.out', duration: 0.4 }, '<0.1')
      tl.to({}, { duration: 0.8 }) // pause at card 2

      // Transition 2→3
      tl.to(cards[1], { yPercent: -30, opacity: 0, ease: 'power2.in', duration: 0.4 })
      tl.to(cards[2], { yPercent: 0, opacity: 1, ease: 'power2.out', duration: 0.4 }, '<0.1')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: '100dvh', background: '#0A0A0A' }}
    >
      {/* Section label */}
      <div className="absolute top-8 left-8 md:left-20 z-10">
        <p className="font-mono text-[9px] tracking-[0.32em] uppercase text-[#E8E4DD]/30">
          Inspection Protocol
        </p>
      </div>

      {/* Step indicators */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
        {steps.map((_, i) => (
          <div key={i} className="w-0.5 h-10 overflow-hidden" style={{ background: 'rgba(232,228,221,0.12)' }}>
            <div
              className="w-full h-full origin-top"
              style={{
                background: '#E63B2E',
                transform: i === 0 ? 'scaleY(1)' : 'scaleY(0)',
                transition: 'transform 0.5s ease',
              }}
            />
          </div>
        ))}
      </div>

      {/* Cards */}
      {steps.map((step, i) => (
        <div
          key={i}
          className="proto-card absolute inset-0 flex items-center px-8 md:px-20"
        >
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-mono font-bold text-[#E63B2E]/20 select-none" style={{ fontSize: 'clamp(7rem, 18vw, 14rem)', lineHeight: 1 }}>
                {step.number}
              </span>
              <h2 className="font-sans font-bold text-[#E8E4DD] -mt-4 mb-4 leading-none" style={{ fontSize: 'clamp(4.5rem, 11vw, 9rem)' }}>
                {step.title}
              </h2>
              <p className="font-mono text-sm text-[#E63B2E] tracking-[0.2em] mb-6 uppercase">
                {step.subtitle}
              </p>
              <p className="font-mono text-sm text-[#E8E4DD]/80 leading-[1.8] max-w-xl">
                {step.description}
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              {step.visual}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
const Footer = () => {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-item', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
      })
    }, footerRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative border-t border-[#E8E4DD]/[0.06] px-8 md:px-20 py-16"
      style={{ background: '#0A0A0A' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Status bar */}
        <div className="footer-item flex flex-wrap items-center justify-between gap-4 mb-14 pb-8 border-b border-[#E8E4DD]/[0.06]">
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full bg-green-400 animate-status-pulse"
              style={{ flexShrink: 0 }}
            />
            <span className="font-mono text-[10px] text-[#E8E4DD]/55 tracking-[0.22em] uppercase">
              Inspector On Call
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Activity size={10} className="text-[#E8E4DD]/25" />
            <span className="font-mono text-[9px] text-[#E8E4DD]/25 tracking-widest">
              System Status: OPERATIONAL
            </span>
          </div>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Identity */}
          <div className="footer-item">
            <div className="font-mono text-2xl font-bold text-[#E8E4DD] tracking-[0.22em] mb-3">
              II&amp;S
            </div>
            <p className="font-mono text-[10px] text-[#E8E4DD]/40 leading-relaxed mb-1">
              Industrial Inspections<br />&amp; Solutions LLC
            </p>
            <p className="font-mono text-[9px] text-[#E8E4DD]/25 mt-3">
              Led by Casey DeLozier
            </p>
          </div>

          {/* Contact */}
          <div className="footer-item">
            <p className="font-mono text-[9px] tracking-[0.32em] uppercase text-[#E8E4DD]/35 mb-5">
              Request Call Out
            </p>
            <div className="space-y-4">
              <a
                href="tel:+15738238788"
                className="flex items-center gap-3 group"
                style={magneticStyle}
                onMouseEnter={onMagEnter}
                onMouseLeave={onMagLeave}
              >
                <Phone size={13} style={{ color: '#E63B2E', flexShrink: 0 }} />
                <span className="font-mono text-sm text-[#E8E4DD] group-hover:text-[#E63B2E] transition-colors duration-200">
                  573-823-8788
                </span>
              </a>
              <a
                href="mailto:caseydelozier001@hotmail.com"
                className="flex items-center gap-3 group"
                style={magneticStyle}
                onMouseEnter={onMagEnter}
                onMouseLeave={onMagLeave}
              >
                <Mail size={13} style={{ color: '#E63B2E', flexShrink: 0 }} />
                <span className="font-mono text-[11px] text-[#E8E4DD]/70 group-hover:text-[#E63B2E] transition-colors duration-200 break-all">
                  caseydelozier001@hotmail.com
                </span>
              </a>
            </div>
          </div>

          {/* Certifications */}
          <div className="footer-item">
            <p className="font-mono text-[9px] tracking-[0.32em] uppercase text-[#E8E4DD]/35 mb-5">
              Certifications
            </p>
            <div className="grid grid-cols-2 gap-2">
              {['API 510', 'API 570', 'API 653', 'NBIC', 'ASNT NDT', 'QA/QC'].map(cert => (
                <div key={cert} className="border border-[#E8E4DD]/[0.08] p-2.5 text-center">
                  <span className="font-mono text-[9px] text-[#E8E4DD]/45 tracking-wider">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-item flex flex-col md:flex-row items-center justify-between gap-3 pt-8 border-t border-[#E8E4DD]/[0.06]">
          <p className="font-mono text-[9px] text-[#E8E4DD]/25 tracking-wider">
            © {new Date().getFullYear()} Industrial Inspections &amp; Solutions LLC. All rights reserved.
          </p>
          <p className="font-mono text-[9px] text-[#E8E4DD]/20 tracking-[0.25em]">
            MOC-01 · API CERTIFIED · FIELD READY
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-[#111111] text-[#F5F3EE] antialiased">
      <NoiseOverlay />
      <Navbar />
      <Hero />
      <Features />
      <GanttChart />
      <Philosophy />
      <Protocol />
      <Footer />
    </div>
  )
}
