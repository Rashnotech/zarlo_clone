"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
  CalendarCheck,
  Check,
  CircleEllipsis,
  Dot,
  History,
  Mail,
  MapPin,
  User,
  X,
} from "lucide-react";
import { Appointment, UserRole } from "@prisma/client";
import { timeAgo } from "@/utils/timeAgo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ClientProps } from "@/app/(back)/dashboard/beautician/clients/layout";
import { BeauticianDetail } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/generateInitials";
import ApproveBtn from "../ApproveBtn";

export default function BeauticianPanel({
  beauticians,
  role,
}: {
  beauticians: any;
  role: UserRole;
}) {
  console.log(role);
  const pathname = usePathname();
  return (
    <ScrollArea className="h-96 w-full ">
      {beauticians &&
        beauticians.map((beautician: any) => {
          const status = beautician?.beauticianProfile?.status ?? "PENDING";
          const initials = getInitials(beautician.name);
          const path = `/dashboard/beauticians/view/${beautician.id}`;
          return (
            <Link
              href={`/dashboard/beauticians/view/${beautician.id}`}
              key={beautician.id}
              // className="flex items-center gap-4 mb-6"
              className={cn(
                "flex items-center gap-4 mb-4 border  border-gray-300 shadow-sm text-xs bg-white py-3 px-2 w-full rounded-md dark:text-slate-900",
                pathname === path && "border-green-700 border-2 bg-green-50"
              )}
            >
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
              <div className="ml-auto font-medium">
                <ApproveBtn
                  status={status}
                  profileId={beautician.beauticianProfile?.id ?? ""}
                />
              </div>
            </Link>
          );
        })}
    </ScrollArea>
  );
}
