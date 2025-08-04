import { Router } from 'express';
import isAuth from '../../../middleware/auth.middleware';
import userController from '../controllers/user/user.controller';
import { makeValidator } from '../../../utils/validate';
import { userIdValidator } from '../../../validations/user.validation';

const router = Router();

router.get('/thirdParty', userController.getUsersFromThirdParty);
router.get('/', isAuth, userController.getUsers);
router.get('/:id', makeValidator(userIdValidator), userController.getUser);
router.delete('/:id', isAuth, userController.removeUser);

export default router;
