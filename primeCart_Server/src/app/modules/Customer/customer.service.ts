import { ProductWhereInput } from "./../../../../node_modules/.prisma/client/index.d";
import prisma from "../../prisma";

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
  // exact  - category , price  , inventory
  const { searchTerm, ...filterItems } = params;
  const filterData: ProductWhereInput = [];

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

  console.log(result);
};

export const customerService = {
  giveReviewRating,
  orderProduct,
  browseProducts,
};
