import { Prisma } from "@prisma/client";
import prisma from "../../prisma";
import AppError from "../../utility/AppError";

const giveReviewRating = async (payload: any) => {
  const feedBack = {
    ...payload,
    rating: payload.rating ? payload.rating : 0,
    review: payload.review ? payload.review : "No Reviews",
  };

  console.log(feedBack);

  const result = await prisma.product_review.create({
    data: feedBack,
  });

  return result;
};

const orderProduct = async (payload: any) => {
  const result = await prisma.order.create({
    data: payload,
  });
  return result;
};

const browseProducts = async (params: any) => {
  // partial - name, description,
  // exact  - category , inventory
  const { searchTerm, ...filterItems } = params;
  const filterData = [];

  const searchOn = ["name", "description"];

  if (searchTerm) {
    filterData.push({
      OR: searchOn.map((field: string) => {
        return {
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  if (Object.keys(filterItems).length > 0) {
    filterData.push({
      AND: Object.keys(filterItems).map((key: any) => ({
        [key]: {
          equals: filterItems[key],
          mode: "insensitive",
        },
      })),
    });
  }

  const whereCondition = { AND: filterData };
  const result = await prisma.product.findMany({
    where: whereCondition,
  });

  return result;
};

const addToCart = async (payload: any) => {
  // check if the product is from another shop .
  const product = await prisma.product.findUnique({
    where: {
      id: payload.productId,
    },
    select: { shopId: true },
  });

  if (!product) {
    throw new AppError(404, "Product Not Found!");
  }

  // find the user from the cart and his shopId
  const cartProduct = await prisma.cart.findFirst({
    where: {
      userId: payload.userId,
    },
    select: {
      shopId: true,
    },
  });
  if (cartProduct) {
    if (cartProduct?.shopId != payload.shopId) {
      throw new AppError(
        400,
        "You can't add product from another shop to your cart"
      );
    }
  }

  const result = await prisma.cart.create({
    data: payload,
  });

  return result;
};

export const customerService = {
  giveReviewRating,
  orderProduct,
  browseProducts,
  addToCart,
};
