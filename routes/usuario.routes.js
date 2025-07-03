import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorize from '../middlewares/authorize.js';
import {
  registrarUsuario,
  loginUsuario,
  obtenerUsuarios,
  cambiarRol
} from '../controllers/usuario.controller.js';

const router = express.Router();

router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);

// Nuevo endpoint para obtener solo el perfil autenticado
router.get('/perfil', authMiddleware, (req, res) => {
  res.json(req.user);
});

// Usuarios autenticados pueden ver lista completa
router.get('/', authMiddleware, obtenerUsuarios);

// Solo admins pueden cambiar roles
router.put('/:id/rol', authMiddleware, authorize('admin'), cambiarRol);

export default router;
