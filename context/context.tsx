"use client";
import {
  BioDataFormProps,
  ContactFormProps,
  EducationFormProps,
  PracticeFormProps,
  ProfileFormProps,
  additionalFormProps,
} from "@/types/types";
import { BeauticianProfile } from "@prisma/client";
//context => useState ta global level

import { ReactNode, createContext, useContext, useState } from "react";

//Steps for Creating Context API
//CREATING AD EXPORT THE CONTEXT
//1) Define the shape of the data you want to track
//2)Define the initial data
//3) create and export the context
//4)add the types to the Context and initialData

// Use the Created Context to CREATE AND EXPORT CONTEXT PROVIDER

//CREATE AND EXPORT USECONTEXT HOOK

//WRAP THE ENTIRE APP WITH THE PROVIDER

interface IOnBoardingContextData {
  trackingNumber: string;
  setTrackingNumber: (value: string) => void;
  setBeauticianProfileId: (value: string) => void;
  beauticianProfileId: string;

  //TRACK THE FORM DATA
  bioData: BioDataFormProps;
  profileData: ProfileFormProps;
  contactData: ContactFormProps;
  educationData: EducationFormProps;
  practiceData: PracticeFormProps;
  additionalData: additionalFormProps;
  savedDBData: any;
  setSavedDBData: (data: any) => void;
  setBioData: (data: BioDataFormProps) => void;
  setProfileData: (data: ProfileFormProps) => void;
  setContactData: (data: ContactFormProps) => void;
  setEducationData: (data: EducationFormProps) => void;
  setPracticeData: (data: PracticeFormProps) => void;
  setAdditionalData: (data: additionalFormProps) => void;
}

const initialBioData = {
  firstName: "",
  lastName: "",
  middleName: "",
  dob: "",
  gender: "",
  page: "",
  userId: "",
  trackingNumber: "",
};
const initialProfileData = {
  profilePicture: "",
  bio: "",
  page: "",
  medicalLicense: "",
  medicalLicenseExpiry: "",
  yearsOfExperience: 0,
};
const initialContactData: ContactFormProps = {
  email: "",
  phone: "",
  country: "",
  city: "",
  state: "",
  page: "",
};
const initialEducationData: EducationFormProps = {
  medicalSchool: "",
  graduationYear: 0,
  primarySpecialization: "",
  otherSpecialties: [],
  boardCertificates: [],
  page: "",
};
const initialPracticeData: PracticeFormProps = {
  businessName: "",
  businessAddress: "",
  businessContactNumber: "",
  businessEmailAddress: "",
  businessWebsite: "",
  businessHoursOfOperation: 0,
  servicesOffered: [],
  insuranceAccepted: "",
  page: "",
  hourlyWage: 100,
};
const initialAdditionalData: additionalFormProps = {
  educationHistory: "",
  research: "",
  accomplishments: "",
  additionalDocs: [],
  page: "",
};
const initialContextData = {
  setTrackingNumber: () => {},
  setBeauticianProfileId: () => {},
  setBioData: () => {},
  setProfileData: () => {},
  setContactData: () => {},
  setEducationData: () => {},
  setPracticeData: () => {},
  setAdditionalData: () => {},
  savedDBData: {},
  setSavedDBData: () => {},
  trackingNumber: "",
  beauticianProfileId: "",
  bioData: initialBioData,
  profileData: initialProfileData,
  contactData: initialContactData,
  educationData: initialEducationData,
  practiceData: initialPracticeData,
  additionalData: initialAdditionalData,
};

const OnBoardingContext =
  createContext<IOnBoardingContextData>(initialContextData);

export function OnboardingContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [beauticianProfileId, setBeauticianProfileId] = useState<string>("");
  const [bioData, setBioData] = useState<BioDataFormProps>(initialBioData);
  const [profileData, setProfileData] =
    useState<ProfileFormProps>(initialProfileData);
  const [contactData, setContactData] =
    useState<ContactFormProps>(initialContactData);
  const [educationData, setEducationData] =
    useState<EducationFormProps>(initialEducationData);
  const [practiceData, setPracticeData] =
    useState<PracticeFormProps>(initialPracticeData);
  const [additionalData, setAdditionalData] = useState<additionalFormProps>(
    initialAdditionalData
  );
  const [savedDBData, setSavedDBData] = useState<any>({});
  console.log(savedDBData);
  const contextValues = {
    trackingNumber,
    setTrackingNumber,
    beauticianProfileId,
    setBeauticianProfileId,
    bioData,
    setBioData,
    setProfileData,
    profileData,
    contactData,
    educationData,
    practiceData,
    additionalData,
    setContactData,
    setEducationData,
    setPracticeData,
    setAdditionalData,
    savedDBData,
    setSavedDBData,
  };

  return (
    <OnBoardingContext.Provider value={contextValues}>
      {children}
    </OnBoardingContext.Provider>
  );
}

export function useOnboardingContext() {
  return useContext(OnBoardingContext);
}
export default OnBoardingContext;
