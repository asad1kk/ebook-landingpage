import HeroSection from '@/components/HeroSection'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import Testimonials from '@/components/Testimonials'
import AuthorBio from '@/components/AuthorBio'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <LeadCaptureForm />
      <Testimonials />
      <AuthorBio />
    </main>
  )
} 