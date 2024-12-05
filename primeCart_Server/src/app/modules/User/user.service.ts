import prisma from "../../prisma";
import AppError from "../../utility/AppError";

const userCreate = async (payload: any) => {
  //check user exists
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User already exists");
  }

  const userCreated = await prisma.user.create({
    data: payload,
  });

  return userCreated;
};

export const userService = {
  userCreate,
};
