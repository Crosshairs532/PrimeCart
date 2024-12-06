import prisma from "../../prisma";

const createShop = async (payload: any) => {
  const result = await prisma.shop.create({
    data: payload,
  });

  return result;
};

const createProduct = async (payload: any) => {
  const productCreated = await prisma.$transaction(async (tx) => {
    //create a product and add the shop id
    const product = await tx.product.create({
      data: payload,
    });

    return product;
  });

  return productCreated;
};
export const shopService = {
  createShop,
  createProduct,
};
