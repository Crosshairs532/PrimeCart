import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import AppError from "./AppError";

const globalError: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.status || httpStatus.INTERNAL_SERVER_ERROR || 500;
  let message = err.message || "Something went Wrong";
  // module 14
  let errorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  //   if (err instanceof ZodError) {
  //     const simplifiedError = handleZodError(err);
  //     statusCode = simplifiedError?.statusCode;
  //     message = simplifiedError?.message;
  //     errorSource = simplifiedError?.errorSource;
  //   } else if (err.name === "ValidationError") {
  //     const simplifiedError = handleValidationError(err);
  //     statusCode = simplifiedError?.statusCode;
  //     message = simplifiedError?.message;
  //     errorSource = simplifiedError?.errorSource;
  //   } else if (err.name === "castError") {
  //     const simplifiedError = handleCastError(err);
  //     statusCode = simplifiedError?.statusCode;
  //     message = simplifiedError?.message;
  //     errorSource = simplifiedError?.errorSource;
  //   } else if (err.code === 11000) {
  //     const simplifiedError = handleDuplicateError(err);
  //     statusCode = simplifiedError?.statusCode;
  //     message = simplifiedError?.message;
  //     errorSource = simplifiedError?.errorSource;
  //   } else

  if (err instanceof AppError) {
    console.log("Error");
    statusCode = err?.statusCode;
    message = err.message;
    errorSource = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSource = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message: err || message,
    errorSource,
  });
  return;
};
export default globalError;
/*
  \  pattern | 
  success
  message
  errorSources:[
    path:""
,
    message:''
  ]
  stack
*/
