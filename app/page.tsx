
import HeroPage from "@/components/Hero"
import FeaturedHomes from "@/components/FeaturedHomes";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#EAF3ED]">

      {/* Your remaining homepage sections */}
      <section className="min-h-screen bg-[#EAF3ED]">
      <HeroPage />
      </section>
      <FeaturedHomes />
    </main>
  );
}
