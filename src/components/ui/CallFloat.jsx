import { Phone } from "lucide-react";
import { contactInfo } from "@/data/contactInfo";

export default function CallFloat() {
  return (
    <a
      href={contactInfo.phoneHref}
      aria-label={`Call us at ${contactInfo.phone}`}
      className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-navy-700 text-white shadow-lg shadow-black/20 transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-700"
    >
      <Phone className="h-6 w-6" fill="currentColor" />
    </a>
  );
}
