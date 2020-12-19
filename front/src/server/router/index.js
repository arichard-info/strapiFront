import express from "express";
import sirv from "sirv";
import routerPage from "./routerPage";

const router = express.Router();

router.use("/client/", sirv("dist/client", { dev: true }));
router.use("/assets/", sirv("dist/assets", { dev: true }));
router.use("/*", routerPage);

export default router;
