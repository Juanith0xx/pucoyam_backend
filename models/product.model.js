import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  proveedor: { type: String, required: true },
  sku: {
    type: String,
    required: [true, 'El SKU es obligatorio'],
    unique: true,
    uppercase: true,
    trim: true,
    match: [/^[A-Z0-9\-]+$/, 'El SKU solo puede contener letras mayúsculas, números y guiones']
  },
  imagenUrl: {
    type: [String],
    default: [],
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Producto', productSchema);
