import Hero from '../sections/Hero.jsx'
import QuickForm from '../sections/QuickForm.jsx'
import Results from '../sections/Results.jsx'
import Services from '../sections/Services.jsx'
import HowItWorks from '../sections/HowItWorks.jsx'
import Testimonials from '../sections/Testimonials.jsx'
import Faq from '../sections/Faq.jsx'
import FinalCta from '../sections/FinalCta.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <QuickForm id="get-started" idPrefix="top" />
      <Results />
      <Services />
      <HowItWorks />
      <Testimonials />
      <Faq />
      <FinalCta />
      <QuickForm id="apply" idPrefix="bottom" title={['TELL US ABOUT', 'YOUR PROJECT.']} text="Same short form. We reply with a personal proposal." />
    </>
  )
}
