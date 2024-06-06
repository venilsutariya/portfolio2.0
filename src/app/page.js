"use client";
import { useEffect, useState } from "react";
import Scene from "@/components/Scene";
import Projects from "@/components/Projects";
import Lenis from "lenis";
import Hero from "@/components/hero";
export default function Home() {
  const [activeMenu, setActiveMenu] = useState(null);
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main>
      <Hero />
      <Projects setActiveMenu={setActiveMenu} />
      <div className="hidden lg:block">
        <Scene activeMenu={activeMenu} />
      </div>
      <div className="h-[50vh]"></div>
    </main>
  );
}
