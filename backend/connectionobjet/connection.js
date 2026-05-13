import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/concours");
    console.log("Connecté à MongoDB");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB :", error);
    throw error;
  }
};

export default connection;
