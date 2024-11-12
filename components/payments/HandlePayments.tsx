"use client";

import { useEffect, useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { Button } from "../ui/button";

interface ConfigProps {
  reference: string;
  email: string;
  amount: number;
  currency: string;
  publicKey: string;
}

const HandlePayments = ({
  transactionConfig,
}: {
  transactionConfig: ConfigProps;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure this only runs on the client
  }, []);

  const onSuccess = (reference: any) => {
    console.log("Payment successful:", reference);
  };

  const onClose = () => {
    console.log("Payment closed");
  };

  const initializePayment = usePaystackPayment(transactionConfig);

  return (
    <div className="max-w-3xl mx-auto p-8">
      {isClient && (
        <Button onClick={() => initializePayment({ onSuccess, onClose })}>
          Pay with Paystack (ZAR)
        </Button>
      )}
    </div>
  );
};

export default HandlePayments;
