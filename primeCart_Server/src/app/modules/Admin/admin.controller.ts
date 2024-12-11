import { Request, Response } from "express";
import CatchAsync from "../../utility/CatchAsync";
import { adminService } from "./admin.service";
import { SendResponse } from "../../utility/SendResponse";

const adminSuspendDelete = CatchAsync(async (req: Request, res: Response) => {
  const result = await adminService.adminSuspendDelete(req.body);

  SendResponse(res, {
    success: true,
    message: "User Suspended / Deleted Successfully",
    data: result,
  });
});
export const adminController = {
  adminSuspendDelete,
};
