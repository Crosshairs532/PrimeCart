import { Follow } from "./../../../../node_modules/.prisma/client/index.d";
import prisma from "../../prisma";
import AppError from "../../utility/AppError";

const browseProducts = async (params: any) => {
  // partial - name, description,
  // exact  - category , inventory
  const { searchTerm, max, min, userId, ...filterItems } = params;
  const filterData = [];
  const searchOn = ["name", "description"];
  console.log(params);
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

  if (
    Object.keys(filterItems).length > 0 &&
    filterItems.hasOwnProperty(["name", "description"])
  ) {
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
  let followedShopProducts;
  let unFollowedShopProducts;
  let allProducts;

  if (userId) {
    // 4. Fetch followed shop products
    followedShopProducts = await prisma.product.findMany({
      where: {
        AND: [
          whereCondition,
          {
            shop: {
              followers: {
                some: {
                  userId,
                },
              },
            },
          },
        ],
      },
      include: { shop: true },
    });

    // 5. Fetch unfollowed shop products
    unFollowedShopProducts = await prisma.product.findMany({
      where: {
        AND: [
          whereCondition,
          {
            shop: {
              followers: {
                none: {
                  userId,
                },
              },
            },
          },
        ],
      },
      include: { shop: true },
    });
    // 6. Merge followed and unfollowed products (followed first)
    allProducts = [...followedShopProducts, ...unFollowedShopProducts];
  } else {
    allProducts = await prisma.product.findMany({
      where: whereCondition,
    });
  }

  return allProducts;
};
const createShop = async (payload: any) => {
  console.log(payload);
  // check if vendor Exists.
  const vendor = await prisma.vendor.findUnique({
    where: { id: payload.vendorId },
  });

  if (!vendor) {
    throw new AppError(404, "Vendor not found.");
  }

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
  browseProducts,
};
