import React from "react";

export type SingleImageProps = {
  href: string;
  imgSrc: string;
  Alt: string;
};

const Brands = () => {
  return (
    <>
      <section className="bg-slate-100 text-zinc-950 py-10 lg:py-[60px]">
        <h2 className="text-center pb-2 scroll-m-20 text-4xl font-bold tracking-tight">
          Our Partners & Stakeholders
        </h2>
        <p className="leading-7 text-center py-2 mb-6 text-base text-body-color dark:text-dark-6">
          Collaborate with us to leverage our ecosystem for enhanced value and
          growth.
        </p>
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="flex flex-wrap items-center justify-center">
                <SingleImage
                  href="https://alx-ventures.com/"
                  Alt="ALX Ventures Logo"
                  imgSrc="https://www.alxafrica.com/wp-content/uploads/2024/01/logo-alx-sand.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Brands;

const SingleImage = ({ href, imgSrc, Alt }: SingleImageProps) => {
  return (
    <>
      <a
        href={href}
        className="mx-4 flex w-[200px] items-center justify-center 2xl:w-[240px]" // Increased width
      >
        <img src={imgSrc} alt={Alt} className="w-full h-20" />{" "}
        {/* Increased height */}
      </a>
    </>
  );
};
