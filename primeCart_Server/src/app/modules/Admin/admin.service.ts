import prisma from "../../prisma";
import AppError from "../../utility/AppError";

const adminSuspendDelete = async (payload: any) => {
  const isUserOrVendorExists = await prisma.user.findMany({
    where: {
      email: payload.email,
    },
  });

  if (!isUserOrVendorExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User or Vendor Does not exists!");
  }

  const statusUpdate = await prisma.user.update({
    where: {
      email: payload.email,
    },
    data: {
      status: payload.status,
    },
  });

  return statusUpdate;
};
export const adminService = {
  adminSuspendDelete,
};
