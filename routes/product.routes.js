import express from 'express';
import {
  crearProducto,
  crearProductoConImagen,
  obtenerProductos,
  obtenerProductoPorId,
  modificarProducto,
  eliminarProducto
} from '../controllers/product.controller.js';

import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();

// Crear producto con imagen (multipart/form-data)
router.post('/crear-con-imagen', authMiddleware, upload.single('imagen'), crearProductoConImagen);

// Crear producto sin imagen (JSON)
router.post('/', authMiddleware, crearProducto);

// Rutas públicas
router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);

// Modificar y eliminar
router.put('/:id', authMiddleware, modificarProducto);
router.delete('/:id', authMiddleware, eliminarProducto);

export default router;
