import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import Expeditions from '@/components/Expeditions';
import Journal from '@/components/Journal';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FogLayer from '@/components/FogLayer';
import FloatingLeaves from '@/components/FloatingLeaves';
import GrainOverlay from '@/components/GrainOverlay';
import Marquee from '@/components/Marquee';

export default function Home() {
  return (
    <>
      {/* Atmospheric effects */}
      <FogLayer />
      <FloatingLeaves />
      <GrainOverlay />

      {/* Navigation */}
      <Nav />

      {/* Main content */}
      <main>
        <Hero />
        <Marquee items={['Into the canopy', 'Where silence speaks', 'Ancient wisdom', 'Borneo', 'Costa Rica', 'The Daintree']} speed={35} />
        <Philosophy />
        <Expeditions />
        <Marquee items={['Field notes', 'Root systems', 'Cloud forest', 'Listening to canopy', 'Moss language', 'Light filters']} speed={28} reverse />
        <Journal />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
