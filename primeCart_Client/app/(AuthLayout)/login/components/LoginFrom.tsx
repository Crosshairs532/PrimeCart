"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/input";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Divider } from "@nextui-org/divider";

import { Button } from "@nextui-org/button";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  LockIcon,
  UploadImageIcon,
  UserEmailIcon,
} from "@/components/icons";
import { useLogin, useRegistration } from "@/hooks/Auth/auth.hook";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { register, handleSubmit } = useForm();
  const { mutate: Login } = useLogin();
  const route = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    Login(data);
    route.replace("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" mb-4 space-y-4">
        <Input
          {...register("email")}
          placeholder="Your email"
          startContent={<UserEmailIcon />}
          type="email"
        />
        <Input
          {...register("password")}
          placeholder="Your password"
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          startContent={<LockIcon />}
          type={isVisible ? "text" : "password"}
        />
      </div>

      <div className=" pb-6 flex justify-between">
        <small className=" hover:border-b-1 border-b-cyan-700">
          forgot password
        </small>
        <Link href="/registration">
          <small className=" hover:border-b-1 border-b-cyan-700">
            Dont't have an account?
          </small>
        </Link>
      </div>

      <Button type="submit" className=" bg-[#010101] text-[#f2f0ea]">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
