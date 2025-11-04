import express from 'express';
import Authroutes from './admin-routes/adminAuth.routes';
import Userroutes from './user-routes/user.routes';

const router = express.Router();

router.use('/admin', Authroutes);
router.use('/user', Userroutes);


export default router;