import React from "react";
import SectionHeading from "./SectionHeading";
import ToggleButton from "./ToggleButton";
import Link from "next/link";
import BeauticianCard from "./BeauticianCard";
import { ArrowUpRight, Map } from "lucide-react";
import BeauticiansListCarousel from "./BeauticiansListCarousel";
import { Button } from "./ui/button";
import { User } from "@prisma/client";
import { Beautician } from "@/types/types";

export default function BeauticiansList({
  title = "Virtual Consultations",
  isInPerson,
  className = "bg-slate-300 dark:bg-yellow-600 py-8 lg:py-24",
  beauticians,
}: {
  title?: string;
  isInPerson?: boolean;
  className?: string;
  beauticians: Beautician[];
}) {
  return (
    <div className={className}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading title={title} />
        <div className="py-4 flex items-center justify-between">
          {isInPerson ? (
            <Link
              href=""
              className="text-sm flex items-center text-yellow-400 font-semibold"
            >
              <Map className="mr-2 flex-shrink-0 w-4 h-4" />
              <span>Map View</span>
            </Link>
          ) : (
            <ToggleButton />
          )}
          <Button asChild>
            <Link className=" " href={`/category?mode=${title}`}>
              See All
              <ArrowUpRight className="h-4 w-4 ms-2" />
            </Link>
          </Button>
        </div>
        <div className="py-6">
          <BeauticiansListCarousel
            beauticians={beauticians}
            isInPerson={isInPerson}
          />
        </div>
      </div>
    </div>
  );
}
