import prisma from "../../prisma";
import AppError from "../../utility/AppError";
import { blackListDataT } from "./admin.interface";

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

const adminBlackList = async (blackListData: blackListDataT) => {
  const addedToBlackList = await prisma.blacklist.create({
    data: blackListData,
  });

  return addedToBlackList;
};
export const adminService = {
  adminSuspendDelete,
  adminBlackList,
};
