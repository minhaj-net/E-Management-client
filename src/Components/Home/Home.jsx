import FeaturesSection from "./FeatureCard";
import HeroBanner from "./HeroBanner";
import HotelsSection from "./HotelsSection";
import EventsSection from "./Iteam";
import TestimonialsSection from "./TestimonialsSection";


export default function HomePage() {
  return (
    <main>
      <HeroBanner />
      <HotelsSection></HotelsSection> 
      <FeaturesSection></FeaturesSection>
      <EventsSection></EventsSection>
      <TestimonialsSection></TestimonialsSection>
    </main>
  );
}
