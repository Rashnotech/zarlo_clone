import {
  DataProps,
  getBeauticiansByServiceSlug,
  getBeauticiansBySpecialtySlug,
} from "@/actions/beauticians";
import BeauticianCard from "@/components/BeauticianCard";
import { Beautician } from "@/types/types";
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, Search, Award } from "lucide-react";

export default async function page({
  params: { slug },
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { type } = searchParams;
  const title = slug.split("-").join(" ");
  const data = (await getBeauticiansBySpecialtySlug(slug)) as DataProps;
  const beauticians = (data?.beauticians as Beautician[]) || [];
  const services = data?.services || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-6 py-8">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-gray-600">Specialty Services</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-4">
              <h1 className="text-4xl font-bold text-gray-900 capitalize">
                {title}
              </h1>
              <span className="text-lg font-medium text-gray-500">
                ({beauticians.length.toString().padStart(2, "0") || "0"}{" "}
                specialists)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-600">
                Expert Specialists
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Services Sidebar */}
          <div className="col-span-3">
            <Card className="sticky top-4 shadow-sm border-0 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Popular Specialties
                  </h2>
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                <Separator className="mb-6" />
                {services && services.length > 0 && (
                  <div className="space-y-3">
                    {services.map((service, i) => (
                      <Link
                        key={i}
                        href={`/specialty/${service.slug}`}
                        className="block group"
                      >
                        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-all duration-200">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600 group-hover:text-yellow-600 transition-colors duration-200">
                              {service.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400 group-hover:translate-x-1 transform transition-transform duration-200">
                              →
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {beauticians && beauticians.length > 0 ? (
              <div className="grid grid-cols-2 gap-6">
                {beauticians.map((beautician: Beautician) => (
                  <BeauticianCard key={beautician.id} beautician={beautician} />
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-sm bg-white/50 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                  <Search className="w-12 h-12 text-gray-300 mb-4" />
                  <h2 className="text-xl font-medium text-gray-900 mb-2">
                    No Specialists Available
                  </h2>
                  <p className="text-gray-500">
                    We couldn't find any specialists for {title} at the moment.
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Try exploring other specialties or check back later
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
