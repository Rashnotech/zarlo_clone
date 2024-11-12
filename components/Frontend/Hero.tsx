import React from "react";
import Image from "next/image";
import { CalendarCheck2, Search, Star, Users, Sparkles } from "lucide-react";
import TransitionalText from "./TransitionalText";
import SearchBar from "./SearchBar";

const Hero = () => {
  const TEXTS = [
    "Haircuts",
    "Skincare",
    "Makeup",
    "Massage",
    "Facials",
    "Nails",
    "Beauty",
    "Wellness",
  ];

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-yellow-50 dark:from-slate-950 dark:to-slate-900">
      <div className="relative pb-12 sm:pb-16 lg:pb-20 pt-10 sm:pt-16 lg:pt-24 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[300px] sm:h-[400px] lg:h-[500px] w-[300px] sm:w-[400px] lg:w-[500px] -translate-x-1/2 opacity-20 dark:opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-200 rounded-full blur-3xl" />
          </div>
        </div>

        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6 sm:space-y-8 text-left">
              {/* Main Heading */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
                  <span className="block">Discover Your</span>
                  <span className="block text-yellow-600 dark:text-yellow-400">
                    <TransitionalText
                      TEXTS={TEXTS}
                      className="font-extrabold"
                    />
                  </span>
                  <span className="block">Journey</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl">
                  Your personal beauty and wellness destination. Expert
                  services, virtual consultations, and premium products, all in
                  one place.
                </p>
              </div>

              {/* Search Bar */}
              <div className="max-w-md">
                <div className="relative">
                  <SearchBar />
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap justify-start gap-3 sm:gap-4">
                <button className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 transition-colors text-sm sm:text-base">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Book Service
                </button>
                <button className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border-2 border-slate-200 dark:border-slate-700 hover:border-yellow-600 dark:hover:border-yellow-400 transition-colors text-sm sm:text-base">
                  <CalendarCheck2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Schedule Consultation
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-sm pt-4 sm:pt-8">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 sm:p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      7+
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      Expert Beauticians
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-1.5 sm:p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      110+
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      Happy Clients
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative lg:ml-auto mt-8 lg:mt-0">
              <div className="relative z-10 overflow-hidden rounded-2xl shadow-xl max-w-sm mx-auto lg:max-w-none">
                <Image
                  src="/alexander-grey-zarlo.jpg"
                  alt="Beauty Services"
                  width={800}
                  height={600}
                  className="w-full h-[400px] sm:h-[500px] object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
                {/* Floating Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-yellow-200 dark:bg-yellow-800 border-2 border-white dark:border-slate-900"
                        />
                      ))}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white">
                        Join 110+ satisfied clients
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 hidden sm:block">
                        Book your session today
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
