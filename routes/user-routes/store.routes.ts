import express from "express";
import * as storeController from "../../controller/store-controller/store.controller";
import { authorizeUser } from "../../middleware/user-middlewares/rbac.middleware";


const router = express.Router();

router.post("/create", authorizeUser(["Store:create_store"]), storeController.createStore);
router.get("/view", authorizeUser(["Store:view_store"]), storeController.getStore);
router.put("/update/id", authorizeUser(["Store:update_store"]), storeController.updateStore);
router.delete("/delete/id", authorizeUser(["Store:delete_store"]), storeController.deleteStore);


export default router;