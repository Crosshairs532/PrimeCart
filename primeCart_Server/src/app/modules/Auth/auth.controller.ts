import { Request, Response } from "express";
import CatchAsync from "../../utility/CatchAsync";
import { authService } from "./auth.service";
import { SendResponse } from "../../utility/SendResponse";

const userCreate = CatchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await authService.userCreate(req.body);

  console.log(result);
  SendResponse(res, {
    success: true,
    message: "User created successfully",
    data: result,
  });
});
const userLogin = CatchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await authService.userLogin(req.body);
  SendResponse(res, {
    success: true,
    message: "User Logged in Successfully",
    data: result,
  });
});

export const authController = {
  userCreate,
  userLogin,
};
