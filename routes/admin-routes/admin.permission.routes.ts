import express from "express";
import { createPermission, getPermissions,updatePermission , deletePermission} from "../../controller/permission-controller/permission.controller";
import { authorize } from "../../middleware/admin-middlewares/rbac.middleware";
import { PERMISSIONS } from "../../utils/constants/admin.permission";

const router = express.Router();

router.post("/create", authorize(["create_permission"]),  createPermission);

router.get("/view", authorize(["view_permission"]), getPermissions);

router.put("/update/:id", authorize(["update_permission"]), updatePermission);

router.delete("/delete/:id", authorize(["delete_permission"]), deletePermission);

export default router;
