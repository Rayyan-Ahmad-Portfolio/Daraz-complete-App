import { Router } from "express";
import * as cartController from "../../controller/cart- controller/cart.controller";
import { authenticator } from "../../middleware/user-middlewares/auth.middleware";
import { authorizeUser } from "../../middleware/user-middlewares/rbac.middleware";

const router = Router();

router.get("/view", authenticator, authorizeUser(["Cart:view"]), cartController.getCart);
router.post("/add", authenticator,  authorizeUser(["Cart:create"]),cartController.addToCart);
router.put("/quantity", authenticator, authorizeUser(["Cart:update"]) ,cartController.updateQuantity);
router.delete("/remove", authenticator,  authorizeUser(["Cart:delete"]) ,cartController.removeItem);
router.delete("/clear", authenticator, authorizeUser(["Cart:delete"]) , cartController.clearCart);

export default router;
