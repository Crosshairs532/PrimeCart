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

const getAllProduct = CatchAsync(async (req: Request, res: Response) => {
  const result = await shopService.getAllProduct();
  SendResponse(res, {
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const manageShop = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.query;
  const result = await shopService.manageShop(id as string, req.body);
  SendResponse(res, {
    success: true,
    message: "Shop Updated",
    data: result,
  });
});

const viewOrderHistory = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req.query;
    const result = await shopService.viewOrderHistory(id as string);
    SendResponse(res, {
      success: true,
      message: "All order history retrieved",
      data: result,
    });
  }
);

const createCoupon = CatchAsync(async (req: Request, res: Response) => {
  const result = await shopService.createCoupon(req.body);
  SendResponse(res, {
    success: true,
    message: "Coupon created successfully",
    data: result,
  });
});

export const shopController = {
  createShop,
  createProduct,
  getAllProduct,
  manageShop,
  viewOrderHistory,
  createCoupon,
};
