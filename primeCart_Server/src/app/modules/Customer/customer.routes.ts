import { Router } from "express";
import { customerController } from "./customer.controller";
import auth from "../../middleware/auth";
import { userRole } from "@prisma/client";

const router = Router();
router.post("/review-rating", customerController.giveReviewRating);
router.post(
  "/order-product",
  auth(userRole.CUSTOMER),
  customerController.orderProduct
);
router.get("/browse-products", customerController.browseProduct);
router.post("/add-to-cart", customerController.addToCart);
router.get(
  "/purchased-order-history",
  auth(userRole.CUSTOMER, userRole.VENDOR),
  customerController.purchasedHistory
); // this is for customer they can see  their order history

router.post(
  "/follow-shop",
  auth(userRole.CUSTOMER),
  customerController.followVendorShop
);

router.post("/recent-product", customerController.recentProduct);
router.post("/view-recent-product", customerController.ViewRecentProduct);

export const customerRoutes = router;
