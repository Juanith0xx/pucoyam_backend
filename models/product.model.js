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
    uppercase: true, // <-- fuerza a guardar en mayúsculas
    trim: true,
    match: [/^[A-Z0-9\-]+$/, 'El SKU solo puede contener letras mayúsculas, números y guiones']
  }
}, {
  timestamps: true
});

export default mongoose.model('Producto', productSchema);