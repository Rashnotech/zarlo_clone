"use server";

import { prismaClient } from "@/lib/db";
import { Beautician } from "@/types/types";
import generateSlug from "@/utils/generateSlug";

type ServiceProps = {
  title: string;
  slug: string;
  id?: string;
};
export type DataProps = {
  beauticians: Beautician[] | undefined;
  services: ServiceProps[];
};
export async function getBeauticiansByServiceSlug(slug: string) {
  try {
    if (slug) {
      let beauticians: any[] | undefined = [];
      let services: ServiceProps[] = [];
      const service = await prismaClient.service.findUnique({
        where: {
          slug,
        },
        include: {
          beauticianProfiles: {
            include: {
              availability: true,
            },
          },
        },
      });
      beauticians = service?.beauticianProfiles.map((doc) => {
        return {
          id: doc.userId,
          name: `${doc.firstName} ${doc.lastName} `,
          email: doc.email ?? "",
          phone: doc.phone ?? "",
          slug: generateSlug(`${doc.firstName} ${doc.lastName} `),
          beauticianProfile: doc,
        };
      });
      services = await prismaClient.service.findMany({
        where: {
          id: {
            not: service?.id,
          },
        },
      });
      const data: DataProps = {
        beauticians,
        services,
      };
      return data as DataProps;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getBeauticiansBySpecialtySlug(slug: string) {
  try {
    if (slug) {
      let beauticians: any[] | undefined = [];
      let services: ServiceProps[] = [];
      const service = await prismaClient.speciality.findUnique({
        where: {
          slug,
        },
        include: {
          beauticianProfiles: {
            include: {
              availability: true,
            },
          },
        },
      });
      beauticians = service?.beauticianProfiles.map((doc) => {
        return {
          id: doc.userId,
          name: `${doc.firstName} ${doc.lastName} `,
          email: doc.email ?? "",
          phone: doc.phone ?? "",
          slug: generateSlug(`${doc.firstName} ${doc.lastName} `),
          beauticianProfile: doc,
        };
      });
      services = await prismaClient.speciality.findMany({
        where: {
          id: {
            not: service?.id,
          },
        },
      });
      const data: DataProps = {
        beauticians,
        services,
      };
      return data as DataProps;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getBeauticiansBySymptomId(symptomId: string) {
  try {
    if (symptomId) {
      let beauticians: any[] | undefined = [];
      let services: ServiceProps[] = [];
      const beauticianProfiles = await prismaClient.beauticianProfile.findMany({
        where: {
          symptomIds: {
            has: symptomId, // This checks if symptomIds array contains the symptomId
          },
        },
        include: {
          availability: true,
        },
      });
      beauticians = beauticianProfiles.map((doc) => {
        return {
          id: doc.userId,
          name: `${doc.firstName} ${doc.lastName} `,
          email: doc.email ?? "",
          phone: doc.phone ?? "",
          slug: generateSlug(`${doc.firstName} ${doc.lastName} `),
          beauticianProfile: doc,
        };
      });
      services = await prismaClient.symptom.findMany({
        where: {
          id: {
            not: symptomId,
          },
        },
      });
      const data: DataProps = {
        beauticians,
        services,
      };
      return data as DataProps;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getBeauticiansBySearch(query: string) {
  if (query) {
    const services = await prismaClient.service.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { slug: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        _count: {
          select: {
            beauticianProfiles: true,
          },
        },
      },
    });
    const symptoms = await prismaClient.symptom.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { slug: { contains: query, mode: "insensitive" } },
        ],
      },
    });
    const specialties = await prismaClient.speciality.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { slug: { contains: query, mode: "insensitive" } },
        ],
      },
    });
    const beauticianProfiles = await prismaClient.beauticianProfile.findMany({
      where: {
        OR: [
          { firstName: { contains: query, mode: "insensitive" } },
          { lastName: { contains: query, mode: "insensitive" } },
          { servicesOffered: { hasSome: [query] } },
        ],
      },
      include: {
        availability: true,
      },
    });
    const beauticians = beauticianProfiles.map((doc) => {
      return {
        id: doc.userId,
        name: `${doc.firstName} ${doc.lastName} `,
        email: doc.email ?? "",
        phone: doc.phone ?? "",
        slug: generateSlug(`${doc.firstName} ${doc.lastName} `),
        beauticianProfile: doc,
      };
    });
    return {
      services,
      specialties,
      symptoms,
      beauticians,
    };
  }
}
