import { adminController } from "./../Admin/admin.contoller";
import { userStatus } from "@prisma/client";
import prisma from "../../prisma";
import AppError from "../../utility/AppError";
import httpStatus from "http-status";
import { jwtHelper } from "../../custom/jwt";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import emailSender from "../../custom/emailSender";

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

const forgotPassword = async ({ email }: { email: string }) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: email,
      status: userStatus.ACTIVE,
    },
  });

  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "User Does Not Exist!");
  }

  const resetPassToken = jwtHelper.generateToken(
    userData,
    config.jwt.jwt_secret as string,
    config.jwt.jwt_expireTime as string
  );

  const frontendLink = `https://localhost:3000/reset-password?email=${email}&token=${resetPassToken}`;
  console.log(frontendLink);
  const mailed = await emailSender(
    userData.email,
    `
    <div>
        <p>Dear User,</p>
        <p>Reset password Link :
          <a href=${frontendLink}>
              Reset Password Link
          </a>
        </p>
    </div>
  `
  );

  return mailed;
};

const resetPassword = async (token: string, payload: any) => {
  // check user exists
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "User Does Not Exist!");
  }
  // verify token
  const decoded = jwtHelper.verifyToken(token, config.jwt.jwt_secret as string);
  if (!decoded) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are Not Authorized!");
  }
  // check if decoded email and sender email are same.

  if (decoded.email !== userData.email) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are Not Authorized!");
  }

  const result = await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: payload.password,
    },
  });

  return result;
};

export const authService = {
  userLogin,
  forgotPassword,
  resetPassword,
};
