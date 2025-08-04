import { Router } from 'express';
import isAuth from '../../../middleware/auth.middleware';
import user from '../controllers/user/user.controller';

const router = Router();

router.get('/', isAuth, user.getUsers);

export default router;
