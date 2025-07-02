import express from 'express';
import { crearProducto, obtenerProductos, modificarProducto, eliminarProducto } from '../controllers/product.controller.js';
import { verificarToken } from '../middlewares/auth.js';

const router = express.Router();

// Proteger todas las rutas
router.post('/', verificarToken, crearProducto);
router.get('/', verificarToken, obtenerProductos);
router.put('/:id', verificarToken, modificarProducto);
router.delete('/:id', verificarToken, eliminarProducto);

export default router;
