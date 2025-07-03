// middlewares/authorize.js

const authorize = (roles = []) => {
  // roles puede ser un string o un array de strings
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ mensaje: 'No autenticado' });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ mensaje: 'Acceso denegado' });
    }

    next();
  };
};

export default authorize;
