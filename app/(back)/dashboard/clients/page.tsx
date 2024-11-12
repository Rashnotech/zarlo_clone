import {
  getAppointments,
  getBeauticianAppointments,
} from "@/actions/appointments";
import HomeDisplayCard from "@/components/Dashboard/Beautician/HomeDisplayCard";
import NewButton from "@/components/Dashboard/Beautician/NewButton";
import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import { ClientProps } from "./layout";
import generateSlug from "@/utils/generateSlug";

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const slug = generateSlug(user?.name ?? "");
  const appointments = (await getAppointments()).data || [];

  const uniqueClientsMap = new Map();

  appointments.forEach((app) => {
    if (!uniqueClientsMap.has(app.clientId)) {
      uniqueClientsMap.set(app.clientId, {
        clientId: app.clientId,
        name: `${app.firstName} ${app.lastName}`,
        email: app.email,
        phone: app.phone,
        location: app.location,
        gender: app.gender,
        occupation: app.occupation,
        dob: app.dob,
      });
    }
  });
  const clients = Array.from(uniqueClientsMap.values()) as ClientProps[];
  // console.log(clients);
  //beauticians/beautician-asuman-jb
  return (
    <div>
      <div className="py-2  border-b border-gray-200 flex items-center justify-end px-4">
        <div className="flex items-center gap-4">
          <NewButton title="New Client" href={``} />
        </div>
      </div>
      <HomeDisplayCard
        title="Client"
        newAppointmentLink={""}
        count={clients.length}
      />
    </div>
  );
}
