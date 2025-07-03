import Producto from '../models/product.model.js';

// Crear producto
export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener producto por ID (nuevo)
export const obtenerProductoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(400).json({ error: 'ID inválido o error al buscar producto' });
  }
};

// Modificar producto
export const modificarProducto = async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;

  try {
    const productoActualizado = await Producto.findByIdAndUpdate(id, datosActualizados, {
      new: true,
      runValidators: true,
    });

    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar producto
export const eliminarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const productoEliminado = await Producto.findByIdAndDelete(id);

    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto eliminado correctamente', producto: productoEliminado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
