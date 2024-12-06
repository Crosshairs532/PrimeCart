import { NextFunction, Request, Response } from "express";
import config from "../../config";
import AppError from "../utility/AppError";
import { jwtHelper } from "../custom/jwt";
import httpStatus from "http-status";

const auth = (...roles: string[]) => {
  return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "You are not authorized!"
      );
    }
    const verifiedUser = jwtHelper.verifyToken(
      token,
      config.jwt.jwt_secret as string
    );

    req.user = verifiedUser;

    console.log(verifiedUser, "in auth.ts");
    if (verifiedUser && !roles.includes(verifiedUser.role)) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "You are not authorized!"
      );
    }
    next();
  };
};

export default auth;
