import { Request, Response } from "express";
import CatchAsync from "../../utility/CatchAsync";
import { SendResponse } from "../../utility/SendResponse";
import { customerService } from "./customer.service";

const giveReviewRating = CatchAsync(async (req: Request, res: Response) => {
  const result = await customerService.giveReviewRating(req.body);

  SendResponse(res, {
    success: true,
    message: "Product FeedBack Submitted Successfully",
    data: result,
  });
});
const orderProduct = CatchAsync(async (req: Request, res: Response) => {
  const result = await customerService.orderProduct(req.body);
  SendResponse(res, {
    success: true,
    message: "You ordered a product!",
    data: result,
  });
});

export const customerController = {
  giveReviewRating,
  orderProduct,
};
