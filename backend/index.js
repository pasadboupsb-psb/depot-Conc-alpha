import express from "express";
import cors from "cors";
import connection from "./connectionobjet/connection.js";
import docsRouter from "./routes/docs.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques depuis le dossier uploads
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/docs", docsRouter);

// Connexion à MongoDB et démarrage du serveur
const startServer = async () => {
    try {
        await connection();
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur le port ${PORT}`);
        });
    } catch (error) {
        console.error("Erreur lors du démarrage du serveur :", error);
        process.exit(1);
    }
};

startServer();

export default app;