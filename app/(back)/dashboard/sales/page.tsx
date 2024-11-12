import { getBeauticianSales, getSales } from "@/actions/sales";
import Sales from "@/components/Dashboard/Beautician/Sales";
import React from "react";

export default async function page() {
  const beauticianSales = await getSales();

  return (
    <div className="p-8 max-w-4xl w-full mx-auto">
      {beauticianSales && beauticianSales.length > 0 ? (
        <Sales
          role="ADMIN"
          data={beauticianSales}
          title="Beauticians Appointment Sales"
        />
      ) : (
        <div>
          <p>No Sales Data Found</p>
        </div>
      )}
    </div>
  );
}
