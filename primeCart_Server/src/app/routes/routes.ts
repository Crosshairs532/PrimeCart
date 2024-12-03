import { Router } from "express";

const router = Router();

const routes = [
  {
    path: "",
    route: "",
  },
];
routes.forEach((route) => {
  return router.use(route.path, route?.route);
});

export const primeCartRoutes = router;
