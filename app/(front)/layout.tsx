import { getServices } from "@/actions/services";
import Footer from "@/components/Frontend/Footer";
import MegaMenu from "@/components/Frontend/MegaMenu";
import Navbar from "@/components/Frontend/Navbar";
import { SiteHeader } from "@/components/site-header";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Analytics } from "@vercel/analytics/react";
import React, { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <div className="">
      <SiteHeader session={session} />
      <Analytics />
      <SpeedInsights />
      {children}
      <Footer />
    </div>
  );
}
