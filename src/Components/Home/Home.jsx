import FeaturesSection from "./FeatureCard";
import HeroBanner from "./HeroBanner";
import HotelsSection from "./HotelsSection";
import EventsSection from "./Iteam";


export default function HomePage() {
  return (
    <main>
      <HeroBanner />
      <HotelsSection></HotelsSection> 
      <FeaturesSection></FeaturesSection>
      <EventsSection></EventsSection>
    </main>
  );
}
