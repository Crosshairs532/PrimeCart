import { Response } from "express";
import httpStatus from "http-status";
export const SendResponse = (res: Response, payload: any) => {
  return res.status(httpStatus.OK).json({
    success: payload.success,
    message: payload.message,
    data: payload.data,
  });
};
