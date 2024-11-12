import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ServiceWithBeauticianProfileCount } from "@/actions/services";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function ServiceCard({
  service,
}: {
  service: ServiceWithBeauticianProfileCount;
}) {
  return (
    <Link href={`/service/${service.slug}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-card">
        <div className="flex items-center gap-4 p-4">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
              <Image
                src={service.imageUrl}
                width={1170}
                height={848}
                alt={service.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="flex flex-col flex-grow min-w-0">
            <h2 className="text-base font-medium leading-tight text-foreground truncate">
              {service.title}
            </h2>

            <div className="flex items-center gap-1.5 mt-1">
              <Users className="w-3 h-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                {service._count.beauticianProfiles}{" "}
                <span className="hidden sm:inline">Beauticians Available</span>
                <span className="inline sm:hidden">Available</span>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
