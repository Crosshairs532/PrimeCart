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
export const shopService = {
  createShop,
  createProduct,
  getAllProduct,
};
