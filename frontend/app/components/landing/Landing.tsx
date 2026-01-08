import Faq from "./cex/FAQ/Faq";
import Features from "./cex/Features/Features";
import Footer from "./cex/Footer/Footer";
import HeroCEX from "./cex/Hero/HeroCEX";
import LastAd from "./cex/LastAd/LastAd";
import Middle from "./cex/middleAd/Middle";
import Navbar from "./cex/Navbar/Navbar";

export const Landing = () => {
  return (
    <main className="space-b-24">
      <Navbar />
      <HeroCEX />
      <Middle />
      <Features />
      <LastAd />
      <Faq />
      <Footer />
    </main>
  );
};
