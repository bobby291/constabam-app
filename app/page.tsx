
import Navbar from "@/components/Navbar";
import HeroPage from "@/components/Hero"
import FeaturedHomes from "@/components/FeaturedHomes";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#EAF3ED]">

      <Navbar />

      {/* Your remaining homepage sections */}
      <section className="min-h-screen bg-[#EAF3ED]">
      <HeroPage />
      </section>
      <FeaturedHomes />
      <Footer />

    </main>
  );
}
