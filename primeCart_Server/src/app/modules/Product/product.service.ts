import prisma from "../../prisma";

const manageProductInventory = async (id: string, payload: any) => {
  const result = await prisma.product.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const singleProduct = async (id: string) => {
  // fetch product first.

  const singleProduct = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      shop: true,
      category: true,
      product_review: true,
    },
  });

  const productsOfSameCategory = await prisma.product.findMany({
    where: {
      id: {
        not: id,
      },
      category: {
        some: {
          id: {
            in: singleProduct?.category.map((cat) => cat.id),
          },
        },
      },
    },
  });

  return {
    singleProduct,
    productsOfSameCategory,
  };
};

const singleProductReview = async (productId: string) => {
  const result = await prisma.product_review.findMany({
    where: {
      productId,
    },
  });

  return result;
};
export const productService = {
  manageProductInventory,
  singleProduct,
  singleProductReview,
};
