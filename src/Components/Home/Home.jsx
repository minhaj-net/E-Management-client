import FeaturesSection from "./FeatureCard";
import HeroBanner from "./HeroBanner";
import HotelsSection from "./HotelsSection";


export default function HomePage() {
  return (
    <main>
      <HeroBanner />
      <HotelsSection></HotelsSection> 
      <FeaturesSection></FeaturesSection>
    </main>
  );
}
