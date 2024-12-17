import { Logo } from "@/components/icons";
import React from "react";
import RegFrom from "../registration/components/RegFrom";
import LoginForm from "./components/LoginFrom";

const LoginPage = () => {
  return (
    <section className=" min-h-screen flex justify-center items-center">
      <div className=" w-[60vh] h-[50vh]">
        <Logo className="  mx-auto leading-none" size={60} />

        <h1 className=" text-center font-bold text-[4vh]">Welcome Back</h1>
        <small className=" text-center text-[#a4a4a4] border-red-600">
          <p className="  mb-[10px]">Are you ready for primeCart?</p>
        </small>
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
