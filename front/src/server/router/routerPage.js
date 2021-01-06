import express from "express";
import routes from "@/router";
import middlewareData from "@/server/middlewares/data";
import middlewareRender from "@/server/middlewares/render";

const router = express.Router();

Object.entries(routes).map(([type, route]) => {
  const config = { ...route, type };
  router.get(route.path, middlewareData(config), middlewareRender(config));
});

export default router;
