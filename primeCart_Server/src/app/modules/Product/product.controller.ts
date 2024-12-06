import { Request, Response } from "express";
import CatchAsync from "../../utility/CatchAsync";
import { SendResponse } from "../../utility/SendResponse";
import { productService } from "./product.service";

const giveReviewRating = CatchAsync(async (req: Request, res: Response) => {
  const result = await productService.giveReviewRating(req.body);

  SendResponse(res, {
    success: true,
    message: "Product FeedBack Submitted Successfully",
    data: result,
  });
});

export const productController = {
  giveReviewRating,
};
