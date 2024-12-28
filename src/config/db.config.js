const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongouri = process.env.MONGODB_URI;
    console.log('URI de conexión:', mongouri); // Para debuggear
    
    if (!mongouri) {
      throw new Error('La URL de la base de datos no está definida');
    }
    
    await mongoose.connect(mongouri);
    console.log('Conexión a MongoDB establecida');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    console.error('Variables de entorno disponibles:', Object.keys(process.env)); // Para debuggear
    process.exit(1);
  }
};

module.exports = connectDB;