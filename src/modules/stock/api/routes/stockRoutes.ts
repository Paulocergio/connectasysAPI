import { Router } from 'express';
import { StockController } from '../controllers/StockController';

export const stockRoutes = Router();
const controller = new StockController();

/**
 * @swagger
 * /Stock/entries:
 *   post:
 *     tags: [Stock]
 *     summary: Registra uma entrada de estoque
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Entrada registrada
 */
stockRoutes.post('/entries', (req, res) => controller.createEntry(req, res));

/**
 * @swagger
 * /Stock/exits:
 *   post:
 *     tags: [Stock]
 *     summary: Registra uma saída de estoque
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Saída registrada
 */
stockRoutes.post('/exits', (req, res) => controller.createExit(req, res));

/**
 * @swagger
 * /Stock/balance:
 *   get:
 *     tags: [Stock]
 *     summary: Consulta o saldo atual de estoque por produto
 *     responses:
 *       200:
 *         description: Saldo atual por produto
 */
stockRoutes.get('/balance', (req, res) => controller.getBalance(req, res));
