import { Router } from 'express';
import isAuth from '../../../middleware/auth.middleware';
import user from '../controllers/user/user.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: v2 get users
 */

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users - v2
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Users fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedMissingToken'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', isAuth, user.getUsers);

export default router;
