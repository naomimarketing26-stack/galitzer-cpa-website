import Hero from '../components/Hero'
import AudienceSection from '../components/AudienceSection'
import ServicesSection from '../components/ServicesSection'
import WhyUs from '../components/WhyUs'
import HowItWorks from '../components/HowItWorks'
import TeamPreview from '../components/TeamPreview'
import Testimonials from '../components/Testimonials'
import FinalCTA from '../components/FinalCTA'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AudienceSection />
      <ServicesSection />
      <WhyUs />
      <HowItWorks />
      <TeamPreview />
      <Testimonials />
      <FinalCTA />
    </main>
  )
}
