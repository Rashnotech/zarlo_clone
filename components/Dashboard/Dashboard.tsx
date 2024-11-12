import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  CreditCard,
  DollarSign,
  LayoutGrid,
  Users,
  UsersRound,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdminAnalytics, getStats } from "@/actions/stats";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AnalyticsCard from "../AnalyticsCard";
import { getBeauticians } from "@/actions/users";
import { getInitials } from "@/utils/generateInitials";
import ApproveBtn from "./ApproveBtn";
import { getAppointments } from "@/actions/appointments";
import { ClientProps } from "@/app/(back)/dashboard/beauticians/layout";

export default async function Dashboard() {
  const analytics = await getAdminAnalytics();
  const beauticians = (await getBeauticians()) || [];
  const session = await getServerSession(authOptions);
  const user = session?.user;
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
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      {/* <p>The User Role is {user?.role}</p> */}
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight mb-3">
        Welcome, Admin {user?.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analytics.map((item, i) => {
          return <AnalyticsCard key={i} data={item} />;
        })}
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 grid-cols-1 ">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Beauticians</CardTitle>
              <Button asChild>
                <Link href="/dashboard/beauticians">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-8">
            {beauticians &&
              beauticians.slice(0, 5).map((beautician) => {
                const initials = getInitials(beautician.name);
                return (
                  <div key={beautician.id} className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage
                        src={beautician.beauticianProfile?.profilePicture ?? ""}
                        alt="Avatar"
                      />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {beautician.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {beautician.email}
                      </p>
                    </div>
                    <div className="ml-auto font-medium flex space-x-2 items-center">
                      <Button size={"sm"} asChild variant={"outline"}>
                        <Link
                          href={`/dashboard/beauticians/view/${beautician.id}`}
                        >
                          View
                        </Link>
                      </Button>
                      <ApproveBtn
                        status={
                          beautician.beauticianProfile?.status ?? "PENDING"
                        }
                        profileId={beautician.beauticianProfile?.id ?? ""}
                      />
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Clients</CardTitle>
              <Button asChild>
                <Link href="/dashboard/clients">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-8">
            {clients &&
              clients.slice(0, 5).map((client) => {
                const initials = getInitials(client.name);
                return (
                  <div key={client.email} className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src={""} alt="Avatar" />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {client.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {client.email}
                      </p>
                    </div>
                    <div className="ml-auto font-medium flex space-x-2 items-center">
                      <Button size={"sm"} asChild variant={"outline"}>
                        <Link
                          href={`/dashboard/clients/view/${client.clientId}`}
                        >
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
