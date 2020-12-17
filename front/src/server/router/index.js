import express from "express";
import routerPage from "./routerPage";

const router = express.Router();

router.use("/*", routerPage);

export default router;
