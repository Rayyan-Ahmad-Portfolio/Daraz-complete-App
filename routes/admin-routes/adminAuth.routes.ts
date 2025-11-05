import express from "express";
import * as AuthController from "../../controller/admin-controller/admin.auth.controller";
import PermissionRoutes from "./admin.permission.routes";
import RoleRoutes from "./admin.role.routes";
import { authenticationToken } from "../../middleware/admin-middlewares/auth.middleware";
import { requestPasswordReset, resetPasswordWithOTP } from "../../controller/admin-controller/admin.auth.controller"


const router = express.Router();


router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPasswordWithOTP);

router.use(authenticationToken);
router.use("/permissions", PermissionRoutes);
router.use("/roles", RoleRoutes);

export default router;
