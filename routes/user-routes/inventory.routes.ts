import { Router } from "express";
import * as inventoryController from "../../controller/inventory-controller/inventory.controller"
import { authenticator } from "../../middleware/user-middlewares/auth.middleware";
import { authorizeUser } from "../../middleware/user-middlewares/rbac.middleware";

const router = Router();


router.post("/create", authorizeUser(["Inventory:create"]), inventoryController.createInventory);
router.get("/view", authorizeUser(["Inventory:view"]), inventoryController.getAllInventories);
router.get("/view", authorizeUser(["Inventory:view"]), inventoryController.getInventoryById);
router.put("/update/id", authorizeUser(["Inventory:update"]), inventoryController.updateInventory);
router.delete("/delete/id", authorizeUser(["Inventory:delete"]), inventoryController.deleteInventory);

export default router;
