import { Router } from 'express';
import { CustomerController } from '../controllers/CustomerController';

export const customerRoutes = Router();

customerRoutes.get('/', CustomerController.getAll);
customerRoutes.post('/', CustomerController.create);
customerRoutes.put('/:id', CustomerController.update);
customerRoutes.delete('/:id', CustomerController.delete);


/**
 * @swagger
 * /Customers:
 *   get:
 *    
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
customerRoutes.get('/', CustomerController.getAll);

/**
 * @swagger
 * /Customers:
 *   post:
 *   
 *     tags: [Customers]
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
 *               documentNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 */
customerRoutes.post('/', CustomerController.create);

/**
 * @swagger
 * /Customers/{id}:
 *   put:
 *     
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *               documentNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 */
customerRoutes.put('/:id', CustomerController.update);

/**
 * @swagger
 * /Customers/{id}:
 *   delete:
 *    
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente deletado
 */
customerRoutes.delete('/:id', CustomerController.delete);
