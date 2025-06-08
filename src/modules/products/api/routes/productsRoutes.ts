import { Router } from 'express';
import { ProductController } from '../controllers/productscontroller';

export const productsRoutes = Router();
const controller = new ProductController();

/**
 * @swagger
 * tags:
 *   name: Products
 * 
 */

/**
 * @swagger
 * /Products/products:
 *   get:
 *     tags: [Products]
 *     summary: Lista todos os produtos
 *     responses:
 *       200:
 *        
 */
productsRoutes.get('/products', (req, res) => controller.getAllProducts(req, res));

/**
 * @swagger
 * /Products/products:
 *   post:
 *     tags: [Products]
 *   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - barcode
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
productsRoutes.post('/products', (req, res) => controller.createProduct(req, res));

/**
 * @swagger
 * /Products/products/{id}:
 *   put:
 *     tags: [Products]
 *  
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
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
productsRoutes.put('/products/:id', (req, res) => controller.updateProduct(req, res));

/**
 * @swagger
 * /Products/products/{id}:
 *   delete:
 *     tags: [Products]
 * 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso
 */
productsRoutes.delete('/products/:id', (req, res) => controller.deleteProduct(req, res));
