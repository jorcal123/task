const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongouri = "mongodb+srv://databasejc:erRooPddZZad1tPM@cluster0.h3pdr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    console.log('Iniciando conexión a MongoDB...');
    console.log('URI de conexión:', mongouri); // Para debuggear
    console.log('Variables de entorno disponibles:', Object.keys(process.env));
    console.log('MONGODB_URI:', mongouri ? 'Definida' : 'No definida');


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