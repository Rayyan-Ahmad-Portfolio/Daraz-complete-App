import express from 'express';
import * as categoryController from '../../controller/category-controller/category.controller';
import { authorize } from "../../middleware/admin-middlewares/rbac.middleware";
import { authenticationToken } from '../../middleware/admin-middlewares/auth.middleware';
const router = express.Router();

router.post('/create', authenticationToken ,authorize(["create_category"]) ,categoryController.createCategory);
router.get('/view', authenticationToken , authorize(["view_category"]) ,categoryController.getAllCategories);
router.get('/view/:id', authenticationToken , authorize(["view_category"]) ,categoryController.getCategoryById);
router.put('/update/:id', authenticationToken , authorize(["update_category"]) ,categoryController.updateCategory);
router.delete('/delete/:id', authenticationToken , authorize(["delete_category"]) ,categoryController.deleteCategory);

export default router;