const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const userSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
});

const User = mongoose.model("User", userSchema);

// CRUD
async function ejecutarCRUD() {
  try {
    // no duplicar datos
    await User.deleteMany({ nombre: "Melina" });

    console.log("\nCreate");
    const nuevo = await User.create({
      nombre: "Melina",
      apellido: "Rivera",
    });
    console.log(nuevo);

    console.log("\nRead");
    const usuarios = await User.find();
    console.log(usuarios);

    console.log("\nUpdate");
    const actualizado = await User.findOneAndUpdate(
      { nombre: "Melina" },
      { apellido: "Rivera Castillo" },
      { returnDocument: "after" } // corregido (sin warning)
    );
    console.log(actualizado);

    console.log("\nDelete");
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