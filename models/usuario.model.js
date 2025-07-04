import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['Admin', 'Supervisor', 'Empleado'], // Puedes agregar otros si necesitas
    default: 'Empleado'
  }
}, { timestamps: true });

export default mongoose.model('Usuario', usuarioSchema);
