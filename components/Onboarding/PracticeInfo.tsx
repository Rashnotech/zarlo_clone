"use client";
import { BioDataFormProps, PracticeFormProps } from "@/types/types";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { DatePickerInput } from "../FormInputs/DatePickerInput";

import RadioInput from "../FormInputs/RadioInput";
import ArrayItemsInput from "../FormInputs/ArrayInput";
import ShadSelectInput from "../FormInputs/ShadSelectInput";
import { StepFormProps } from "./BioDataForm";
import { updateBeauticianProfile } from "@/actions/onboarding";
import { useOnboardingContext } from "@/context/context";

export default function PracticeInfo({
  page,
  title,
  description,
  formId,
  userId,
  nextPage,
  beauticianProfile,
}: StepFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { practiceData, savedDBData, setPracticeData } = useOnboardingContext();
  const pathname = usePathname();
  const insuranceOptions = [
    {
      label: "Yes",
      value: "yes",
    },
    {
      label: "No",
      value: "no",
    },
  ];
  const initialServices =
    beauticianProfile.servicesOffered.length > 0
      ? beauticianProfile.servicesOffered
      : savedDBData.servicesOffered;
  const initialInsuranceStatus =
    beauticianProfile.insuranceAccepted || savedDBData.insuranceAccepted;
  const [services, setServices] = useState(initialServices);
  // console.log(services, initialServices);
  const [insuranceAccepted, setInsuranceAccepted] = useState(
    initialInsuranceStatus
  );
  // console.log(date);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PracticeFormProps>({
    defaultValues: {
      businessName: beauticianProfile.businessName || savedDBData.businessName,
      businessAddress:
        beauticianProfile.businessAddress || savedDBData.businessAddress,
      businessContactNumber:
        beauticianProfile.businessContactNumber ||
        savedDBData.businessContactNumber,
      businessEmailAddress:
        beauticianProfile.businessEmailAddress ||
        savedDBData.businessEmailAddress,
      businessWebsite:
        beauticianProfile.businessWebsite || savedDBData.businessWebsite,
      businessHoursOfOperation:
        beauticianProfile.businessHoursOfOperation ||
        savedDBData.businessHoursOfOperation,
      insuranceAccepted:
        beauticianProfile.insuranceAccepted || savedDBData.insuranceAccepted,
      page: beauticianProfile.page || savedDBData.page,
      hourlyWage: beauticianProfile.hourlyWage || savedDBData.hourlyWage,
    },
  });
  const router = useRouter();
  async function onSubmit(data: PracticeFormProps) {
    data.page = page;
    data.insuranceAccepted = insuranceAccepted;
    data.businessHoursOfOperation = Number(data.businessHoursOfOperation);
    data.servicesOffered = services;
    data.hourlyWage = Number(data.hourlyWage);
    console.log(userId, formId);
    console.log(data);
    setIsLoading(true);
    try {
      const res = await updateBeauticianProfile(beauticianProfile.id, data);
      setPracticeData(data);
      if (res?.status === 201) {
        setIsLoading(false);
        //extract the profile form data from the updated profile
        toast.success("Practice Info Updated Successfully");
        router.push(`${pathname}?page=${nextPage}`);
        console.log(res.data);
      } else {
        setIsLoading(false);
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
    }
  }
  // businessName: string;
  // businessAddress: string;
  // businessContactNumber: string;
  // businessEmailAddress: string;
  // businessWebsite?: string;
  // businessHoursOfOperation: number;
  // servicesOffered: string[];
  // insuranceAccepted: string;
  // languagesSpoken: string[];
  return (
    <div className="w-full">
      <div className="text-center border-b border-gray-200 pb-4 dark:border-slate-600">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          {title}
        </h1>
        <p className="text-balance text-muted-foreground">{description}</p>
      </div>
      <form className=" py-4 px-4  mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          <TextInput
            label="Business Name"
            register={register}
            name="businessName"
            errors={errors}
            placeholder="Enter business Name "
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            label="Booking Fee"
            register={register}
            name="hourlyWage"
            type="number"
            errors={errors}
            placeholder="Enter Charge per Hour "
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            label="Business Address"
            register={register}
            name="businessAddress"
            errors={errors}
            placeholder="000 X Road, Arcadia, Pretoria, 0000 "
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            label="Business Contact Number"
            register={register}
            name="businessContactNumber"
            errors={errors}
            placeholder="Enter business Contact Number"
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            label="Business Email Adress"
            register={register}
            name="businessEmailAddress"
            errors={errors}
            placeholder="Enter business Email Address"
            className="col-span-full sm:col-span-1"
          />
          <TextInput
            label="Business Website (Optional)"
            register={register}
            name="businessWebsite"
            errors={errors}
            placeholder="Enter business Email Address"
            className="col-span-full sm:col-span-1"
            isRequired={false}
          />
          <TextInput
            label="Business Hours of Operation"
            register={register}
            name="businessHoursOfOperation"
            errors={errors}
            type="number"
            placeholder="Enter business of Operation eg 5"
            className="col-span-full sm:col-span-1"
          />

          <ShadSelectInput
            label="Do you accept Insurance"
            optionTitle="Insurance Acceptable"
            options={insuranceOptions}
            selectedOption={insuranceAccepted}
            setSelectedOption={setInsuranceAccepted}
          />
          <ArrayItemsInput
            setItems={setServices}
            items={services}
            itemTitle="Business Services"
          />
          {/* <ArrayItemsInput
            setItems={setLanguages}
            items={languages}
            itemTitle="Add Languages Spoken at the Business"
          /> */}
        </div>
        <div className="mt-8 flex justify-center items-center">
          <SubmitButton
            title="Save and Continue"
            isLoading={isLoading}
            loadingTitle="Saving please wait..."
          />
        </div>
      </form>
    </div>
  );
}
