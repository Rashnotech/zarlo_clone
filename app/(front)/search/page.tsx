import {
  DataProps,
  getBeauticiansBySearch,
  getBeauticiansByServiceSlug,
} from "@/actions/beauticians";
import { getServices } from "@/actions/services";
import BeauticianCard from "@/components/BeauticianCard";
import LinkCards from "@/components/Frontend/Beauticians/LinkCards";
import SymptomCards from "@/components/Frontend/Beauticians/SymptomCards";
import ServiceList from "@/components/Frontend/Services/ServiceList";
import { Beautician } from "@/types/types";
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { query } = searchParams;
  const data = await getBeauticiansBySearch(query as string);
  const beauticians = data?.beauticians || [];
  const searchServices = data?.services || [];
  const specialties = data?.specialties || [];
  const symptoms = data?.symptoms || [];
  const allServices = (await getServices()).data || [];
  const services = searchServices.length > 0 ? searchServices : allServices;

  return (
    <div className="container py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <Search className="w-8 h-8 text-muted-foreground" />
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Results for <span className="capitalize text-primary">{query}</span>
        </h1>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar */}
        <Card className="col-span-3 h-fit">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Browse By Services</h2>
            {services && services.length > 0 && (
              <ScrollArea className="h-[400px] pr-4">
                <div className="flex flex-col space-y-1">
                  {services.map((service, i) => (
                    <Link
                      key={i}
                      href={`/service/${service.slug}`}
                      className="flex items-center justify-between text-sm py-2 px-3 rounded-md hover:bg-accent transition-colors"
                    >
                      <span>{service.title}</span>
                      <span className="text-muted-foreground">
                        (
                        {service._count.beauticianProfiles
                          .toString()
                          .padStart(2, "0")}
                        )
                      </span>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="col-span-9 space-y-8">
          {searchServices && searchServices.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Services matching "
                  <span className="text-primary">{query}</span>"
                </h2>
                <ServiceList data={searchServices} />
              </CardContent>
            </Card>
          )}

          {specialties && specialties.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Specialties matching "
                  <span className="text-primary">{query}</span>"
                </h2>
                <LinkCards className="bg-primary" specialties={specialties} />
              </CardContent>
            </Card>
          )}

          {symptoms && symptoms.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Symptoms matching "
                  <span className="text-primary">{query}</span>"
                </h2>
                <SymptomCards className="bg-primary" symptoms={symptoms} />
              </CardContent>
            </Card>
          )}

          {beauticians && beauticians.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Beauticians matching "
                  <span className="text-primary">{query}</span>"
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  {beauticians.map((beautician: Beautician) => (
                    <BeauticianCard
                      key={beautician.id}
                      beautician={beautician}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {!searchServices?.length &&
            !specialties?.length &&
            !symptoms?.length &&
            !beauticians?.length && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-2xl font-medium text-muted-foreground">
                    No results found for "{query}"
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Try searching with different keywords or browse through our
                    services
                  </p>
                </CardContent>
              </Card>
            )}
        </div>
      </div>
    </div>
  );
}
