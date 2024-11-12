import { getBeauticianAppointments } from "@/actions/appointments";
import ListPanel from "@/components/Dashboard/Beautician/ListPanel";
import PanelHeader from "@/components/Dashboard/Beautician/PanelHeader";
import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { Calendar } from "lucide-react";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";

export default async function AppointmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user?.role !== "BEAUTICIAN") {
    return <NotAuthorized />;
  }
  const appointments = (await getBeauticianAppointments(user?.id)).data || [];
  return (
    <div>
      {/* Header */}

      {/* 2 PANNELS */}
      <div className="grid grid-cols-12">
        {/* LIST PANNEL */}
        <div className="col-span-4  py-3 border-r border-gray-100">
          <PanelHeader
            title="Appointments"
            count={appointments.length ?? 0}
            icon={Calendar}
          />
          <div className="px-3">
            <ListPanel appointments={appointments} role={user?.role} />
          </div>
        </div>

        <div className="col-span-8">{children}</div>
      </div>
    </div>
  );
}
