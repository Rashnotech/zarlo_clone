import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../public/logo.png";
export default function Logo() {
  return (
    <Link href="/" className="mr-6 flex items-center space-x-2">
      <Image alt="Zarlo Logo" src={logo} className="h-6 lg:h-10 w-auto" />
    </Link>
  );
}
