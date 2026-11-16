
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  // Replace this with Constabam's WhatsApp number.
  // Use international format without +, spaces or dashes.
  const whatsappNumber = "13364976262";

  const message =
    "Hi, I am [Your Name] from Constabam platform. I need feedback on the shortlet listed on your website.";

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Constabam on WhatsApp"
      title="Chat with us on WhatsApp"
      className="
        fixed
        bottom-6
        right-6
        z-[9999]
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-[#25D366]
        text-white
        shadow-xl
        transition-all
        duration-300
        hover:scale-110
        hover:bg-[#1DA851]
        hover:shadow-2xl
        sm:bottom-8
        sm:right-8
        sm:h-16
        sm:w-16
      "
    >
      <MessageCircle size={30} strokeWidth={2.2} />

      {/* Online indicator */}
      <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#D9B94F]" />
    </a>
  );
}
