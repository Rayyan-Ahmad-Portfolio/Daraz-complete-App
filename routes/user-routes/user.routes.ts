import express from 'express';
import * as UserAuthController from '../../controller/user-folder/user.auth.controller';
import StoreRoutes from './store.routes';
import ProductRoutes from './product.routes';
import CartRoutes from './cart.routes';
import InventoryRoutes from './inventory.routes';

const router = express.Router();

router.post("/register", UserAuthController.register);
router.post("/login", UserAuthController.login);

router.use("/store", StoreRoutes);
router.use("/product", ProductRoutes);
router.use("/inventory", InventoryRoutes);
router.use("/cart", CartRoutes);
export default router;