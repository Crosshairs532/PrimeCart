import { Request, Response } from "express";
import CatchAsync from "../../utility/CatchAsync";
import { authService } from "./auth.service";
import { SendResponse } from "../../utility/SendResponse";

const userLogin = CatchAsync(async (req: Request, res: Response) => {
  // console.log(req.body);
  const result = await authService.userLogin(req.body);
  SendResponse(res, {
    success: true,
    message: "User Logged in Successfully",
    data: result,
  });
});

const forgetPassword = CatchAsync(async (req: Request, res: Response) => {
  const result = await authService.forgotPassword(req.body);
  SendResponse(res, {
    success: true,
    message: "An Email has been sent to you Email!",
    data: result,
  });
});
const resetPassword = CatchAsync(async (req: Request, res: Response) => {
  const resetToken = req.headers.authorization as string;

  const result = await authService.resetPassword(resetToken, req.body);
  SendResponse(res, {
    success: true,
    message: "password reset Successfully",
    data: result,
  });
});

export const authController = {
  userLogin,
  forgetPassword,
  resetPassword,
};
