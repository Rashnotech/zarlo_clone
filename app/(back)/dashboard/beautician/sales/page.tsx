import { getBeauticianSales } from "@/actions/sales";
import Sales from "@/components/Dashboard/Beautician/Sales";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  const id = session?.user.id;
  const beauticianSales = await getBeauticianSales(id);
  return (
    <div className="p-8 max-w-4xl w-full mx-auto">
      {beauticianSales && beauticianSales.length > 0 ? (
        <Sales
          role="BEAUTICIAN"
          data={beauticianSales}
          title="Appointment Sales"
        />
      ) : (
        <div className="">
          <p>No Sales Data Found</p>
        </div>
      )}
    </div>
  );
}
