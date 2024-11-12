import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AvailabilitySettings from "@/components/Dashboard/Beautician/AvailabilitySettings";
import { getBeauticianProfileById } from "@/actions/onboarding";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import BeauticianServiceSettings from "@/components/Dashboard/Beautician/BeauticianServiceSettings";
// import { Tabs } from "flowbite-react";
export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log(user);
  const profile = await getBeauticianProfileById(user?.id);
  console.log(profile);
  return (
    <div className="max-w-5xl mx-auto w-full px-6 py-6">
      <h2 className="pb-4 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        Settings
      </h2>
      <Tabs defaultValue="availability" className="w-[800px]">
        <TabsList>
          <TabsTrigger value="availability">Availability Settings</TabsTrigger>
          <TabsTrigger value="service">Service Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="availability" className="w-full">
          {/* Availability Form */}
          <AvailabilitySettings profile={profile?.data} />
        </TabsContent>
        <TabsContent value="service">
          <BeauticianServiceSettings profile={profile?.data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
