import { Request, Response } from "express";
import CatchAsync from "../../utility/CatchAsync";
import { SendResponse } from "../../utility/SendResponse";
import { userService } from "./user.service";

const userCreate = CatchAsync(async (req: Request, res: Response) => {
  const result = await userService.userCreate(req.body);

  console.log(result);
  SendResponse(res, {
    success: true,
    message: "User created successfully",
    data: result,
  });
});

export const userController = {
  userCreate,
};
