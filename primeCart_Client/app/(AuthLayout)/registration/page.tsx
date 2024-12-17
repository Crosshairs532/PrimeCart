import React from "react";
import RegFrom from "./components/RegFrom";
import { Logo } from "@/components/icons";
import Link from "next/link";

const RegistrationPage = () => {
  return (
    <section className=" min-h-screen flex justify-center items-center">
      <div className=" w-[60vh] h-[50vh]">
        <Link href={"/"}>
          <Logo className="  mx-auto leading-none" size={60} />
        </Link>

        <h1 className=" text-center font-bold text-[4vh]">
          Ready to Get Premium Stuff??
        </h1>
        <small className=" text-center text-[#a4a4a4] border-red-600">
          <p className="  mb-[10px]">Are you ready for primeCart?</p>
        </small>
        <RegFrom />
      </div>
    </section>
  );
};

export default RegistrationPage;
