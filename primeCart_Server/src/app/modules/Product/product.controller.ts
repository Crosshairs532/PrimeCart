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

const manageProductInventory = CatchAsync(
  async (req: Request, res: Response) => {
    const { productId } = req.query;
    const updatedData = req.body;

    console.log(productId, updatedData);
    const result = await productService.manageProductInventory(
      productId as string,
      updatedData
    );
    SendResponse(res, {
      success: true,
      message: "Product inventory updated!",
      data: result,
    });
  }
);

export const productController = {
  giveReviewRating,
  manageProductInventory,
};
