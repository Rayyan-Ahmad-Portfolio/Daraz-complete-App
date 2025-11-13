import express from "express";
import * as storeController from "../../controller/store-controller/store.controller";
import { authorizeUser } from "../../middleware/user-middlewares/rbac.middleware";


const router = express.Router();

router.post("/create", authorizeUser(["Store:create"]), storeController.createStore);
router.get("/view", authorizeUser(["Store:view"]), storeController.getStore);
router.put("/update/id", authorizeUser(["Store:update"]), storeController.updateStore);
router.delete("/delete/id", authorizeUser(["Store:delete"]), storeController.deleteStore);


export default router;