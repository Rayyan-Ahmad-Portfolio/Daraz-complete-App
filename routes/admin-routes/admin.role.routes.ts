import express from "express";
import {createRole , getAllRoles } from "../../controller/role-controller/role.controller";
import { authorize } from "../../middleware/rbac.middleware";

const router = express.Router();

router.post("/create", authorize(["create_roles"]), createRole);
router.get("/view", authorize(["view_roles"]), getAllRoles);

export default router;
