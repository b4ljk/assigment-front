import Hero from "@/components/hero/hero";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-around">
      <Hero />
      {/* placeholder */}
      <div />
    </main>
  );
}
