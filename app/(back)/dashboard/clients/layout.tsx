import {
  getAppointments,
  getBeauticianAppointments,
  getClientAppointments,
} from "@/actions/appointments";
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
  if (user?.role !== "ADMIN") {
    return <NotAuthorized />;
  }
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
  return (
    <div>
      <div className="grid grid-cols-12">
        {/* LIST PANNEL */}
        <div className="col-span-4  py-3 border-r border-gray-100">
          <PanelHeader
            title="Clients"
            count={clients.length ?? 0}
            icon={Users}
          />
          <div className="px-3">
            <ClientPanel clients={clients} role={user?.role} />
          </div>
        </div>

        <div className="col-span-8">{children}</div>
      </div>
    </div>
  );
}
