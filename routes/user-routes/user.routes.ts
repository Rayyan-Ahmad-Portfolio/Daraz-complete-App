import express from 'express';
import * as UserAuthController from '../../controller/user-folder/user.auth.controller';
import StoreRoutes from './store.routes';
import { authenticator } from "../../middleware/user-middlewares/auth.middleware";

const router = express.Router();

//Auth Routes
router.post("/register", UserAuthController.register);
router.post("/login", UserAuthController.login);

router.use(authenticator);
router.use("/store", StoreRoutes);

export default router;