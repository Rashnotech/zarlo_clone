import {
  DataProps,
  getBeauticiansByServiceSlug,
  getBeauticiansBySpecialtySlug,
  getBeauticiansBySymptomId,
} from "@/actions/beauticians";
import BeauticianCard from "@/components/BeauticianCard";
import { Beautician } from "@/types/types";
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function page({
  params: { slug },
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { id } = searchParams;
  const title = slug.split("-").join(" ");
  const data = (await getBeauticiansBySymptomId(id as string)) as DataProps;
  const beauticians = (data?.beauticians as Beautician[]) || [];
  console.log(beauticians);
  const services = data?.services || [];

  return (
    <div className="container py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight capitalize">
          {title}
          <span className="ml-2 text-2xl text-muted-foreground">
            ({beauticians.length.toString().padStart(2, "0") || "0"})
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar */}
        <Card className="col-span-3 h-fit">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Other Services</h2>
            {services && services.length > 0 && (
              <ScrollArea className="h-[400px] pr-4">
                <div className="flex flex-col space-y-2">
                  {services.map((service, i) => (
                    <Link
                      key={i}
                      href={`/symptoms/${service.slug}?id=${service.id}`}
                      className="text-sm transition-colors hover:text-primary py-2 px-3 rounded-md hover:bg-accent"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="col-span-9">
          {beauticians && beauticians.length > 0 ? (
            <div className="grid grid-cols-2 gap-6">
              {beauticians.map((beautician: Beautician) => (
                <BeauticianCard key={beautician.id} beautician={beautician} />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <h2 className="text-xl font-medium text-muted-foreground">
                No Beauticians available for this category
              </h2>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
