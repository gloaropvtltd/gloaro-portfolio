import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import WhatsappFloat from "@/components/ui/WhatsappFloat";
import { getSocialLinks } from "@/utils/content";

export default async function SiteLayout({ children }) {
  const socialLinks = await getSocialLinks();

  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer socialLinks={socialLinks} />
      <WhatsappFloat />
    </>
  );
}
