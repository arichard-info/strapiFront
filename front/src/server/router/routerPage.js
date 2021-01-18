import express from "express";
import routes from "@/router";
import middlewareData from "@/server/middlewares/data";
import middlewareRender from "@/server/middlewares/render";
import { preloadComponents } from "@/server/utils/preloadComponents";

const router = express.Router();

// Pre-load components server-side on init
// No need to load them on render
preloadComponents().then((registry) => {
  Object.entries(routes).map(([type, route]) => {
    const config = {
      type,
      blocks: registry.blocks,
      ...route,
      ...registry.routes[type],
    };
    router.get(route.path, middlewareData(config), middlewareRender(config));
  });
});

export default router;
