import express from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/usuario.controller.js';

const router = express.Router();

router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);

export default router;