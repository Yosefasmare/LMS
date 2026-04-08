import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import MainSection from "@/components/home/MainSection";

export default function Home() {
  return (
    <div className="flex min-h-screen  flex-col bg-background font-sans">
      <Header />
      <MainSection />
      <Footer />
    </div>
  );
}