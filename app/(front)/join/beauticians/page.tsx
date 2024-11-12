import React from "react";
import CustomButton from "@/components/CustomButton";
import CustomAccordion, { FAQItem } from "@/components/Frontend/CustomAccodion";
import Pricing from "@/components/Frontend/Pricing";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  // Keeping your existing data structures
  const features = [
    "Zarlo connects clients with beauty professionals",
    "Seamless booking experience",
    "Integrated client management tools",
  ];
  const steps = [
    "List your services",
    "Create competitive offerings",
    "Start booking clients",
  ];
  const cards = [
    {
      title: " Begin Your Journey",
      description:
        "Start a new application to join our network of beauty professionals.",
      link: "/register?role=BEAUTICIAN&plan=free",
      linkTitle: "Start a new application",
    },
    {
      title: "Resume Application",
      description:
        "Pick up where you left off and complete your onboarding process.",
      link: "/onboarding/resume",
      linkTitle: "Continue your Application",
    },
    {
      title: " Schedule a Call",
      description: "Arrange a time for a call to finalize your application",
      link: "/",
      linkTitle: "Schedule a Call",
    },
    {
      title: " Track your Progress",
      description: "Monitor the status of your application and approvals",
      link: "/",
      linkTitle: "Check Status",
    },
  ];

  const faqs: FAQItem[] = [
    {
      qn: "How do I sign up for the Zarlo App?",
      ans: (
        <div>
          You can sign up by visiting our website and clicking on the{" "}
          <CustomButton
            title="Signup"
            href="/register?role='BEAUTICIAN'"
            className="bg-yellow-400 hover:bg-yellow-500"
          />{" "}
          Follow the instructions to create your account.
        </div>
      ),
    },
    {
      qn: "Can I use the Zarlo App on multiple devices?",
      ans: "Yes, you can access our app from any device with an internet connection. Simply log in using your credentials.",
    },
    {
      qn: "Is my data secure on the Zarlo App?",
      ans: "Absolutely. We prioritize the security and privacy of your data. Our platform employs industry-standard encryption and security protocols to safeguard your information.",
    },
    {
      qn: "How can I reset my password?",
      ans: "To reset your password, go to the login page and click on the 'Forgot Password' link. Follow the prompts to reset your password.",
    },
    {
      qn: "Do you offer customer support?",
      ans: "Yes, we have a dedicated customer support team available to assist you with any questions or issues you may encounter. You can reach out to us via email or whatsapp.",
    },
    {
      qn: "Can I upgrade or downgrade my plan?",
      ans: "Certainly. You can upgrade or downgrade your plan at any time. Simply log in to your account and navigate to the subscription settings to make changes.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-yellow-50/30 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,220,99,0.1),transparent)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(255,220,99,0.05),transparent)]" />
        <div className="max-w-6xl gap-8 mx-auto grid grid-cols-1 md:grid-cols-2 items-center relative">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight animate-fade-in">
              Build a thriving
              <span className="text-yellow-400 font-semibold block mt-2 hover:text-yellow-500 transition-colors">
                beauty business
              </span>
              with Zarlo.
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Welcome to Zarlo, your ultimate beauty service platform! We make
              it effortless to connect with clients, manage appointments, and
              provide virtual consultations.
            </p>
            <CustomButton
              title="List your Service"
              href="#"
              className="bg-yellow-400 hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300 text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl"
            />
            <div className="space-y-4 pt-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center p-3 rounded-lg hover:bg-yellow-50 dark:hover:bg-gray-800/50 transition-colors duration-300"
                >
                  <Check className="w-5 h-5 mr-3 text-yellow-500" />
                  <p className="text-gray-700 dark:text-gray-300">{feature}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 blur-2xl group-hover:blur-3xl transition-all duration-300 -z-10" />
            <Image
              src="/takeaway-beautician.png"
              alt="Beautician"
              width={1170}
              height={848}
              className="w-full rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Revenue Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-yellow-50/50 to-transparent dark:from-transparent dark:via-gray-800/50 dark:to-transparent">
        <div className="max-w-6xl gap-12 mx-auto grid grid-cols-1 md:grid-cols-2 items-center">
          <Image
            src="/collab-beauticians.png"
            alt="Collaboration"
            width={1170}
            height={848}
            className="w-full hidden md:block rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
          />
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Join Zarlo to increase your
              <span className="text-yellow-400 font-semibold mx-2 hover:text-yellow-500 transition-colors">
                revenue
              </span>
              today.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {cards.map((card, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-yellow-600 to-yellow-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-200 text-sm mb-4">
                    {card.description}
                  </p>
                  <CustomButton
                    title={card.linkTitle}
                    href={card.link}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg transform hover:scale-105 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section - New! */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4 mx-auto">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step}</h3>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-8 h-0.5 bg-yellow-400/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-yellow-50/30 to-transparent dark:from-transparent dark:via-gray-800/30 dark:to-transparent">
        <div className="max-w-6xl mx-auto">
          <Pricing />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <CustomAccordion FAQS={faqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
