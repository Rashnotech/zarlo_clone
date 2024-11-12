import MeetingPage from "@/components/hms/MeetingPage";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

/*
1. Booked for R50 (Step 1)


2. Collect the appointments information (Step 2 and Step 3)

3. Save the appointments information in the local database

4. Pays and confirmed for the appointment

5. Save the payment information and secures the appointment




*/

export default async function page({
  params: { roomId },
}: {
  params: { roomId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <div>
      <MeetingPage roomId={roomId} session={session} />
    </div>
  );
}
