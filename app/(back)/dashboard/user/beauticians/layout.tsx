import {
  getAppointments,
  getBeauticianAppointments,
  getClientAppointments,
} from "@/actions/appointments";
import BeauticiansPanel from "@/components/Dashboard/Beautician/BeauticiansPanel";
import ListPanel from "@/components/Dashboard/Beautician/ListPanel";
import PanelHeader from "@/components/Dashboard/Beautician/PanelHeader";
import ClientPanel from "@/components/Dashboard/Beautician/ClientPanel";
import NotAuthorized from "@/components/NotAuthorized";
import { authOptions } from "@/lib/auth";
import { Calendar, Users } from "lucide-react";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";
export interface ClientProps {
  clientId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  gender: string;
  occupation: string;
  dob: string;
}
export interface BeauticianProps {
  beauticianId: string;
  beauticianName: string;
}
export default async function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
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
  return (
    <div>
      <div className="grid grid-cols-12">
        {/* LIST PANNEL */}
        <div className="col-span-4  py-3 border-r border-gray-100">
          <PanelHeader
            title="Clients"
            count={beauticians.length ?? 0}
            icon={Users}
          />
          <div className="px-3">
            <BeauticiansPanel beauticians={beauticians} role={user?.role} />
          </div>
        </div>

        <div className="col-span-8">{children}</div>
      </div>
    </div>
  );
}
