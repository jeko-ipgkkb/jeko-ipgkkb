import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import SportsTicker from "@/components/feature/SportsTicker";
import Hero from "@/pages/home/components/Hero";
import About from "@/pages/home/components/About";
import VisionMission from "@/pages/home/components/VisionMission";
import Advisors from "@/pages/home/components/Advisors";
import OrgChart from "@/pages/home/components/OrgChart";
import Members from "@/pages/home/components/Members";
import Gallery from "@/pages/home/components/Gallery";
import Join from "@/pages/home/components/Join";
import Quote from "@/pages/home/components/Quote";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background-50">
      <Navbar />
      <main>
        <Hero />
        <SportsTicker />
        <About />
        <VisionMission />
        <Advisors />
        <OrgChart />
        <Members />
        <Gallery />
        <Join />
        <Quote />
      </main>
      <Footer />
    </div>
  );
}