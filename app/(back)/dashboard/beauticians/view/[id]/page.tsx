import {
  getBeauticianAppointments,
  getClientAppointments,
} from "@/actions/appointments";
import { getBeauticianById, getBeauticianProfile } from "@/actions/users";
import { FaRegFilePdf } from "react-icons/fa";
import ApproveBtn from "@/components/Dashboard/ApproveBtn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import { getNormalDate } from "@/utils/getNormalDate";
import { timeAgo } from "@/utils/timeAgo";
import {
  AlertTriangle,
  Calendar,
  CalendarCheck,
  Check,
  CircleEllipsis,
  History,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SubHeading from "@/components/SubHeading";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const appointments = (await getBeauticianAppointments(id)).data || [];
  const beautician = await getBeauticianById(id);
  const beauticianProfile = await getBeauticianProfile(id);
  const status = beauticianProfile?.status ?? "PENDING";
  const dob = beauticianProfile?.dob ?? "1992-05-13T21:00:00.000Z";
  const expiry =
    beauticianProfile?.medicalLicenseExpiry ?? "1992-05-13T21:00:00.000Z";
  // console.log(dob);
  if (!beauticianProfile) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="space-y-3 text-center flex items-center justify-center flex-col">
          <AlertTriangle className="w-10 h-10 " />
          <h2>No Beautician Profile Found</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="">
          <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
            {beautician?.name}
          </h2>
          <h2 className="border-b pb-3 mb-3">
            {beautician?.email} | {beautician?.phone}
          </h2>
        </div>
        <div className="">
          <ApproveBtn status={status} profileId={beauticianProfile?.id ?? ""} />
          <h2 className="border-b pb-3 mb-3">
            Appointments ({appointments.length.toString().padStart(2, "0")})
          </h2>
        </div>
      </div>
      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Beautician Details</TabsTrigger>
          <TabsTrigger value="education">Education Info</TabsTrigger>
          <TabsTrigger value="practice">Practice Info</TabsTrigger>
          <TabsTrigger value="additional">Additional Info</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <div className="p-4">
            <SubHeading title="Bio Data" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">First Name :</span>
                <span>{beauticianProfile?.firstName}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Last Name :</span>
                <span>{beauticianProfile?.lastName}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Date of Birth :</span>
                <span>{getNormalDate(dob as string)}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Middle Name :</span>
                <span>{beauticianProfile?.middleName}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Gender :</span>
                <span>{beauticianProfile?.gender}</span>
              </div>
            </div>
          </div>
          <div className="p-4">
            <SubHeading title="Profile Information" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">Medical/Beauty License :</span>
                <span>{beauticianProfile?.medicalLicense}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Years of Experience :</span>
                <span>{beauticianProfile?.yearsOfExperience}</span>
              </div>
            </div>
            <div className="py-3 space-y-3">
              <div className="flex items-center">
                <span className="mr-3">Medical/Beauty License Expiry :</span>
                <span>{getNormalDate(expiry as string)}</span>
              </div>
              <p>{beauticianProfile?.bio}</p>
            </div>
          </div>
          <div className="p-4">
            <SubHeading title="Contact Information" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">Email Address :</span>
                <span>{beauticianProfile?.email}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Phone :</span>
                <span>{beauticianProfile?.phone}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Country :</span>
                <span>{beauticianProfile?.country}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">City:</span>
                <span>{beauticianProfile?.city}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">State :</span>
                <span>{beauticianProfile?.state}</span>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="education">
          <div className="p-4">
            <SubHeading title="Education Information" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">Graduation Year :</span>
                <span>{beauticianProfile?.graduationYear}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Primary Specialization :</span>
                <span>{beauticianProfile?.primarySpecialization}</span>
              </div>
            </div>
            <div className="py-4 space-y-4">
              <div className="flex items-center">
                <span className="mr-3">Medical/Beauty School :</span>
                <span>{beauticianProfile?.medicalSchool}</span>
              </div>
              {beauticianProfile?.otherSpecialties && (
                <div className="">
                  <h2>Other Specialties</h2>
                  <div className="flex gap-4 flex-wrap py-3">
                    {beauticianProfile.otherSpecialties.map((item, i) => {
                      return (
                        <p key={i} className="py-1.5 px-4 border rounded-md">
                          {item}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
              {beauticianProfile?.boardCertificates && (
                <div className="">
                  <h2>Academic Documents</h2>
                  <div className="flex gap-4 flex-wrap py-3">
                    {beauticianProfile.boardCertificates.map((item, i) => {
                      return (
                        <Link
                          key={i}
                          href={item}
                          target="_blank"
                          className="py-1.5 px-4 border rounded-md flex items-center"
                        >
                          <FaRegFilePdf className="w-4 h-4 mr-2" /> {item}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="practice">
          <div className="p-4">
            <SubHeading title="Practice Information" />
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="flex items-center">
                <span className="mr-3">Business Name :</span>
                <span>{beauticianProfile?.businessName}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Booking Fee :</span>
                <span>{beauticianProfile?.hourlyWage}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Business Address :</span>
                <span>{beauticianProfile?.businessAddress}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Business Contact :</span>
                <span>{beauticianProfile?.businessContactNumber}</span>
              </div>

              <div className="flex items-center">
                <span className="mr-3">Business Hours of operation :</span>
                <span>{beauticianProfile?.businessHoursOfOperation}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Do you accept Insurance :</span>
                <span>{beauticianProfile?.insuranceAccepted}</span>
              </div>
            </div>
            <div className="py-4 space-y-4">
              <div className="flex items-center">
                <span className="mr-3">Business Email address :</span>
                <span>{beauticianProfile?.businessEmailAddress}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Business Website address :</span>
                <span>{beauticianProfile?.businessWebsite}</span>
              </div>

              {beauticianProfile?.servicesOffered && (
                <div className="">
                  <h2>Business Services</h2>
                  <div className="flex gap-4 flex-wrap py-3">
                    {beauticianProfile.servicesOffered.map((item, i) => {
                      return (
                        <p key={i} className="py-1.5 px-4 border rounded-md">
                          {item}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="additional">
          <div className="p-4">
            <SubHeading title="Additional Information" />

            <div className="py-4 space-y-4">
              <div className="flex items-center">
                <span className="mr-3">Education History :</span>
                <span>{beauticianProfile?.educationHistory}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Published Works or Research :</span>
                <span>{beauticianProfile?.research}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Accomplishments or awards :</span>
                <span>{beauticianProfile?.accomplishments}</span>
              </div>
              {beauticianProfile?.additionalDocs && (
                <div className="">
                  <h2>Additional Documents</h2>
                  <div className="flex gap-4 flex-wrap py-3">
                    {beauticianProfile.additionalDocs.map((item, i) => {
                      return (
                        <Link
                          key={i}
                          href={item}
                          target="_blank"
                          className="py-1.5 px-4 border rounded-md flex items-center"
                        >
                          <FaRegFilePdf className="w-4 h-4 mr-2" /> {item}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="appointments">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            {appointments.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={`/dashboard/beautician/appointments/view/${item.id}`}
                  className={cn(
                    "border mb-2 border-gray-300 shadow-sm text-xs bg-white py-3 px-2 inline-block w-full rounded-md dark:text-slate-900"
                  )}
                >
                  <div className="flex justify-between items-center pb-2">
                    <h2>
                      {item.firstName} {item.lastName}
                    </h2>
                    <div className="flex items-center ">
                      <History className="w-4 h-4 mr-2" />
                      <span>{timeAgo(item.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 border-b">
                    <div className="flex items-center font-semibold">
                      <CalendarCheck className="w-4 h-4 mr-2" />
                      <span>{item.appointmentFormattedDate}</span>
                    </div>
                    <span className="font-semibold">
                      {item.appointmentTime}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "flex items-center pt-2 text-yellow-400",
                      item.status === "approved" &&
                        "text-green-600 font-semibold"
                    )}
                  >
                    {item.status === "pending" ? (
                      <CircleEllipsis className="mr-2 w-4 h-4" />
                    ) : item.status === "approved" ? (
                      <Check className="mr-2 w-4 h-4" />
                    ) : (
                      <X className="mr-2 w-4 h-4" />
                    )}
                    <span>{item.status}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
