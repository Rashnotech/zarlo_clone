import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  User,
  Briefcase,
  Clock,
  MapPin,
  Award,
  Sparkles,
  Building,
  Check,
  Star,
  HandCoins,
  ChevronRight,
} from "lucide-react";
import { BeauticianProfile } from "@prisma/client";

export default function FrontBeauticianDetails({
  beauticianProfile,
}: {
  beauticianProfile: BeauticianProfile | null | undefined;
}) {
  if (!beauticianProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-yellow-50 to-white dark:from-zinc-900 dark:via-zinc-900 dark:to-black p-4">
        <Card className="max-w-md w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl">
          <CardContent className="space-y-4 text-center p-8">
            <AlertTriangle className="w-12 h-12 text-yellow-500 dark:text-yellow-400 mx-auto animate-bounce" />
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
              Profile Not Found
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              The beautician profile you're looking for is currently unavailable
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderInfoCard = (
    icon: React.ReactNode,
    label: string,
    value: string | number | null | undefined
  ) => (
    <div className="group bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-zinc-100 dark:border-zinc-800">
      <div className="flex items-center gap-4">
        <div className="p-2.5 bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-lg group-hover:scale-105 transition-transform duration-300">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {label}
          </p>
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
            {value || "Not specified"}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-yellow-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="max-w-6xl mx-auto p-4 lg:p-6">
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/50"
            >
              Verified Professional
            </Badge>
            <Badge
              variant="secondary"
              className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
            >
              {beauticianProfile.yearsOfExperience}+ Years Experience
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            {beauticianProfile.businessName}
          </h1>
          <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400">
            Professional Beauty Services • License #
            {beauticianProfile.medicalLicense}
          </p>
        </div>

        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-1 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 w-full flex flex-wrap justify-start gap-1 sticky top-4 z-10">
            <TabsTrigger
              value="details"
              className="px-4 py-2.5 rounded-lg data-[state=active]:bg-yellow-100 dark:data-[state=active]:bg-yellow-900/30 data-[state=active]:text-yellow-900 dark:data-[state=active]:text-yellow-300 transition-all duration-300 text-sm"
            >
              <User className="w-4 h-4 mr-2" />
              <span>About</span>
            </TabsTrigger>
            <TabsTrigger
              value="practice"
              className="px-4 py-2.5 rounded-lg data-[state=active]:bg-yellow-100 dark:data-[state=active]:bg-yellow-900/30 data-[state=active]:text-yellow-900 dark:data-[state=active]:text-yellow-300 transition-all duration-300 text-sm"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              <span>Services</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="grid gap-6">
              <Card className="overflow-hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                    <User className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    About Me
                  </h2>
                  <div className="space-y-4">
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm bg-gradient-to-br from-yellow-50 to-transparent dark:from-yellow-900/20 dark:to-transparent p-4 rounded-xl border border-yellow-100/50 dark:border-yellow-900/30">
                      {beauticianProfile.bio}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                {renderInfoCard(
                  <Award className="w-5 h-5 text-yellow-700 dark:text-yellow-400" />,
                  "License Number",
                  beauticianProfile.medicalLicense
                )}
                {renderInfoCard(
                  <Star className="w-5 h-5 text-yellow-700 dark:text-yellow-400" />,
                  "Experience",
                  `${beauticianProfile.yearsOfExperience} Years`
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="practice">
            <div className="grid gap-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {renderInfoCard(
                  <HandCoins className="w-5 h-5 text-yellow-700 dark:text-yellow-400" />,
                  "Booking Fee",
                  `R${beauticianProfile.hourlyWage}`
                )}
                {renderInfoCard(
                  <MapPin className="w-5 h-5 text-yellow-700 dark:text-yellow-400" />,
                  "Location",
                  beauticianProfile.businessAddress
                )}
                {renderInfoCard(
                  <Clock className="w-5 h-5 text-yellow-700 dark:text-yellow-400" />,
                  "Business Hours",
                  beauticianProfile.businessHoursOfOperation
                )}
              </div>

              {beauticianProfile.servicesOffered && (
                <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                      <Sparkles className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      Available Services
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {beauticianProfile.servicesOffered.map((service, i) => (
                        <div
                          key={i}
                          className="group flex items-center gap-3 p-3 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-900/50 rounded-lg border border-zinc-100 dark:border-zinc-800 hover:border-yellow-200 dark:hover:border-yellow-900/50 transition-all duration-300"
                        >
                          <div className="p-1.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-md">
                            <Check className="w-3.5 h-3.5 text-yellow-700 dark:text-yellow-400" />
                          </div>
                          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            {service}
                          </span>
                          <ChevronRight className="w-4 h-4 text-zinc-400 dark:text-zinc-600 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
