import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.model.js';

// Roles permitidos definidos para validación
const rolesPermitidos = ['Admin', 'Supervisor', 'Empleado'];

// Registrar nuevo usuario
export const registrarUsuario = async (req, res) => {
  const { correo, password, rol } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const hash = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({
      correo,
      password: hash,
      rol: rolesPermitidos.includes(rol) ? rol : 'Empleado'
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Iniciar sesión
export const loginUsuario = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(401).json({ error: 'Correo o contraseña inválidos' });
    }

    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) {
      return res.status(401).json({ error: 'Correo o contraseña inválidos' });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        correo: usuario.correo,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener el perfil del usuario autenticado
export const obtenerPerfil = (req, res) => {
  const usuario = req.usuario;
  if (!usuario) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  res.json({
    id: usuario.id,
    correo: usuario.correo,
    rol: usuario.rol
  });
};

// Obtener todos los usuarios (solo admin)
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, '-password');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cambiar el rol de un usuario (solo admin)
export const cambiarRol = async (req, res) => {
  const { id } = req.params;
  const { nuevoRol } = req.body;

  if (!rolesPermitidos.includes(nuevoRol)) {
    return res.status(400).json({ error: 'Rol inválido' });
  }

  try {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    usuario.rol = nuevoRol;
    await usuario.save();

    res.json({ mensaje: `Rol actualizado a "${nuevoRol}"` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
