import express from 'express';
import {
  crearProducto,
  crearProductoConImagenes,
  obtenerProductos,
  obtenerProductoPorId,
  modificarProducto,
  eliminarProducto
} from '../controllers/product.controller.js';

import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.middleware.js';
import permitirRoles from '../middlewares/rolMiddleware.js';

const router = express.Router();

// Crear producto con múltiples imágenes (solo Admin o Supervisor)
router.post(
  '/crear-con-imagenes',
  authMiddleware,
  permitirRoles('Admin', 'Supervisor'),
  upload.array('imagenes', 10),
  crearProductoConImagenes
);

// Crear producto sin imagen (JSON)
router.post('/', authMiddleware, crearProducto);

// Rutas públicas
router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);

// Modificar y eliminar
router.put('/:id', authMiddleware, modificarProducto);
router.delete('/:id', authMiddleware, eliminarProducto);

export default router;
