import express from "express";
import * as storeController from "../../controller/store-controller/store.controller";
import { authorize } from "../../middleware/rbac.middleware";

const router = express.Router();

router.post("/create", authorize(["create_store"]), storeController.createStore);
router.get("/view", authorize(["view_store"]), storeController.getStore);

export default router;