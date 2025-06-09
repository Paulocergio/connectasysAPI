




import { Router } from 'express';
import { SupplierController } from '../controllers/SupplierController';
export const supplierRoutes = Router();
const controller = new SupplierController();
supplierRoutes.get('/suppliers', (req, res) => controller.getAll(req, res));
supplierRoutes.post('/suppliers', (req, res) => controller.create(req, res));
supplierRoutes.put('/suppliers/:id', (req, res) => controller.update(req, res));
supplierRoutes.delete('/suppliers/:id', (req, res) => controller.delete(req, res));

/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: Endpoints de gerenciamento de fornecedores
 */

/**
 * @swagger
 * /suppliers:
 *   get:
 *     tags: [Suppliers]
 *     summary: Lista todos os fornecedores
 *     responses:
 *       200:
 *         description: Lista de fornecedores retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
supplierRoutes.get('/', (req, res) => controller.getAll(req, res));

/**
 * @swagger
 * /suppliers:
 *   post:
 *     tags: [Suppliers]
 *     summary: Cria um novo fornecedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyName
 *             properties:
 *               companyName:
 *                 type: string
 *               contactName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               country:
 *                 type: string
 *               taxId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fornecedor criado com sucesso
 */
supplierRoutes.post('/', (req, res) => controller.create(req, res));

/**
 * @swagger
 * /suppliers/{id}:
 *   put:
 *     tags: [Suppliers]
 *     summary: Atualiza um fornecedor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do fornecedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               contactName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               country:
 *                 type: string
 *               taxId:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Fornecedor atualizado com sucesso
 */
supplierRoutes.put('/:id', (req, res) => controller.update(req, res));

/**
 * @swagger
 * /suppliers/{id}:
 *   delete:
 *     tags: [Suppliers]
 *     summary: Exclui um fornecedor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do fornecedor
 *     responses:
 *       200:
 *         description: Fornecedor deletado com sucesso
 */
supplierRoutes.delete('/:id', (req, res) => controller.delete(req, res));
