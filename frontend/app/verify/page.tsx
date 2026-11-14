'use client'

import { useEffect, useRef, useState } from 'react'
import { BrowserQRCodeReader } from '@zxing/browser'
import { Navbar } from '@/components/common/navbar'
import { Footer } from '@/components/common/footer'

export const dynamic = 'force-dynamic'

type ScanState = 'idle' | 'loading' | 'ready' | 'error' | 'success'

function normalizeUrl(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return null

  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
    const url = new URL(withProtocol)

    if (!url.href.toLowerCase().includes('igbo-etiti')) {
      return null
    }

    return url.toString()
  } catch {
    return null
  }
}

export default function VerifyPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [status, setStatus] = useState('Point your camera at a QR code to verify a certificate or page from Igbo-Etiti.')
  const [scanState, setScanState] = useState<ScanState>('loading')
  const [error, setError] = useState('')
  const [manualLink, setManualLink] = useState('')

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }

  const handleValidScan = (value: string) => {
    const validUrl = normalizeUrl(value)

    if (!validUrl) {
      setScanState('error')
      setError('The QR code was scanned, but it does not point to an Igbo-Etiti website.')
      setStatus('Only trusted Igbo-Etiti links are allowed.')
      return
    }

    setError('')
    setScanState('success')
    setStatus('Valid Igbo-Etiti link opened in a new tab.')
    stopStream()
    window.open(validUrl, '_blank', 'noopener,noreferrer')
  }

  const startScan = async () => {
    setError('')
    setScanState('loading')
    setStatus('Opening the camera to scan the QR code...')

    if (!('mediaDevices' in navigator) || !navigator.mediaDevices.getUserMedia) {
      setScanState('error')
      setError('This browser does not support camera access. Please use a modern browser with QR scanning enabled.')
      return
    }

    try {
      stopStream()
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      })

      streamRef.current = stream

      if (!videoRef.current) return
      videoRef.current.srcObject = stream
      await videoRef.current.play()

      setScanState('ready')
      setStatus('Camera is ready. Hold the QR code steady in front of the lens.')

      const codeReader = new BrowserQRCodeReader()
      const result = await codeReader.decodeFromVideoElement(videoRef.current)
      handleValidScan(result.getText())
    } catch (cameraError) {
      console.error(cameraError)
      setScanState('error')
      setError('Camera access was blocked or unavailable. Please allow camera permission and try again.')
      setStatus('Camera permission is required to scan QR codes.')
    }
  }

  useEffect(() => {
    startScan()

    return () => {
      stopStream()
    }
  }, [])

  const handleManualOpen = () => {
    const validUrl = normalizeUrl(manualLink)
    if (!validUrl) {
      setError('Please enter a valid Igbo-Etiti URL that includes “igbo-etiti”.')
      return
    }

    setError('')
    setStatus('Opening the verified Igbo-Etiti link in a new tab.')
    window.open(validUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f5f1] text-[#102b2d]">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl rounded-[22px] border border-[#d9d9d0] bg-[#f7f5f0] p-4 shadow-[0_20px_60px_rgba(12,35,32,0.06)] sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4 border-b border-[#dfe3d8] pb-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0f5a56]">Verification</p>
              <h1 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-[#123d3c]">Scan QR code</h1>
            </div>
            <div className="rounded-full border border-[#dce4d8] bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0f5a56]">
              Secure scan
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[18px] border border-[#dfe0d7] bg-[#dfe6df] p-3 shadow-inner">
              <div className="relative overflow-hidden rounded-[14px] border border-[#b8cec3] bg-black">
                <video ref={videoRef} autoPlay muted playsInline className="h-[420px] w-full object-cover" />

                {scanState === 'ready' && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-52 w-52 rounded-[20px] border-2 border-[#d7b36b] bg-transparent shadow-[0_0_0_9999px_rgba(0,0,0,0.22)]" />
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071717] via-[#071717]/60 to-transparent p-4 text-white">
                  <p className="text-sm font-medium text-white/90">{status}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-[18px] border border-[#dee3dc] bg-white p-5">
              <div className="mb-4 rounded-xl border border-[#dfe6df] bg-[#f3f7f0] p-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0f5a56]">Status</p>
                <p className="mt-2 text-sm leading-6 text-[#163d3d]">{status}</p>
              </div>

              {error && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}

              <label className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0f5a56]">
                Or paste a link
              </label>
              <input
                value={manualLink}
                onChange={(event) => setManualLink(event.target.value)}
                placeholder="https://igbo-etiti.gov.ng/..."
                className="w-full rounded-xl border border-[#d7d9d4] bg-[#f7f9f7] px-3 py-3 text-sm text-[#1b3737] outline-none ring-0 transition focus:border-[#0f5a56]"
              />

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleManualOpen}
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#d7b36b] px-4 py-3 text-sm font-semibold text-[#102b2d] transition hover:brightness-95"
                >
                  Open link
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setError('')
                    setScanState('loading')
                    startScan()
                  }}
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-[#d7d9d4] bg-white px-4 py-3 text-sm font-semibold text-[#163d3d] transition hover:border-[#0f5a56] hover:text-[#0f5a56]"
                >
                  Scan again
                </button>
              </div>

              <div className="mt-5 border-t border-[#edf0eb] pt-4 text-xs leading-5 text-[#45676c]">
                Only links containing “igbo-etiti” will be opened. This prevents untrusted QR destinations from being opened in a new tab.
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
