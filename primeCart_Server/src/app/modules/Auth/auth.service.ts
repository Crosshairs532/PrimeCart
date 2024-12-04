import { userStatus } from "@prisma/client";
import prisma from "../../prisma";
import AppError from "../../utility/AppError";
import httpStatus from "http-status";
import { jwtHelper } from "../../custom/jwt";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
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

  const userCreated = await prisma.user.create({
    data: payload,
  });

  return userCreated;
};

const userLogin = async (payload: any) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User Doest Not exists");
  }

  //check password
  const passwordMatched = payload.password == isUserExists.password;
  if (!passwordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, "Password Does Not Matched!");
  }
  //generateToken
  const accessToken = jwtHelper.generateToken(
    payload,
    config.jwt.jwt_secret as string,
    config.jwt.jwt_expireTime as string
  );

  return {
    userData: isUserExists,
    accessToken: accessToken,
  };
};
export const authService = {
  userCreate,
  userLogin,
};
