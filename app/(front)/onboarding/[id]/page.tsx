import { getBeauticianProfileById } from "@/actions/onboarding";
import { getSpecialties } from "@/actions/specialities";
import OnboardingSteps from "@/components/Onboarding/OnboardingSteps";
import React from "react";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  //Get existing beautician profile
  const specialties = (await getSpecialties()).data || [];
  const beauticianProfile = (await getBeauticianProfileById(id))?.data;
  // console.log(beauticianProfile);
  return (
    <div className="bg-yellow-700 dark:bg-slate-800">
      {beauticianProfile && beauticianProfile.id && (
        <div className="max-w-5xl mx-auto py-8 min-h-screen">
          <OnboardingSteps
            beauticianProfile={beauticianProfile}
            id={id}
            specialties={specialties}
          />
        </div>
      )}
    </div>
  );
}
