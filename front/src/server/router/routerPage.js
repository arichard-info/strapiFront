import express from "express";
import routes from "@/router";
import middlewareStructure from "@/server/middlewares/structure";
import middlewareRender from "@/server/middlewares/render";

const router = express.Router();

Object.entries(routes).map(([type, route]) => {
  const config = { ...route, type };
  router.get(route.path, middlewareStructure(config), middlewareRender(config));
});

export default router;
