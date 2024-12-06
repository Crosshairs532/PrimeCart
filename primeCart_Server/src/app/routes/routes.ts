import { Router } from "express";
import { authRoutes } from "../modules/Auth/auth.routes";
import { userRoutes } from "../modules/User/user.routes";
import { shopRoute } from "../modules/Shop/shop.routes";

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
];
routes.forEach((route) => {
  return router.use(route.path, route?.route);
});

export const primeCartRoutes = router;
