import { Router } from 'express';
import { StockController } from '../controllers/stockcontroller';

export const stockRoutes = Router();
const controller = new StockController();

/**
 * @swagger
 * /Stock/products:
 *   get:
 *     tags: [Stock]
 
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
stockRoutes.get('/products', (req, res) => controller.getAllProducts(req, res));

/**
 * @swagger
 * /Stock/products:
 *   post:
 *     tags: [Stock]
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               barcode:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Produto cadastrado com sucesso
 */
stockRoutes.post('/products', (req, res) => controller.createProduct(req, res));

/**
 * @swagger
 * /Stock/products/{id}:
 *   put:
 *     tags: [Stock]
 *     summary: Atualiza um produto
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
 *               productName:
 *                 type: string
 *               barcode:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 */
stockRoutes.put('/products/:id', (req, res) => controller.updateProduct(req, res));




/**
 * @swagger
 * /Stock/products/{id}:
 *   delete:
 *     tags: [Stock]
 *     summary: Deleta um produto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 */
stockRoutes.delete('/products/:id', (req, res) => controller.deleteProduct(req, res));

