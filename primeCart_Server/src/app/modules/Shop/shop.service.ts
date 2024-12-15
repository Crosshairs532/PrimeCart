import { Follow } from "./../../../../node_modules/.prisma/client/index.d";
import prisma from "../../prisma";

const createShop = async (payload: any) => {
  const result = await prisma.shop.create({
    data: payload,
  });

  return result;
};

const createProduct = async (payload: any) => {
  console.log(payload);

  //create a product and add the shop id
  const product = await prisma.product.create({
    data: payload,
  });
  return product;
};

const getAllProduct = async () => {
  const result = await prisma.product.findMany({});

  return result;
};

const manageShop = async (id: string, payload: any) => {
  const product = await prisma.shop.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return product;
};

const viewOrderHistory = async (id: string) => {
  const result = await prisma.order.findMany({
    where: {
      shopId: id,
    },
    include: {
      product: true,
      shop: true,
      user: true,
    },
  });

  return result;
};

const createCoupon = async (couponData: any) => {
  const result = await prisma.coupon.create({
    data: couponData,
  });

  return result;
};

const singleShopInfo = async (shopId: string) => {
  const result = await prisma.shop.findUnique({
    where: {
      id: shopId,
    },
    include: {
      followers: true,
    },
  });

  return result;
};

export const shopService = {
  createShop,
  createProduct,
  getAllProduct,
  manageShop,
  viewOrderHistory,
  createCoupon,
  singleShopInfo,
};
