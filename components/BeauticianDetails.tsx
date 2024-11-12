"use client";
import { AppointmentProps, BeauticianDetail } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "@/components/ui/calendar";
import { getDayFromDate } from "@/utils/getDayFromDate";
import { getLongDate } from "@/utils/getLongDate";
import {
  CalendarDays,
  Check,
  DollarSign,
  Loader2,
  MoveRight,
  Wallet,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import TextInput from "./FormInputs/TextInput";
import { DatePickerInput } from "./FormInputs/DatePickerInput";
import RadioInput from "./FormInputs/RadioInput";
import { TextAreaInput } from "./FormInputs/TextAreaInput";
import MultipleFileUpload, { FileProps } from "./FormInputs/MultipleFileUpload";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { createAppointment } from "@/actions/appointments";
import { Appointment, BeauticianProfile, PaymentStatus } from "@prisma/client";
import FrontBeauticianDetails from "./FrontBeauticianDetails";
import { createRoom } from "@/actions/hms";
import { usePaystackPayment } from "react-paystack";
import { createSale } from "@/actions/sales";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
export default function BeauticianDetails({
  beautician,
  appointment,
  beauticianProfile,
}: {
  beautician: BeauticianDetail;
  appointment: Appointment | null;
  beauticianProfile: BeauticianProfile | null | undefined;
}) {
  const [isActive, setIsActive] = useState("availability");
  const { data: session } = useSession();
  const client = session?.user;
  const [step, setStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const day = getDayFromDate(date?.toDateString());
  const longDate = getLongDate(date!.toDateString());
  const [dob, setDob] = useState<Date | undefined>(undefined);
  // console.log(longDate);
  const times = beautician.beauticianProfile?.availability?.[day] ?? null;
  const [medicalDocs, setMedicalDocs] = useState<FileProps[]>([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const genderOptions = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
  ];
  // const [imageUrl, setImageUrl] = useState(initialImageUrl);

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const [isClient, setIsClient] = useState(false);
  const initialPaymentDetails: {
    transactionId: string;
    paymentStatus: PaymentStatus;
    paymentMethod: string;
    paidAmount: number;
    reference: string;
  } = {
    transactionId: "",
    reference: "",
    paymentStatus: "SUCCESS",
    paymentMethod: "card",
    paidAmount: 0,
  };
  const [paymentDetails, setPaymentDetails] = useState(initialPaymentDetails);

  const config = {
    reference: new Date().getTime().toString(),
    email: "user@example.com",
    amount: beautician.beauticianProfile?.hourlyWage ?? 0, // Amount is in cents, so 20000 = 200 ZAR
    currency: "ZAR", // Set currency to South African Rand
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
  };

  useEffect(() => {
    setIsClient(true); // Ensure this only runs on the client
  }, []);

  const onSuccess = (ref: any) => {
    setPaymentDetails({
      transactionId: ref.transaction,
      reference: ref.reference,
      paymentStatus: "SUCCESS",
      paymentMethod: "card",
      paidAmount: beautician.beauticianProfile?.hourlyWage ?? 0,
    });

    setPaymentSuccess(true);

    console.log("Payment Reference:", ref);
  };

  console.log("Payment Details:", paymentDetails);

  const onClose = () => {
    console.log("Payment closed");
  };

  const initializePayment = usePaystackPayment(config);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentProps>({
    defaultValues: {
      email: appointment?.email || (client?.email as string),
      firstName: appointment?.firstName || client?.name?.split(" ")[0],
      phone: appointment?.phone ?? "",
      lastName: appointment?.lastName || client?.name?.split(" ")[1],
      occupation: appointment?.occupation ?? "",
      location: appointment?.location ?? "",
      gender: appointment?.gender ?? "",
    },
  });
  async function onSubmit(data: AppointmentProps) {
    data.medicalDocuments = medicalDocs.map((item) => item.url) || [
      "https://utfs.io/f/288d3bae-2b2b-4593-b90f-9f4f1bc4148c-w1ax8d.pdf",
    ];
    data.appointmentDate = date;
    data.appointmentFormattedDate = longDate;
    data.appointmentTime = selectedTime;
    (data.beauticianId = beautician.id),
      (data.charge = beautician.beauticianProfile?.hourlyWage ?? 0);
    data.dob = dob;
    data.clientId = client?.id ?? "";
    data.beauticianName = beautician.name;

    // Update the payment information
    data.transactionId = paymentDetails.transactionId;
    data.paymentStatus = paymentDetails.paymentStatus;
    data.paymentMethod = paymentDetails.paymentMethod;
    data.paidAmount = paymentDetails.paidAmount;
    data.reference = paymentDetails.reference;
    console.log(data);
    try {
      setLoading(true);
      // Generate room ands the room id
      const beauticianFirstName = beautician.name.split(" ")[0];
      const clientFirstName = client?.name?.split(" ")[0];
      const roomName = `Bt. ${beauticianFirstName} - ${clientFirstName} Meeting Appointment`;
      const roomData = await createRoom(roomName);
      if (roomData.error) {
        toast.error(roomData.error);
        return;
      }
      const meetingLink = `/meeting/${roomData.roomId}`;
      data.meetingLink = meetingLink;
      const res = await createAppointment(data);
      // Create a sale
      const salesData = {
        appointmentId: res.data?.id ?? "",
        beauticianId: beautician.id,
        beauticianName: beautician.name,
        clientId: client?.id ?? "",
        clientName: client?.name ?? "",
        totalAmount: res.data?.charge ?? 0,
      };
      const sale = await createSale(salesData);

      const appo = res.data;
      setLoading(false);
      toast.success("Appointment Created Successfully");
      router.push("/dashboard/user/appointments");
      console.log(appo, sale);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    // router.push("/dashboard/services");
  }
  function initiateAppointment() {
    if (client?.id) {
      if (!selectedTime) {
        toast.error("Please select time");
        return;
      }
      setStep((curr) => curr + 1);
    } else {
      router.push("/login");
    }
  }
  return (
    <>
      <div className="container mx-auto px-4 py-6">
        {step === 1 ? (
          <Card className="w-full">
            <CardContent>
              <Tabs
                value={isActive}
                onValueChange={setIsActive}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger
                    value="details"
                    className="text-sm font-medium tracking-wider"
                  >
                    Beautician Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="availability"
                    className="text-sm font-medium tracking-wider"
                  >
                    Availability
                  </TabsTrigger>
                </TabsList>

                <div className="pt-4">
                  {isActive === "availability" ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-lg border shadow-md"
                        />
                      </div>

                      <div className="space-y-6">
                        <div>
                          <span className="text-primary text-sm font-medium">
                            You have selected
                          </span>
                          <h2 className="text-2xl font-semibold tracking-tight mt-1">
                            {longDate}
                          </h2>
                        </div>

                        {times && times.length > 0 && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {times.map((item, i) => (
                                <Button
                                  key={i}
                                  onClick={() => setSelectedTime(item)}
                                  variant={
                                    selectedTime === item
                                      ? "default"
                                      : "outline"
                                  }
                                  className="w-full"
                                >
                                  {item}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}

                        <Button
                          onClick={initiateAppointment}
                          size="lg"
                          className="w-full sm:w-auto gap-2"
                        >
                          Book Beautician (R
                          {beautician.beauticianProfile?.hourlyWage})
                          <MoveRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <FrontBeauticianDetails
                        beauticianProfile={beauticianProfile}
                      />
                    </div>
                  )}
                </div>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {step <= 3 && (
                  <h2 className="scroll-m-20 border-b pb-3 mb-6 text-3xl font-semibold tracking-tight first:mt-0">
                    Tell us a few details about you
                  </h2>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <TextInput
                        label="First Name"
                        register={register}
                        name="firstName"
                        errors={errors}
                        className="col-span-1"
                        placeholder="Enter First Name"
                      />
                      <TextInput
                        label="Last Name"
                        register={register}
                        name="lastName"
                        className="col-span-1"
                        errors={errors}
                        placeholder="Enter Last Name"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <TextInput
                        label="Phone Number"
                        register={register}
                        name="phone"
                        errors={errors}
                        className="col-span-1"
                        placeholder="Enter Phone Number"
                      />
                      <TextInput
                        label="Email Address"
                        register={register}
                        name="email"
                        className="col-span-1"
                        errors={errors}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <RadioInput
                        title="Gender"
                        register={register}
                        name="gender"
                        errors={errors}
                        className="col-span-1"
                        radioOptions={genderOptions}
                      />
                      <DatePickerInput
                        date={dob}
                        setDate={setDob}
                        title="Date of Birth"
                        className="col-span-1"
                      />
                    </div>
                    <div className="mt-8 flex justify-between gap-4 items-center">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => setStep((currStep) => currStep - 1)}
                      >
                        Previous
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setStep((currStep) => currStep + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <TextInput
                        label="Your Location"
                        register={register}
                        name="location"
                        errors={errors}
                        className="col-span-1"
                        placeholder="Enter your Location"
                      />
                      <TextInput
                        label="Occupation"
                        register={register}
                        name="occupation"
                        className="col-span-1"
                        errors={errors}
                        placeholder="Enter your Occupation"
                      />
                    </div>
                    <TextAreaInput
                      label="Reason for Seeing the Beautician"
                      register={register}
                      name="appointmentReason"
                      errors={errors}
                      placeholder="Enter appointment Reason"
                    />
                    <MultipleFileUpload
                      label="Medical Documents"
                      files={medicalDocs}
                      setFiles={setMedicalDocs}
                      endpoint="clientMedicalFiles"
                    />
                    <div className="mt-8 flex justify-between gap-4 items-center">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => setStep((currStep) => currStep - 1)}
                      >
                        Previous
                      </Button>
                      {loading ? (
                        <Button disabled>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving please wait ...
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          onClick={() => setStep((currStep) => currStep + 1)}
                        >
                          Complete Appointment
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    {paymentSuccess ? (
                      <div className="border shadow w-full max-w-md mx-auto flex items-center justify-center flex-col space-y-4 p-8">
                        <div className="w-24 h-24 flex rounded-full items-center justify-center bg-lime-200">
                          <Check className="text-lime-600 w-14 h-14" />
                        </div>
                        <h2 className="text-xl font-bold text-center text-lime-700">
                          Payment Successful
                        </h2>
                        <div className="flex items-center justify-center">
                          {loading ? (
                            <Button disabled>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving please wait ...
                            </Button>
                          ) : (
                            <Button type="submit">
                              <CalendarDays className="mr-2 w-5 h-5" /> Complete
                              Appointment
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <Card className="w-full max-w-md mx-auto">
                        <CardHeader>
                          <CardTitle className="text-2xl font-bold text-center">
                            Make Payment
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">
                              Total Amount
                            </p>
                            <p className="text-4xl font-bold">
                              ZAR{" "}
                              {beautician.beauticianProfile?.hourlyWage.toLocaleString()}{" "}
                            </p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <button
                            type="button"
                            onClick={() =>
                              initializePayment({ onSuccess, onClose })
                            }
                            className="w-full bg-[#00C3F7] hover:bg-[#00A1D1] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                          >
                            <Wallet className="w-6 h-6" />
                            <span>Pay with Paystack</span>
                          </button>
                        </CardFooter>
                      </Card>
                    )}
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
