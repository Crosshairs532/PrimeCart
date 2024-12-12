import { Request, Response } from "express";
import CatchAsync from "../../utility/CatchAsync";
import { SendResponse } from "../../utility/SendResponse";
import { vendorService } from "./vendor.service";

const productReview = CatchAsync(async (req: Request, res: Response) => {
  const result = await vendorService.productReviewRating();
  SendResponse(res, {
    success: true,
    message: "User created successfully",
    data: result,
  });
});

export const vendorController = {
  productReview,
};
