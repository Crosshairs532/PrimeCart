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

// find vendor specific products
const getAllProduct = async (vendorId: string) => {
  const result = await prisma.shop.findMany({
    where: {
      vendorId: vendorId,
    },
    select: {
      products: true,
    },
  });

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

const productReviewRating = async () => {
  const reviews = await prisma.product_review.findMany({});
  return reviews;
};

const flashSale = async (flashSaleData: any) => {
  //
  const flashSaleProducts = await prisma.flashSale.create({
    data: flashSaleData,
  });
};

export const shopService = {
  createShop,
  createProduct,
  getAllProduct,
  manageShop,
  viewOrderHistory,
  createCoupon,
  singleShopInfo,
  productReviewRating,
  flashSale,
};
