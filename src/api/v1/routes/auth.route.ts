import { Router } from 'express';
import { makeValidator } from '../../../utils/validate';
import { loginValidator, registerValidator } from '../../../validations/user.validation';
import authController from '../controllers/auth/auth.controller';

const router = Router();

router.post('/register', makeValidator(registerValidator), authController.register);
router.post('/login', makeValidator(loginValidator), authController.login);

export default router;
