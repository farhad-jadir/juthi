import Image from "next/image";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

     
    </div>
  );
}