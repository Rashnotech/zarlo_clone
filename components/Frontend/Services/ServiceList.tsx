import React from "react";
import ServiceCard from "./ServiceCard";
import { ServiceProps } from "@/types/types";
import { Service } from "@prisma/client";
import { ServiceWithBeauticianProfileCount } from "@/actions/services";

export default function ServiceList({
  data,
}: {
  data: ServiceWithBeauticianProfileCount[];
}) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-6 ">
      {data.map((service, i) => {
        return <ServiceCard key={i} service={service} />;
      })}
    </div>
  );
}
