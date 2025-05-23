import { Router } from 'express';
import { UserController } from '../controllers/UserController';

export const userRoutes = Router();

/**
 * @swagger
 * /Users:
 *   get:
 *     
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
userRoutes.get('/', UserController.getAll);

/**
 * @swagger
 * /Users:
 *   post:
 *   
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Usuário criado
 */
userRoutes.post('/', UserController.create);