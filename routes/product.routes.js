import express from 'express';
import { crearProducto, obtenerProductos, modificarProducto, eliminarProducto } from '../controllers/product.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { obtenerProductoPorId } from '../controllers/product.controller.js';

const router = express.Router();

// Proteger todas las rutas con authMiddleware
router.post('/', authMiddleware, crearProducto);
router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);
router.put('/:id', authMiddleware, modificarProducto);
router.delete('/:id', authMiddleware, eliminarProducto);

export default router;
