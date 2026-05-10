import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import AudienceSection from '../components/AudienceSection'
import ServicesSection from '../components/ServicesSection'
import TeamPreview from '../components/TeamPreview'
import FinalCTA from '../components/FinalCTA'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <AudienceSection />
      <ServicesSection />
      <TeamPreview />
      <FinalCTA />
    </main>
  )
}
