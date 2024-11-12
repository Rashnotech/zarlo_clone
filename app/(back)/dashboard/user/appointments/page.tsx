import { getClientAppointments } from "@/actions/appointments";
import HomeDisplayCard from "@/components/Dashboard/Beautician/HomeDisplayCard";

import NewButton from "@/components/Dashboard/Beautician/NewButton";

import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user?.role !== "USER") {
    return <NotAuthorized />;
  }
  const appointments = (await getClientAppointments(user?.id)).data || [];
  // console.log(appointments);
  return (
    <div>
      <div className="py-2  border-b border-gray-200 flex items-center justify-end px-4">
        <div className="flex items-center gap-4">
          <NewButton
            title="New Appointment"
            href="/dashboard/user/appointments/new"
          />
        </div>
      </div>
      <HomeDisplayCard
        title="Appointment"
        newAppointmentLink="/dashboard/user/appointments/new"
        count={appointments.length}
      />
    </div>
  );
}
