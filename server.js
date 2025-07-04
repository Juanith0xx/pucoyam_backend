// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Rutas
import productRoutes from './routes/product.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api/productos', productRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Conexión a MongoDB y arranque del servidor
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conexión exitosa a MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('❌ Error al conectar con MongoDB:', err.message);
});
