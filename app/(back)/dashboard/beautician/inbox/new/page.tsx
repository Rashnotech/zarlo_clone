import { getBeauticianAppointments } from "@/actions/appointments";
import InboxForm from "@/components/Dashboard/InboxForm";
import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import { ClientProps } from "../../clients/layout";

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user?.role !== "BEAUTICIAN") {
    return <NotAuthorized />;
  }
  const appointments = (await getBeauticianAppointments(user?.id)).data || [];

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
  const users = clients.map((client) => {
    return {
      label: client.name,
      value: client.clientId,
    };
  });
  return <InboxForm users={users} session={session} title="New Message" />;
}
