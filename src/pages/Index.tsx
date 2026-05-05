import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PredictionsSection from "@/components/PredictionsSection";
import LiveScoresSection from "@/components/LiveScoresSection";
import BookmakersSection from "@/components/BookmakersSection";
import NewsSection from "@/components/NewsSection";
import ConversionSection from "@/components/ConversionSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <main>
      <HeroSection />
      <PredictionsSection />
      <LiveScoresSection />
      <BookmakersSection />
      <NewsSection />
      <ConversionSection />
    </main>
    <Footer />
  </div>
);

export default Index;
