
import HeroPage from "@/components/Hero"
import BookingProcess from "@/components/booking-process"
import FeaturedHomes from "@/components/FeaturedHomes";
import Destinations from "@/components/Destination"
export default function Home() {
  return (
    <main className="min-h-screen bg-[#EAF3ED]">

      {/* Your remaining homepage sections */}
      <section className="min-h-screen bg-[#EAF3ED]">
      <HeroPage />
      </section>
      <FeaturedHomes />
      <Destinations />
      <BookingProcess />
    </main>
  );
}
