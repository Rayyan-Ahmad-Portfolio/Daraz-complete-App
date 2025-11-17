import express from "express";
import * as prodectController from "../../controller/product-controller/product.controller";
import { authorizeUser } from "../../middleware/user-middlewares/rbac.middleware";
import {upload} from "../../middleware/file-upload-middleware/cloudinary.middleware";
import { authenticator } from "../../middleware/user-middlewares/auth.middleware";
const router = express.Router();
router.use(authenticator);

router.post("/create", authorizeUser(["Product:create"]), upload, prodectController.createProduct);
router.get("/view", authorizeUser(["Product:view"]), prodectController.getAllProducts);
router.put("/update/id", authorizeUser(["Product:update"]),upload, prodectController.updateProduct);
router.delete("/delete/id", authorizeUser(["Product:delete"]), prodectController.deleteProduct);


export default router;