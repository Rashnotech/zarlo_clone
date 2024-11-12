import {
  getBeauticianAppointments,
  getClientAppointments,
} from "@/actions/appointments";
import HomeDisplayCard from "@/components/Dashboard/Beautician/HomeDisplayCard";
import NewButton from "@/components/Dashboard/Beautician/NewButton";
import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import { ClientProps } from "./layout";
import generateSlug from "@/utils/generateSlug";
import { BeauticianProps } from "../../beautician/clients/layout";

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user?.role !== "USER") {
    return <NotAuthorized />;
  }

  const appointments = (await getClientAppointments(user?.id)).data || [];

  const uniqueClientsMap = new Map();

  appointments.forEach((app) => {
    if (!uniqueClientsMap.has(app.beauticianId)) {
      uniqueClientsMap.set(app.beauticianId, {
        beauticianId: app.beauticianId,
        beauticianName: app.beauticianName ?? "Name Not Provided",
      });
    }
  });
  const beauticians = Array.from(
    uniqueClientsMap.values()
  ) as BeauticianProps[];
  // console.log(clients);
  //beauticians/beautician-asuman-jb
  return (
    <div>
      <div className="py-2  border-b border-gray-200 flex items-center justify-end px-4">
        <div className="flex items-center gap-4">
          <NewButton
            title="New Beautician"
            href={`/category?mode=In-person%20beautician%20visit`}
          />
        </div>
      </div>
      <HomeDisplayCard
        title="Beautician"
        newAppointmentLink={`/category?mode=In-person%20beautician%20visit`}
        count={beauticians.length}
      />
    </div>
  );
}
