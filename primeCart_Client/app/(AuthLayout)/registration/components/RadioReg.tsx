"use client";

import React, { useState } from "react";
import { RadioGroup, Radio } from "@nextui-org/radio";

const RadioReg = ({ register }: any) => {
  const validOptions = ["CUSTOMER", "VENDOR"];

  return (
    <div className="flex justify-between">
      <div className="flex gap-x-2 items-center">
        <input
          {...register("role", { required: true })}
          required
          id="role_customer"
          type="radio"
          name="role"
          value="CUSTOMER"
          className="w-[15px] h-[15px] appearance-none rounded-md border border-gray-400 checked:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        />
        <label htmlFor="role_customer" className="text-[#010101]">
          CUSTOMER
        </label>
      </div>
      <div className="flex gap-x-2 items-center">
        <input
          {...register("role", { required: true })}
          id="role_vendor"
          type="radio"
          required
          name="role"
          value="VENDOR"
          className="w-[15px] h-[15px] appearance-none rounded-md border border-gray-400 checked:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        />
        <label htmlFor="role_vendor" className="text-[#010101]">
          VENDOR
        </label>
      </div>
    </div>
  );
};

export default RadioReg;
