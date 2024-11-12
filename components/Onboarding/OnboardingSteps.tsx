"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import BioDataForm from "./BioDataForm";
import ContactInfo from "./ContactInfo";
import ProfessionInfo from "./EducationInfo";
import ProfileInfoForm from "./ProfileInfoForm";
import EducationInfo from "./EducationInfo";
import PracticeInfo from "./PracticeInfo";
import AdditionalInfo from "./AdditionalInfo";
import Availability from "./Availability";
import { useOnboardingContext } from "@/context/context";
import { BeauticianProfile, Speciality } from "@prisma/client";

export default function OnboardingSteps({
  id,
  specialties,
  beauticianProfile,
}: {
  id: string;
  specialties: Speciality[];
  beauticianProfile: BeauticianProfile;
}) {
  // V0JSIYIAM8
  const params = useSearchParams();
  const pathname = usePathname();
  const page = params.get("page") ?? "bio-data";
  const { trackingNumber, beauticianProfileId, savedDBData } =
    useOnboardingContext();
  console.log(page);
  const steps = [
    {
      title: "Bio Data",
      page: "bio-data",
      component: (
        <BioDataForm
          userId={id}
          title="Bio Data"
          description="Please fill in your Bio Data Info"
          page={page}
          nextPage="profile"
          formId={beauticianProfile.id ? beauticianProfile.id : savedDBData.id}
          beauticianProfile={beauticianProfile}
        />
      ),
    },
    {
      title: "Profile Information",
      page: "profile",
      component: (
        <ProfileInfoForm
          title="Profile Information"
          description="Please fill in your profile Info"
          page={page}
          nextPage="contact"
          formId={beauticianProfile.id ? beauticianProfileId : savedDBData.id}
          userId={id}
          beauticianProfile={beauticianProfile}
        />
      ),
    },
    {
      title: "Contact Information",
      page: "contact",
      component: (
        <ContactInfo
          page={page}
          title="Contact Information"
          description="Please fill in your contact Info"
          nextPage="education"
          userId={id}
          formId={beauticianProfile.id ? beauticianProfileId : savedDBData.id}
          beauticianProfile={beauticianProfile}
        />
      ),
    },

    {
      title: "Education Information",
      page: "education",
      component: (
        <EducationInfo
          specialties={specialties}
          page={page}
          title="Education Information"
          description="Please fill in your education Info"
          nextPage="practice"
          formId={beauticianProfile.id ? beauticianProfileId : savedDBData.id}
          userId={id}
          beauticianProfile={beauticianProfile}
        />
      ),
    },
    {
      title: "Practice Information",
      page: "practice",
      component: (
        <PracticeInfo
          page={page}
          title="Practice Information"
          description="Please fill in your practice Info"
          nextPage="additional"
          formId={beauticianProfile.id ? beauticianProfileId : savedDBData.id}
          userId={id}
          beauticianProfile={beauticianProfile}
        />
      ),
    },
    {
      title: "Additional Information",
      page: "additional",
      component: (
        <AdditionalInfo
          page={page}
          title="Additional Information"
          description="Please fill in your additional Info"
          nextPage="final"
          userId={id}
          formId={beauticianProfileId ? beauticianProfileId : savedDBData.id}
          beauticianProfile={beauticianProfile}
        />
      ),
    },
    // {
    //   title: "Availability",
    //   page: "availability",
    //   component: (
    //     <Availability
    //       page={page}
    //       title="Availability Information"
    //       description="Please fill in your availability Info"
    //       formId={beauticianProfileId}
    //       userId={id}
    //     />
    //   ),
    // },
  ];
  const currentStep = steps.find((step) => step.page === page);
  console.log(currentStep);
  return (
    <div className="grid grid-cols-12 mx-auto rounded-lg shadow-inner   border border-slate-200 dark:border-slate-600 min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="col-span-full sm:col-span-3 divide-y-2 divide-gray-200 bg-slate-300 h-full dark:bg-slate-900">
        {steps.map((step, i) => {
          return (
            <Link
              key={i}
              href={`${pathname}?page=${step.page}`}
              className={cn(
                "py-3 block px-4 bg-slate-300 text-slate-800 shadow-inner uppercase text-sm",
                step.page === page ? " bg-yellow-800  text-slate-100 " : ""
              )}
            >
              {step.title}
            </Link>
          );
        })}
      </div>
      <div className="col-span-full sm:col-span-9  p-4">
        {/* {trackingNumber && (
          <p className="border-b border-gray-200 dark:border-slate-600 text-yellow-600 dark:text-yellow-400 pb-2">
            Your Tracking Number is{" "}
            <span className="font-bold">{trackingNumber}</span>{" "}
            <span className="text-xs">
              (Use this to check the status or resume application)
            </span>
          </p>
        )} */}
        {savedDBData.id && (
          <p className="border-b border-gray-200 dark:border-slate-600 text-yellow-600 dark:text-yellow-400 pb-2">
            Your Tracking Number is{" "}
            <span className="font-bold">{savedDBData.trackingNumber}</span>{" "}
            <span className="text-xs">
              (Use this to check the status or resume application)
            </span>
          </p>
        )}
        {currentStep?.component}
      </div>
    </div>
  );
}
