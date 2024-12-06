import prisma from "../../prisma";

const giveReviewRating = async (payload: any) => {
  const feedBack = {
    productId: payload.productId,
    rating: payload.rating ? payload.rating : 0,
    review: payload.review ? payload.review : "No Reviews",
  };

  console.log(feedBack);

  const result = await prisma.product_review.create({
    data: feedBack,
  });

  return result;
};

export const productService = {
  giveReviewRating,
};
