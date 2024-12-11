import { Request, Response } from "express";
import CatchAsync from "../../utility/CatchAsync";
import { SendResponse } from "../../utility/SendResponse";
import { categoryService } from "./category.service";

const createCategory = CatchAsync(async (req: Request, res: Response) => {
  console.log("created");
  const result = categoryService.createCategory(req.body);
  SendResponse(res, {
    success: true,
    message: "You Have Created Category!",
    data: result,
  });
});

export const categoryController = {
  createCategory,
};
