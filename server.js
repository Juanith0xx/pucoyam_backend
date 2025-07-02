// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/product.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/productos', productRoutes);
app.use('/api/usuarios', usuarioRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conectado a MongoDB');
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${process.env.PORT}`);
  });
})
.catch(err => console.error('❌ Error de conexión:', err));
