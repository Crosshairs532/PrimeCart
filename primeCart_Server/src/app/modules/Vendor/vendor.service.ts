import prisma from "../../prisma";

const productReviewRating = async () => {
  const reviews = await prisma.product_review.findMany({});
  return reviews;
};

const flashSale = async (flashSaleData: any) => {
  //
};

export const vendorService = {
  productReviewRating,
  flashSale,
};
