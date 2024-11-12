"use server";

import { prismaClient } from "@/lib/db";
import {
  AlarmClock,
  DollarSign,
  LayoutGrid,
  LucideIcon,
  Mail,
  Users,
} from "lucide-react";
import {
  getAppointments,
  getBeauticianAppointments,
  getClientAppointments,
} from "./appointments";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getInboxMessages } from "./inbox";
import { getBeauticians } from "./users";
import { getServices } from "./services";
import { FaMoneyBill } from "react-icons/fa";
import { getBeauticianSales } from "./sales";
export type BeauticianAnalyticsProps = {
  title: string;
  count: number;
  icon: LucideIcon;
  unit: string;
  detailLink: string;
};
export async function getAdminAnalytics() {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const appointments = (await getAppointments()).data || [];
    const beauticians = (await getBeauticians()) || [];
    const services = (await getServices()).data || [];
    const uniqueClientsMap = new Map();

    appointments.forEach((app) => {
      if (!uniqueClientsMap.has(app.clientId)) {
        uniqueClientsMap.set(app.clientId, {
          clientId: app.clientId,
          name: `${app.firstName} ${app.lastName}`,
          email: app.email,
          phone: app.phone,
          location: app.location,
          gender: app.gender,
          occupation: app.occupation,
          dob: app.dob,
        });
      }
    });
    const clients = Array.from(uniqueClientsMap.values());
    const messages = (await getInboxMessages(user!.id)).data || [];
    const analytics = [
      {
        title: "Beauticians",
        count: beauticians.length,
        icon: Users,
        unit: "",
        detailLink: "/dashboard/beauticians",
      },
      {
        title: "Clients",
        count: clients.length,
        icon: Users,
        unit: "",
        detailLink: "/dashboard/clients",
      },
      {
        title: "Appointments",
        count: appointments.length ?? 0,
        icon: AlarmClock,
        unit: "",
        detailLink: "/dashboard/appointments",
      },

      {
        title: "Services",
        count: services.length,
        icon: LayoutGrid,
        unit: "",
        detailLink: "/dashboard/services",
      },
    ];
    return analytics as BeauticianAnalyticsProps[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getBeauticianAnalytics() {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const appointments =
      (await getBeauticianAppointments(user?.id ?? "")).data || [];

    const uniqueClientsMap = new Map();

    appointments.forEach((app) => {
      if (!uniqueClientsMap.has(app.clientId)) {
        uniqueClientsMap.set(app.clientId, {
          clientId: app.clientId,
          name: `${app.firstName} ${app.lastName}`,
          email: app.email,
          phone: app.phone,
          location: app.location,
          gender: app.gender,
          occupation: app.occupation,
          dob: app.dob,
        });
      }
    });
    const clients = Array.from(uniqueClientsMap.values());
    const messages = (await getInboxMessages(user!.id)).data || [];
    const sales = (await getBeauticianSales(user!.id)) || [];
    const analytics = [
      {
        title: "Appointments",
        count: appointments.length ?? 0,
        icon: AlarmClock,
        unit: "",
        detailLink: "/dashboard/beautician/appointments",
      },
      {
        title: "Clients",
        count: clients.length,
        icon: Users,
        unit: "",
        detailLink: "/dashboard/beautician/clients",
      },
      {
        title: "Inbox",
        count: messages.length,
        icon: Mail,
        unit: "",
        detailLink: "/dashboard/beautician/inbox",
      },
      {
        title: "Sales",
        count: sales.length,
        icon: FaMoneyBill,
        unit: "",
        detailLink: "/dashboard/beautician/sales",
      },
    ];
    return analytics as BeauticianAnalyticsProps[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getUserAnalytics() {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const appointments =
      (await getClientAppointments(user?.id ?? "")).data || [];

    const uniqueClientsMap = new Map();

    appointments.forEach((app) => {
      if (!uniqueClientsMap.has(app.beauticianId)) {
        uniqueClientsMap.set(app.beauticianId, {
          beauticianId: app.beauticianId,
          name: `${app.firstName} ${app.lastName}`,
        });
      }
    });
    const beauticians = Array.from(uniqueClientsMap.values());
    const messages = (await getInboxMessages(user!.id)).data || [];
    const analytics = [
      {
        title: "Appointments",
        count: appointments.length ?? 0,
        icon: AlarmClock,
        unit: "",
        detailLink: "/dashboard/user/appointments",
      },
      {
        title: "Beauticians",
        count: beauticians.length,
        icon: Users,
        unit: "",
        detailLink: "/dashboard/user/beauticians",
      },
      {
        title: "Inbox",
        count: messages.length,
        icon: Mail,
        unit: "",
        detailLink: "/dashboard/user/inbox",
      },
    ];
    return analytics as BeauticianAnalyticsProps[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getStats() {
  try {
    const serviceCount = await prismaClient.service.count();
    const beauticianCount = await prismaClient.beauticianProfile.count();
    // const appointmentCount = await prismaClient.app.count();
    const stats = {
      beauticians: beauticianCount.toString().padStart(2, "0"),
      clients: "00",
      appointments: "00",
      services: serviceCount.toString().padStart(2, "0"),
    };
    return stats;
  } catch (error) {
    console.log(error);
    return {
      beauticians: null,
      clients: null,
      appointments: null,
      services: null,
    };
  }
}
