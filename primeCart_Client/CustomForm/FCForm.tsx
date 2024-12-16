"use client";

import React, { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

const FCForm = ({
  children,
  onSubmit,
}: {
  children: ReactNode;
  onSubmit: any;
}) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods?.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default FCForm;
