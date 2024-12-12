import { Router } from "express";
import { authRoutes } from "../modules/Auth/auth.routes";
import { userRoutes } from "../modules/User/user.routes";
import { shopRoute } from "../modules/Shop/shop.routes";
import { productRoutes } from "../modules/Product/product.routes";
import { adminRoutes } from "../modules/Admin/admin.routes";
import path from "path";
import { customerRoutes } from "../modules/Customer/customer.routes";

const router = Router();

const routes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/shop",
    route: shopRoute,
  },
  {
    path: "/product",
    route: productRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/customer",
    route: customerRoutes,
  },
];
routes.forEach((route) => {
  return router.use(route.path, route?.route);
});

export const primeCartRoutes = router;
