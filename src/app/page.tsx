"use client";

import dynamic from "next/dynamic";
import PageLoader from "@/components/global/PageLoader";
import Navbar from "@/components/global/Navbar";
import CustomCursor from "@/components/global/CustomCursor";
import ScrollProgress from "@/components/global/ScrollProgress";
import WhatsAppFloat from "@/components/global/WhatsAppFloat";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import ProgramMarquee from "@/components/sections/ProgramMarquee";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Courses from "@/components/sections/Courses";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

// Dynamic import for heavy sections
const Philosophy = dynamic(
  () => import("@/components/sections/Philosophy"),
  { ssr: false }
);
const PenOverlay = dynamic(
  () => import("@/components/global/PenOverlay"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <PenOverlay />

      <main>
        <Hero />
        <StatsBar />
        <ProgramMarquee />
        <WhyChooseUs />
        <Courses />
        <Philosophy />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
