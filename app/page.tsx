import Amenities from "./components/Amenities";
import EnquiryProvider from "./components/EnquiryProvider";
import FAQ from "./components/FAQ";
import FloorPlans from "./components/FloorPlans";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Location from "./components/Location";
import Marquee from "./components/Marquee";
import MasterPlan from "./components/MasterPlan";
import Overview from "./components/Overview";
import Pricing from "./components/Pricing";
import RendersGrid from "./components/RendersGrid";
import Villas from "./components/Villas";

export default function Home() {
  return (
    <EnquiryProvider>
      <div className="w-full overflow-x-hidden">
        <Header />
        <Hero />
        <Marquee />
        <Overview />
        <RendersGrid />
        <MasterPlan />
        <Amenities />
        <Villas />
        <FloorPlans />
        <Pricing />
        <Location />
        <FAQ />
        <Footer />
      </div>
    </EnquiryProvider>
  );
}
