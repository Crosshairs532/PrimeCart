import prisma from "../../prisma";
import AppError from "../../utility/AppError";

const giveReviewRating = async (payload: any) => {
  // check if it is purchased.

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
  // check coupon for the specific shop
  const isCouponExists = await prisma.coupon.findUnique({
    where: {
      code: payload.coupon,
      shopId: payload.shopId,
    },
  });

  if (!isCouponExists) {
    throw new AppError(404, "This Coupon is not available!");
  }

  const dateCheck = new Date(isCouponExists?.expiresAt).getTime() - Date.now();
  if (dateCheck < 0) {
    throw new AppError(404, "Coupon validity Expired!");
  }

  const result = await prisma.order.create({
    data: payload,
  });
  return result;
};

const browseProducts = async (params: any) => {
  // partial - name, description,
  // exact  - category , inventory
  const { searchTerm, max, min, ...filterItems } = params;
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

  // price range
  filterData.push({
    AND: {
      price: {
        gt: min,
        lt: min,
      },
    },
  });

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

const purchasedHistory = async (user: any) => {
  // fetch specific order of the specific user
  const history = await prisma.$transaction(async (tx) => {
    const userOrderData = await tx.user.findUnique({
      where: {
        email: user?.email,
      },
    });
    const allOrders = await tx.order.findMany({
      where: {
        userId: user?.id,
      },
    });
    return allOrders;
  });

  // console.log(history);
  return history;
};

const followVendorShop = async (followData: any) => {
  // check id already followed.
  const userData = await prisma.user.findUnique({
    where: {
      id: followData.userId,
    },
    include: {
      follows: true,
    },
  });

  if (!userData) {
    throw new AppError(400, "User not found");
  }
  const follows = userData.follows; // all followed users.

  const isFollowed = follows.find(
    (follow: any) => follow === followData.shopId
  );
  if (isFollowed) {
    throw new AppError(400, "You already followed this shop.");
  }

  const followed = await prisma.follow.create({
    data: followData,
  });
  return followed;
};

const recentProduct = async (recentlyViewed: any) => {
  const result = await prisma.recentProduct.create({
    data: recentlyViewed,
  });

  return result;
};
const ViewRecentProduct = async (user: any) => {
  const RecentlyViewedProduct = await prisma.$transaction(async (tx) => {
    const userOrderData = await tx.user.findUnique({
      where: {
        email: user?.email,
      },
    });
    const recentlyViewed = await tx.recentProduct.findMany({
      where: {
        userId: user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: 0,
      take: 10,
    });
    return recentlyViewed;
  });

  return RecentlyViewedProduct;
};

export const customerService = {
  giveReviewRating,
  orderProduct,
  browseProducts,
  addToCart,
  purchasedHistory,
  followVendorShop,
  recentProduct,
  ViewRecentProduct,
};
