import { Hero } from "@/components/sections/hero";
import { Mission } from "@/components/sections/mission";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Offers } from "@/components/sections/offers";
import { Portfolio } from "@/components/sections/portfolio";
import { Team } from "@/components/sections/team";
import { Impact } from "@/components/sections/impact";
import { Contact } from "@/components/sections/contact";
import { RevealController } from "@/components/ui/reveal";

export default function Home() {
  return (
    <main id="contenu">
      <Hero />
      <Mission />
      <Services />
      <Process />
      <Offers />
      <Portfolio />
      <Team />
      <Impact />
      <Contact />
      <RevealController />
    </main>
  );
}
