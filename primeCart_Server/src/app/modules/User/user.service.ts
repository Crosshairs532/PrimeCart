import { userRole } from "@prisma/client";
import prisma from "../../prisma";
import AppError from "../../utility/AppError";
import httpStatus from "http-status";

const userCreate = async (payload: any) => {
  //check user exists
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User already exists");
  }
  const CustomerCreated = await prisma.$transaction(async (tx) => {
    const userCreated = await tx.user.create({
      data: payload,
    });

    if (payload.role === userRole.CUSTOMER) {
      await tx.customer.create({
        data: {
          email: payload.email,
        },
      });
    } else if (payload.role === userRole.VENDOR) {
      await tx.vendor.create({
        data: {
          email: payload.email,
        },
      });
    }

    return userCreated;
  });

  return CustomerCreated;
};

export const userService = {
  userCreate,
};
