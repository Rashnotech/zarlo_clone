"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Activity,
  Flame,
  Waypoints,
  Stethoscope,
  Syringe,
  X,
} from "lucide-react";
import ServiceList from "./Services/ServiceList";
import LinkCards from "./Beauticians/LinkCards";
import { Service, Speciality, Symptom } from "@prisma/client";
import SymptomCards from "./Beauticians/SymptomCards";
import { ServiceWithBeauticianProfileCount } from "@/actions/services";

type TabbedItemsProps = {
  services: ServiceWithBeauticianProfileCount[];
  specialties: Speciality[];
  symptoms: Symptom[];
};

export default function TabbedItems({
  services,
  specialties,
  symptoms,
}: TabbedItemsProps) {
  const [activeTab, setActiveTab] = useState("popular-services");

  const tabs = [
    {
      id: "popular-services",
      title: "Popular Services",
      icon: Flame,
      component: <ServiceList data={services} />,
    },
    {
      id: "specialists",
      title: "Specialists",
      icon: Activity,
      component: (
        <LinkCards className="bg-yellow-600" specialties={specialties} />
      ),
    },
    {
      id: "symptoms",
      title: "Symptoms",
      icon: Syringe,
      component: <SymptomCards symptoms={symptoms} className="bg-yellow-950" />,
    },
  ];

  return (
    <div className="w-full px-2 md:px-4 py-4">
      <Tabs
        defaultValue="popular-services"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="w-full flex flex-wrap justify-start gap-1 bg-transparent mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                  ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-muted"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.title}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent
            key={tab.id}
            value={tab.id}
            className="mt-2 focus-visible:outline-none focus-visible:ring-0"
          >
            <div className="p-1">{tab.component}</div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
