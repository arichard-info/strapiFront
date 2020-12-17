import express from "express";
import routes from "@/router";
import middlewareData from "@/server/middlewares/data";
import middlewareRender from "@/server/middlewares/render";

const router = express.Router();

routes.forEach((route) => {
  router.get(route.path, middlewareData(route), middlewareRender(route));
});

export default router;
