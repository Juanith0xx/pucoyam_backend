import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorize from '../middlewares/authorize.js';
import {
  registrarUsuario,
  loginUsuario,
  obtenerUsuarios,
  cambiarRol,
  obtenerPerfil // ✅ Importamos obtenerPerfil
} from '../controllers/usuario.controller.js';

const router = express.Router();

// Registro y login
router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);

// Perfil del usuario autenticado
router.get('/perfil', authMiddleware, obtenerPerfil);

// Obtener lista de usuarios (autenticado)
router.get('/', authMiddleware, obtenerUsuarios);

// Cambiar rol de usuario (solo Admin)
router.put('/:id/rol', authMiddleware, authorize('Admin'), cambiarRol);

export default router;
