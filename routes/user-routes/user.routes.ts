import express from 'express';
import * as UserAuthController from '../../controller/user-folder/user.auth.controller';

const router = express.Router();

//Auth Routes
router.post("/register", UserAuthController.register);
router.post("/login", UserAuthController.login);

export default router;