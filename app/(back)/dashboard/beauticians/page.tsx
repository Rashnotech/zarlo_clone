import { getBeauticianAppointments } from "@/actions/appointments";
import HomeDisplayCard from "@/components/Dashboard/Beautician/HomeDisplayCard";
import NewButton from "@/components/Dashboard/Beautician/NewButton";
import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import { ClientProps } from "./layout";
import generateSlug from "@/utils/generateSlug";
import { getBeauticians } from "@/actions/users";

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user?.role !== "ADMIN") {
    return <NotAuthorized />;
  }
  const beauticians = (await getBeauticians()) || [];
  // console.log(clients);
  //beauticians/beautician-asuman-jb
  return (
    <div>
      <div className="py-2  border-b border-gray-200 flex items-center justify-end px-4">
        <div className="flex items-center gap-4">
          <NewButton title="New Beautician" href={`#`} />
        </div>
      </div>
      <HomeDisplayCard
        title="Beauticians"
        newAppointmentLink={`#`}
        count={beauticians.length}
      />
    </div>
  );
}
