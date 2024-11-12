import { getBeauticians } from "@/actions/users";
import BeauticiansList from "@/components/BeauticiansList";
import Brands from "@/components/Frontend/Brands";
import Hero from "@/components/Frontend/Hero";
import MegaMenu from "@/components/Frontend/MegaMenu";
import TabbedSection from "@/components/Frontend/TabbedSection";
import React from "react";

export default async function Home() {
  const beauticians = (await getBeauticians()) || [];
  // console.log(beauticians);
  const telhealthBeauticians = beauticians.filter(
    (beautician) =>
      beautician.beauticianProfile?.operationMode === "Virtual Consultations"
  );
  const inpersonBeauticians = beauticians.filter(
    (beautician) =>
      beautician.beauticianProfile?.operationMode === "Beauty Services"
  );
  console.log(inpersonBeauticians);
  return (
    <section className="">
      <Hero />
      <Brands />
      <TabbedSection />
      <BeauticiansList
        beauticians={telhealthBeauticians}
        title="Virtual Consultations"
      />
      <BeauticiansList
        className="bg-blue-50 dark:bg-slate-900 py-8 lg:py-24"
        title="Beauty Services"
        isInPerson={true}
        beauticians={inpersonBeauticians}
      />
    </section>
  );
}
