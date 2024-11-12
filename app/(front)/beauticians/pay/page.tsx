import HandlePayments from "@/components/payments/HandlePayments";
import React from "react";

export default function page() {
  const config = {
    reference: new Date().getTime().toString(),
    email: "user@example.com",
    amount: 20000, // Amount is in cents, so 20000 = 200 ZAR
    currency: "ZAR", // Set currency to South African Rand
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
  };
  return (
    <div>
      <HandlePayments transactionConfig={config} />
    </div>
  );
}
