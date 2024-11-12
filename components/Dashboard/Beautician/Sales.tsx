/* eslint-disable react/jsx-key */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInitials } from "@/utils/generateInitials";
import { getLongDate } from "@/utils/getLongDate";
import { getNormalDate } from "@/utils/getNormalDate";
import { Sale } from "@prisma/client";
import Link from "next/link";
export default function Sales({
  data,
  title,
  role,
}: {
  data: Sale[];
  title: string;
  role: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {data.map((item, i) => {
          const initials = getInitials(item.clientName);
          return (
            <>
              {role === "BEAUTICIAN" ? (
                <Link
                  href={`/dashboard/beautician/appointments/view/$
                {item.appointmentId}`}
                  className="flex items-center gap-4"
                >
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p
                      className="text-sm font-medium
                leading-none"
                    >
                      {item.clientName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.appointmentId}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    ZAR {item.totalAmount.toLocaleString()}
                  </div>
                  <div className="ml-auto font-medium">
                    {getNormalDate(item.createdAt.toISOString())}
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p
                      className="text-sm font-medium
                leading-none"
                    >
                      {item.clientName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.appointmentId}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    ZAR {item.totalAmount.toLocaleString()}
                  </div>
                  <div className="ml-auto font-medium">
                    {getNormalDate(item.createdAt.toISOString())}
                  </div>
                </div>
              )}
            </>
          );
        })}
      </CardContent>
    </Card>
  );
}
