import { BeauticianProfileAvailability } from "@/types/types";
import { getDayName } from "@/utils/getDayName";
import { getFormattedDate } from "@/utils/getFormatedShortDate";
import { Scissors, Video, MapPin, Star, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";

export default function BeauticianCard({
  isInPerson = false,
  beautician,
}: {
  isInPerson?: boolean;
  beautician: any;
}) {
  const today: keyof BeauticianProfileAvailability = getDayName();
  const times = beautician.beauticianProfile?.availability?.[today] ?? null;
  const formattedDate = getFormattedDate();

  return (
    <>
      {times && times.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-300 w-full max-w-sm overflow-hidden">
          <Link
            href={`/beauticians/${beautician.slug}?id=${beautician.id}`}
            className="flex flex-col p-4"
          >
            {/* Header Section */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="font-semibold text-base text-slate-900 dark:text-slate-100 line-clamp-1">
                  {`${beautician.beauticianProfile?.firstName} ${beautician.beauticianProfile?.lastName}`}
                </h2>
                {isInPerson && (
                  <p className="flex items-center text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                    <MapPin className="w-3 h-3 mr-1" />
                    Serving Pretoria East
                  </p>
                )}
              </div>
              <Badge
                variant="secondary"
                className="text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              >
                Available Today
              </Badge>
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <Image
                  src={
                    beautician.beauticianProfile?.profilePicture ??
                    "/doc-profile.jpeg"
                  }
                  width={64}
                  height={64}
                  alt={beautician.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                {!isInPerson && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-100 dark:bg-blue-900 w-6 h-6 flex items-center justify-center rounded-full">
                    <Video className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="flex items-center text-slate-600 dark:text-slate-400 text-xs">
                  <Scissors className="w-3 h-3 mr-1" />
                  Beautician
                </p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>
            </div>
          </Link>

          {/* Bottom Section */}
          <div className="border-t border-slate-200 dark:border-slate-700 p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="flex items-center text-slate-600 dark:text-slate-400 text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                {formattedDate}
              </span>
              <span className="text-slate-900 dark:text-slate-100">
                <span className="font-semibold">
                  R{beautician.beauticianProfile?.hourlyWage}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {" "}
                  to Book
                </span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {times.slice(0, 5).map((item: string[], i: number) => (
                <Link
                  key={i}
                  href={`/beauticians/${beautician.slug}?id=${beautician.id}`}
                  className="text-center py-1.5 text-[11px] rounded border border-yellow-400/50 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-400/10 transition-colors"
                >
                  {item}
                </Link>
              ))}
              <Link
                href={`/beauticians/${beautician.slug}?id=${beautician.id}`}
                className="text-center py-1.5 text-[11px] rounded border border-yellow-600/50 text-yellow-700 dark:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 transition-colors"
              >
                More times
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
