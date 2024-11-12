import { Check, HelpCircle } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
export default function Pricing() {
  const plans = [
    {
      name: "Free Forever",
      desc: "Ideal for beauty professionals starting out.",
      price: 0,
      fee: 5,
      isMostPop: false,
      features: [
        "Manage up to 10 appointments per month",
        "Basic client record management",
        "Email notifications for appointments",
      ],
      getStarted: "/register?role=BEAUTICIAN&plan=free",
    },
    {
      name: "Professional",
      desc: "Perfect for freelancing beauticians.",
      price: 610,
      fee: 0,
      isMostPop: true,
      features: [
        "Unlimited appointments",
        "Advanced client record management",
        "No-show protection",
        "Marketing tools",
        "Access to equipment",
        "Quarterly exclusive beauty training and events",
      ],
      getStarted: "/register?role=BEAUTICIAN&plan=professional",
    },
    {
      name: "Enterprise",
      desc: "Tailored for physical beauty stores and clinics.",
      price: 990,
      fee: 0,
      isMostPop: false,
      features: [
        "All features from the Professional Plan",
        "Multi-provider support",
        "Priority customer support",
        "Integration with appointment and payment systems",
      ],
      getStarted: "#",
    },
  ];

  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="relative max-w-xl mx-auto sm:text-center">
          <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-yellow-500 dark:text-yellow-500  sm:text-4xl">
            Pricing for Every Need
          </h3>
          <div className="mt-3 max-w-xl">
            <p className="leading-7 [&:not(:first-child)]:mt-6 dark:text-yellow-700">
              Whether you're just starting out as a freelancer or managing a
              bustling physical beauty store, our tailored solutions provide the
              essential tools to elevate your business and streamline your
              operations.
            </p>
          </div>
        </div>
        <div className="mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3">
          {plans.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex-1 flex items-stretch flex-col rounded-xl border-2 mt-6 sm:mt-0 ${
                item.isMostPop ? "mt-10" : ""
              }`}
            >
              {item.isMostPop ? (
                <span className="w-32 absolute -top-5 left-0 right-0 mx-auto px-3 py-2 rounded-full border shadow-md bg-white text-center text-gray-700 text-sm font-semibold">
                  Most popular
                </span>
              ) : (
                ""
              )}
              <div className="p-8 space-y-4 border-b">
                <span className="text-yellow-400 font-bold uppercase tracking-widest ">
                  {item.name}
                </span>
                <div className="text-gray-800 dark:text-gray-300 text-3xl font-semibold">
                  R{item.price}{" "}
                  <span className="text-xl text-gray-600 font-normal">/mo</span>
                </div>
                <p className="text-xs">{item.desc}</p>
                <div className="flex">
                  <p>+5% transaction fee</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button>
                          <HelpCircle className="w-4 h-4 ms-2" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-slate-900 text-white text-xs">
                        <p>
                          PayStack will charge their regular transaction Fee
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Link
                  href={item.getStarted}
                  className="px-3 block text-center py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-700"
                >
                  Get Started
                </Link>
              </div>
              <ul className="p-8 space-y-3">
                <li className="pb-2 text-gray-800 dark:text-gray-500 font-medium">
                  <p>Features</p>
                </li>
                {item.features.map((featureItem, idx) => (
                  <li key={idx} className="flex items-center gap-5">
                    <Check className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    {featureItem}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
