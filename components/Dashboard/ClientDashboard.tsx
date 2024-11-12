import React from "react";
import AnalyticsCard from "../AnalyticsCard";
import { Session } from "next-auth";
import { getUserAnalytics } from "@/actions/stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getClientAppointments } from "@/actions/appointments";
import { BeauticianProps } from "@/app/(back)/dashboard/beauticians/layout";
import { Button } from "../ui/button";
import Link from "next/link";
import { timeAgo } from "@/utils/timeAgo";
import { CalendarCheck, Check, CircleEllipsis, History, X } from "lucide-react";
import { cn } from "@/lib/utils";
import generateSlug from "@/utils/generateSlug";
export default async function ClientDashboard({
  session,
}: {
  session: Session | null;
}) {
  const user = session?.user;
  const userId = user?.id ?? "";
  const analytics = (await getUserAnalytics()) || [];
  const appointments = (await getClientAppointments(userId)).data || [];

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
    <div className="px-8 py-4">
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight mb-3">
        Welcome, {user?.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
        {analytics.map((item, i) => {
          return <AnalyticsCard key={i} data={item} />;
        })}
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 grid-cols-1 ">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Appointments</CardTitle>
              <Button asChild>
                <Link href="/dashboard/user/appointments">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            {appointments &&
              appointments.slice(0, 5).map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={`/dashboard/user/appointments/view/${item.id}`}
                    className={
                      "border mb-2 border-gray-300 shadow-sm text-xs bg-white py-3 px-2 inline-block w-full rounded-md dark:text-slate-900"
                    }
                  >
                    <div className="flex justify-between items-center pb-2">
                      <h2>From {item.beauticianName}</h2>
                      <div className="flex items-center ">
                        <History className="w-4 h-4 mr-2" />
                        <span>{timeAgo(item.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center font-semibold">
                        <CalendarCheck className="w-4 h-4 mr-2" />
                        <span>{item.appointmentFormattedDate}</span>
                      </div>
                      <span className="font-semibold">
                        {item.appointmentTime}
                      </span>
                      <div
                        className={cn(
                          "flex items-center text-yellow-400",
                          item.status === "approved" &&
                            "text-green-600 font-semibold"
                        )}
                      >
                        {item.status === "pending" ? (
                          <CircleEllipsis className="mr-2 w-4 h-4" />
                        ) : item.status === "approved" ? (
                          <Check className="mr-2 w-4 h-4" />
                        ) : (
                          <X className="mr-2 w-4 h-4" />
                        )}
                        <span>{item.status}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Beauticians</CardTitle>
              <Button asChild>
                <Link href="/dashboard/beautician/clients">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-8">
            {beauticians &&
              beauticians.slice(0, 5).map((item) => {
                const slug = generateSlug(item.beauticianName);
                return (
                  <Link
                    key={item.beauticianId}
                    href={`/beauticians/${slug}?id=${item.beauticianId}`}
                    className={
                      "border mb-2 border-gray-300 shadow-sm text-xs bg-white py-3 px-2 w-full rounded-md dark:text-slate-900 flex justify-between items-center "
                    }
                  >
                    <h2 className="font-medium">{item.beauticianName}</h2>
                    <Button size={"sm"} variant={"outline"}>
                      View
                    </Button>
                  </Link>
                );
              })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
