"use client";
import {
  AlarmClock,
  AlarmClockPlus,
  Bell,
  Calendar,
  ExternalLink,
  Globe,
  Home,
  LineChart,
  Mail,
  Package,
  Package2,
  Pencil,
  Power,
  Scissors,
  Settings,
  ShoppingCart,
  SquareUser,
  Stethoscope,
  User2,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import LogoutButton from "./LogoutButton";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import generateSlug from "@/utils/generateSlug";
import { FaMoneyBill } from "react-icons/fa";

export default function Sidebar({ session }: { session: Session }) {
  const { user } = session;
  const role = user?.role;
  const id = user.id;
  const slug = generateSlug(user.name ?? "");
  const pathname = usePathname();
  const roles = {
    USER: [
      { title: "Dashboard", path: "/dashboard", icon: Home },
      {
        title: "My Appointments",
        path: "/dashboard/user/appointments",
        icon: AlarmClock,
      },
      {
        title: "Beauticians",
        path: "/dashboard/user/beauticians",
        icon: Users,
      },
      { title: "Inbox", path: "/dashboard/user/inbox", icon: Mail },
      {
        title: "Settings",
        path: "/dashboard/user/settings",
        icon: Settings,
      },
    ],
    ADMIN: [
      { title: "Dashboard", path: "/dashboard", icon: Home },
      { title: "Services", path: "/dashboard/services", icon: Users },
      { title: "Specialties", path: "/dashboard/specialties", icon: Users },
      { title: "Symptoms", path: "/dashboard/symptoms", icon: Stethoscope },
      { title: "Beauticians", path: "/dashboard/beauticians", icon: Scissors },
      { title: "Clients", path: "/dashboard/clients", icon: SquareUser },
      {
        title: "Appointments",
        path: "/dashboard/appointments",
        icon: AlarmClockPlus,
      },
      {
        title: "Sales",
        path: "/dashboard/sales",
        icon: FaMoneyBill,
      },
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: Settings,
      },
    ],
    BEAUTICIAN: [
      { title: "Dashboard", path: "/dashboard", icon: Home },
      {
        title: "Appointments",
        path: "/dashboard/beautician/appointments",
        icon: AlarmClock,
      },
      {
        title: "Sales",
        path: "/dashboard/beautician/sales",
        icon: FaMoneyBill,
      },
      {
        title: "Clients",
        path: "/dashboard/beautician/clients",
        icon: Users,
      },
      { title: "Inbox", path: "/dashboard/beautician/inbox", icon: Mail },
      {
        title: "Compose Mail",
        path: "/dashboard/beautician/compose",
        icon: Pencil,
      },

      {
        title: "Profile",
        path: `/dashboard/beautician/profile/${id}`,
        icon: User2,
      },
      {
        title: "Live Preview",
        path: `/beauticians/${slug}?id=${id}`,
        icon: ExternalLink,
      },
      {
        title: "Settings",
        path: "/dashboard/beautician/settings",
        icon: Settings,
      },
    ],
  };

  let sideBarLinks = roles[role] || [];
  // const sideBarLinks = [
  //   {
  //     name: "Dashboard",
  //     path: "/dashboard",
  //     icon: Home,
  //   },

  //   {
  //     name: "Products",
  //     path: "/dashboard/products",
  //     icon: Package,
  //   },
  //   {
  //     name: "Orders",
  //     path: "/dashboard/orders",
  //     icon: ShoppingCart,
  //     badgeCount: 6,
  //   },
  //   {
  //     name: "Customers",
  //     path: "/dashboard/customers",
  //     icon: Users,
  //   },
  //   {
  //     name: "Analytics",
  //     path: "/dashboard/analytics",
  //     icon: LineChart,
  //   },
  //   {
  //     name: "Settings",
  //     path: "/dashboard/settings",
  //     icon: Settings,
  //   },
  //   {
  //     name: "Online",
  //     path: "/",
  //     icon: Globe,
  //   },
  // ];
  const router = useRouter();
  async function handleLogout() {
    await signOut();
    router.push("/login");
  }
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">ZARLO</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {sideBarLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={i}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.path ? " bg-muted text-primary  " : ""
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                  {/* {item.badgeCount && (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {item.badgeCount}
                    </Badge>
                  )} */}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button size="sm" className="w-full">
            <Power className="w- h-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
