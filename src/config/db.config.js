const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    //await mongoose.connect(process.env.MONGODB_URI, {
    const mongouri = process.env.MONGODB_URI //|| 'mongodb://localhost:27017/task-manager';
    if (!mongouri) {
      throw new Error('La URL de la base de datos no está definida');
    }
    await mongoose.connect(mongouri);
      /*useNewUrlParser: true,
      useUnifiedTopology: true
      */
    //});
    console.log('Conexión a MongoDB establecida');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;