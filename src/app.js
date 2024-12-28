require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.config');
const taskRoutes = require('./routes/task.routes');
const errorHandler = require('./middleware/error.middleware');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger');

const app = express();

// Conexión a la base de datos
connectDB();

// Middleware
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));app.use(express.json());

// Rutas
app.use('/api/tasks', taskRoutes);

// Documentación Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));



// Manejador de errores global
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});