import React from "react";
import { Instagram, Linkedin, Twitter, Youtube, Facebook } from "lucide-react";

const Footer = () => {
  const footerNavs = [
    {
      label: "Company",
      items: [
        { href: "/join/beauticians", name: "List Your Service" },
        { href: "/onboarding/resume", name: "Resume your Application" },
        { href: "#", name: "Our Team" },
        { href: "#", name: "Join Us" },
      ],
    },
    {
      label: "Resources",
      items: [
        { href: "mailto:info@zarloapp.com", name: "Contact Us" },
        { href: "https://wa.me/27827952060", name: "Support" },
        { href: "#", name: "Documentation" },
        { href: "#", name: "Pricing" },
      ],
    },
    {
      label: "About",
      items: [
        { href: "#", name: "Terms of Service" },
        { href: "#", name: "License" },
        { href: "#", name: "Privacy Policy" },
        { href: "#", name: "FAQs" },
      ],
    },
  ];

  const socialLinks = [
    {
      title: "Linkedin",
      href: "https://www.linkedin.com/company/zarlo-technologies",
      icon: Linkedin,
      color: "hover:bg-blue-600",
    },
    {
      title: "Youtube",
      href: "https://www.youtube.com/@zarlo_sa",
      icon: Youtube,
      color: "hover:bg-red-600",
    },
    {
      title: "Twitter",
      href: "https://x.com/zarlo_sa",
      icon: Twitter,
      color: "hover:bg-blue-400",
    },
    {
      title: "Instagram",
      href: "https://www.instagram.com/zarlo_sa",
      icon: Instagram,
      color: "hover:bg-pink-600",
    },
    {
      title: "Facebook",
      href: "https://www.facebook.com/people/Zarlo/61564831103325/?mibextid=ZbWKwl",
      icon: Facebook,
      color: "hover:bg-blue-800",
    },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
              ZARLO
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
              Transform Your Look, Anytime, Anywhere. We connect clients with
              beauty services, offer virtual consultations, and feature a
              product marketplace.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <a
                href="https://maps.app.goo.gl/tc3qfkWrY8qYyNyR6"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                19 Ameshoff St, Braamfontein, Johannesburg, South Africa, 2001
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          {footerNavs.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-4">
                {section.label}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a
                      href={item.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-300"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Zarlo Technologies (Pty) Ltd.
              All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 ${item.color} transition-colors duration-300`}
                  >
                    <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
