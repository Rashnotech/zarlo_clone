import React from "react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { Check, RefreshCcw, X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import BeauticianDetails from "@/components/BeauticianDetails";
import { Appointment } from "@prisma/client";
import { getBeauticianById, getBeauticianProfile } from "@/actions/users";
import { getAppointmentByClientId } from "@/actions/appointments";
import { authOptions } from "@/lib/auth";

const VerificationBadge = ({ status }: { status: string }) => {
  const badges = {
    APPROVED: {
      icon: Check,
      text: "Verified Profile",
      className: "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20",
      iconClass: "text-emerald-500",
    },
    PENDING: {
      icon: Clock,
      text: "Verification Pending",
      className: "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20",
      iconClass: "text-amber-500",
    },
    REJECTED: {
      icon: X,
      text: "Verification Failed",
      className: "bg-rose-500/10 text-rose-500 dark:bg-rose-500/20",
      iconClass: "text-rose-500",
    },
  };

  const badge = badges[status as keyof typeof badges] || badges.PENDING;
  const Icon = badge.icon;

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
        badge.className
      )}
    >
      <Icon className={cn("w-4 h-4", badge.iconClass)} />
      <span>{badge.text}</span>
    </div>
  );
};

export default async function Page({
  params: { slug },
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { id } = searchParams;
  const session = await getServerSession(authOptions);
  const beautician = (await getBeauticianById(id as string)) || null;
  const user = session?.user;
  const appointment = await getAppointmentByClientId(user?.id ?? "");
  const beauticianProfile = await getBeauticianProfile((id as string) ?? "");
  const status = beauticianProfile?.status ?? "PENDING";

  return (
    <>
      {beautician && beautician.id ? (
        <div className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 py-12 min-h-screen px-4 sm:px-6">
          <Card className="max-w-4xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6 md:p-8">
              {/* Profile Header Section */}
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Left Column - Image and Verification */}
                <div className="w-full sm:w-auto flex flex-col items-center sm:items-start gap-4">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 to-yellow-300 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative">
                      <Image
                        src={
                          beautician.beauticianProfile?.profilePicture ??
                          "/doc-profile.jpeg"
                        }
                        width={120}
                        height={120}
                        alt="Beautician"
                        className="rounded-xl object-cover"
                      />
                    </div>
                  </div>
                  <VerificationBadge status={status} />
                </div>

                {/* Right Column - Info */}
                <div className="flex-1 w-full">
                  <div className="space-y-4">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                        {beautician.name}
                      </h1>
                      <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Professional Beauty Consultant
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="inline-flex items-center px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                        <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                          {beautician.beauticianProfile?.operationMode}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {beautician.beauticianProfile?.state},{" "}
                        {beautician.beauticianProfile?.city},{" "}
                        {beautician.beauticianProfile?.country}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {["Skin Care", "Makeup", "Hair Styling", "Nail Art"].map(
                        (specialty) => (
                          <Badge
                            key={specialty}
                            variant="secondary"
                            className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
                          >
                            {specialty}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Details Section */}
              <BeauticianDetails
                appointment={appointment as Appointment | null}
                beautician={beautician}
                beauticianProfile={beauticianProfile}
              />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="p-8">
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
              No Beautician Details Found
            </h2>
          </Card>
        </div>
      )}
    </>
  );
}
