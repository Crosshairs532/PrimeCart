"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/input";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Divider } from "@nextui-org/divider";
import RadioReg from "./RadioReg";
import { Button } from "@nextui-org/button";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  LockIcon,
  UploadImageIcon,
  UserEmailIcon,
} from "@/components/icons";
import { useRegistration } from "@/hooks/Auth/auth.hook";

const RegFrom = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { register, handleSubmit } = useForm();
  const [profilePicture, setProfilePicture] = useState<
    string | null | ArrayBuffer
  >();
  const [image, setImage] = useState();

  // * Registration Api.
  const { mutate: Registration, reset } = useRegistration();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    const newData = JSON.stringify({ ...data, status: "ACTIVE" });

    formData.append("data", newData);
    if (image) {
      formData.append("file", image);
    }

    console.log("Clicked");
    //* submit the registration value.
    Registration(formData);
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" mb-4 space-y-4">
        <Input
          {...register("name")}
          placeholder="Your name"
          startContent={<UserEmailIcon />}
          type="text"
        />
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

        <Divider className="my-4" />
        <RadioReg register={register} />
      </div>
      <div className=" mb-4 max-w-full flex justify-between px-3 items-center bg-transparent ">
        <div>
          <label
            className=" hover:text-[#969696] duration-100 transition-all cursor-pointer text-[#010101] text-center "
            htmlFor="image"
          >
            <UploadImageIcon />
          </label>
          <input
            required
            onChange={(e) => handleImageChange(e)}
            className="hidden"
            type="file"
            name=""
            id="image"
          />
        </div>
        {profilePicture && (
          <div className="relative border-2 size-20  rounded-xl border-dashed shadow-2xl border-default-300 p-2">
            <img
              alt="item"
              className="h-full w-full object-contain object-center rounded-md"
              src={
                typeof profilePicture === "string" ? profilePicture : undefined
              }
            />
          </div>
        )}
      </div>

      <Button type="submit" className=" bg-[#010101] text-[#f2f0ea]">
        register
      </Button>
    </form>
  );
};

export default RegFrom;
