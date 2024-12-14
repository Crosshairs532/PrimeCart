import { Request, Response } from "express";
import CatchAsync from "../../utility/CatchAsync";
import { SendResponse } from "../../utility/SendResponse";
import { productService } from "./product.service";

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

const singleProduct = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await productService.singleProduct(id);
  SendResponse(res, {
    success: true,
    message: "Single Product Retrieved!",
    data: result,
  });
});
const singleProductReview = CatchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await productService.singleProductReview(productId);
  SendResponse(res, {
    success: true,
    message: "Single Product Review Retrieved!",
    data: result,
  });
});

export const productController = {
  manageProductInventory,
  singleProduct,
  singleProductReview,
};
