import { getBeauticians } from "@/actions/users";
import BeauticianCard from "@/components/BeauticianCard";
import BeauticiansList from "@/components/BeauticiansList";
import React from "react";

export default async function NewAppointment() {
  const beauticians = (await getBeauticians()) || [];
  // console.log(beauticians);
  const telhealthBeauticians = beauticians.filter(
    (beautician) =>
      beautician.beauticianProfile?.operationMode === "Virtual Consultations"
  );
  const inpersonBeauticians = beauticians.filter(
    (beautician) =>
      beautician.beauticianProfile?.operationMode === "Beauty Services"
  );
  console.log(telhealthBeauticians);
  return (
    <section className="">
      {/* <h2 className="px-4 border-b font-semibold text-xl lg:text-3xl py-3 mb-3">
        Select the Beautician to Continue
      </h2> */}
      {telhealthBeauticians && telhealthBeauticians.length > 0 && (
        <div className="py-4 ">
          <h2 className="px-4 border-b font-semibold text-xl lg:text-3xl py-3 mb-3">
            Telehealth Beauticians
          </h2>
          <div className="grid place-items-center">
            {telhealthBeauticians.map((beautician) => {
              return (
                <BeauticianCard
                  key={beautician.id}
                  isInPerson={true}
                  beautician={beautician}
                />
              );
            })}
          </div>
        </div>
      )}

      {inpersonBeauticians && inpersonBeauticians.length > 0 && (
        <div className="py-4 ">
          <h2 className="px-4 border-b font-semibold text-xl lg:text-3xl py-3 mb-3">
            Inperson Beauticians
          </h2>
          <div className="grid place-items-center">
            {inpersonBeauticians.map((beautician) => {
              return (
                <BeauticianCard
                  key={beautician.id}
                  isInPerson={true}
                  beautician={beautician}
                />
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
