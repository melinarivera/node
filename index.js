const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

// Modelo
const userSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
});

const User = mongoose.model("User", userSchema);

// CRUD
async function ejecutarCRUD() {
  try {
    await User.deleteMany({ nombre: "Melina" });

    console.log("\ncreate");
    const nuevo = await User.create({
      nombre: "Melina",
      apellido: "Rivera",
    });
    console.log(nuevo);

    console.log("\nread");
    const usuarios = await User.find();
    console.log(usuarios);

    console.log("\nupdate");
    const actualizado = await User.findOneAndUpdate(
      { nombre: "Melina" },
      { apellido: "Rivera Castillo" },
      { new: true }
    );
    console.log(actualizado);

    console.log("\ndelete");
    const eliminado = await User.findOneAndDelete({
      nombre: "Melina",
    });
    console.log(eliminado);
  } catch (error) {
    console.error("Error en CRUD:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("\nConexión cerrada");
  }
}

// Conexión
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB conectado");
    await ejecutarCRUD();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

connectDB();