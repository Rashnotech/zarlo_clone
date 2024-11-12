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
import { BeauticianProps } from "@/app/(back)/dashboard/user/beauticians/layout";
import generateSlug from "@/utils/generateSlug";

export default function BeauticiansPanel({
  beauticians,
  role,
}: {
  beauticians: BeauticianProps[];
  role: UserRole;
}) {
  const pathname = usePathname();
  return (
    <ScrollArea className="h-96 w-full ">
      {beauticians.map((item, i) => {
        const slug = generateSlug(item.beauticianName);
        return (
          <Link
            key={i}
            href={`/beauticians/${slug}?id=${item.beauticianId}`}
            className={cn(
              "border mb-2 border-gray-300 shadow-sm text-xs bg-white py-3 px-2 inline-block w-full rounded-md dark:text-slate-900",
              pathname ===
                `/dashboard/beautician/clients/view/${item.beauticianId}` &&
                "border-green-700 border-2 bg-green-50"
            )}
          >
            <div className="flex justify-between items-center pb-2">
              <h2>{item.beauticianName}</h2>
            </div>
          </Link>
        );
      })}
    </ScrollArea>
  );
}
