// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.model.js';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    // 👇 Este cambio es clave:
    req.usuario = {
      id: usuario._id,
      rol: usuario.rol,
      correo: usuario.correo
    };

    next();
  } catch (error) {
    res.status(403).json({ mensaje: 'Token inválido' });
  }
};

export default authMiddleware;