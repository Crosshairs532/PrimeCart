import prisma from "../../prisma";

const productReviewRating = async () => {
  const reviews = await prisma.product_review.findMany({});
  return reviews;
};

export const vendorService = {
  productReviewRating,
};
