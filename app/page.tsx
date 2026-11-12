import { GopuramScene } from "@/components/GopuramScene";
import { TopDecorationBar } from "@/components/decoration/TopDecorationBar";
import { SectionsAfterOpening } from "@/components/sections/SectionsAfterOpening";
import { ButterflyCompanion } from "@/components/butterfly/ButterflyCompanion";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#0a0807]">
      <TopDecorationBar />
      <ButterflyCompanion />
      <GopuramScene />
      <SectionsAfterOpening />
    </main>
  );
}
