import { Link } from "react-router-dom";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Stats from "../components/home/Stats";
import Testimonials from "../components/home/Testimonials";
import UpcomingEvents from "../components/home/UpcomingEvents";
import NewsSection from "../components/home/NewsSection";
import CTASection from "../components/home/CTASection";

function Home() {
  return (
    <div className="bg-[#0B1120] min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <Stats />

      {/* Features Section */}
      <Features />

      {/* Upcoming Events */}
      <UpcomingEvents />

      {/* News & Updates */}
      <NewsSection />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

export default Home;
