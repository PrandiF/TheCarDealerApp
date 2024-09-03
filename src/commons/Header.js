import Link from "next/link";
import React from "react";
import { IoHome } from "react-icons/io5";

function Header() {
  return (
    <div className="flex h-[100px] bg-transparent w-full items-center justify-between px-[5%] text-white">
      <h2 className="xl:text-3xl">The Car Dealar App</h2>
      <div className="flex gap-6">
        <Link href={"/"} className="flex gap-2 items-center">
          <IoHome className="xl:text-xl"/>
          <p className="hover:underline cursor-pointer xl:text-xl">Home</p>
        </Link>
      </div>
    </div>
  );
}

export default Header;
