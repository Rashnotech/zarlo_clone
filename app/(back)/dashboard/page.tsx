import Dashboard from "@/components/Dashboard/Dashboard";
import BeauticianDashboard from "@/components/Dashboard/BeauticianDashboard";
import ClientDashboard from "@/components/Dashboard/ClientDashboard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const role = user?.role;
  if (role === "BEAUTICIAN") {
    return (
      <>
        <BeauticianDashboard session={session} />
      </>
    );
  }
  if (role === "USER") {
    return (
      <>
        <ClientDashboard session={session} />
      </>
    );
  }
  return (
    <div>
      <Dashboard />
    </div>
  );
}
