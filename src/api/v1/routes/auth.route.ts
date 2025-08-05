import { Router } from 'express';
import { makeValidator } from '../../../utils/validate';
import { loginValidator, registerValidator } from '../../../validations/user.validation';
import authController from '../controllers/auth/auth.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: v1 - Auth
 *     description: Authentication related routes
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - v1 - Auth
 *     summary: Register a new user
 *     description: Registers a user with name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterBody'
 *     responses:
 *       201:
 *         description: 🎉 User registered successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "🎉 User registered successfully!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *          description: Email already registered or Validation Error
 *          content:
 *            application/json:
 *              schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ValidationError'
 *                 - type: object
 *                   properties:
 *                     status:
 *                       type: number
 *                       example: 400
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     error:
 *                       type: object
 *                       properties:
 *                         code:
 *                           type: string
 *                           example: USER_ALREADY_EXISTS
 *                         message:
 *                           type: string
 *                           example: ⚠️ Email is already registered
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
router.post('/register', makeValidator(registerValidator), authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and get JWT token
 *     tags: [v1 - Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginBody'
 *     responses:
 *       200:
 *         description: 🔓 Login successful!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "🔓 Login successful!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         $ref: '#/components/responses/ValidationErrorMissingEmail'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedInvalidCredentials'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/login', makeValidator(loginValidator), authController.login);

export default router;
