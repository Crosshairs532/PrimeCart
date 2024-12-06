import { Request, Response } from "express";
import CatchAsync from "../../utility/CatchAsync";
import { SendResponse } from "../../utility/SendResponse";
import { shopService } from "./shop.service";

const createShop = CatchAsync(async (req: Request, res: Response) => {
  const { profilePhoto, ...other } = req.body;
  const newShop = { ...other, logo: profilePhoto };

  const result = await shopService.createShop(newShop);
  SendResponse(res, {
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const createProduct = CatchAsync(async (req: Request, res: Response) => {
  const result = await shopService.createProduct(req.body);
  SendResponse(res, {
    success: true,
    message: "User created successfully",
    data: result,
  });
});
export const shopController = {
  createShop,
  createProduct,
};
