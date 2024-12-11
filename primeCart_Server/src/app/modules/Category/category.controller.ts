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
const editCategory = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.query;
  const result = categoryService.editCategory(id as string, req.body);
  SendResponse(res, {
    success: true,
    message: "You have edited Category!",
    data: result,
  });
});
const deleteCategory = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.query;
  const result = categoryService.deleteCategory(id as string);
  SendResponse(res, {
    success: true,
    message: "You have deleted Category!",
    data: result,
  });
});

export const categoryController = {
  createCategory,
  editCategory,
  deleteCategory,
};
