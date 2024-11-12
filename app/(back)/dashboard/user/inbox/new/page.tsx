import {
  getBeauticianAppointments,
  getClientAppointments,
} from "@/actions/appointments";
import InboxForm from "@/components/Dashboard/InboxForm";
import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import {
  BeauticianProps,
  ClientProps,
} from "../../../beautician/clients/layout";

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
  console.log(beauticians);
  const users = beauticians.map((beautician) => {
    return {
      label: beautician.beauticianName,
      value: beautician.beauticianId,
    };
  });
  return <InboxForm users={users} session={session} title="New Message" />;
}
