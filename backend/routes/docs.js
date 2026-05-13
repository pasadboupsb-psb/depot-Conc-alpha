import express from "express";
import multer from "multer";
import path from "path";
import Doc from "../models/doc.js";

const router = express.Router();

// Configuration de multer pour stocker les fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtre pour accepter seulement les PDFs
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Seuls les fichiers PDF sont autorisés"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB max par fichier
    }
});

// Route pour uploader plusieurs PDFs pour un candidat
router.post("/upload/:candidatId", upload.array("files", 10), async (req, res) => {
    try {
        const { candidatId } = req.params;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Aucun fichier uploadé" });
        }

        // Vérifier si le candidat existe
        const Candidat = (await import("../models/candidat.js")).default;
        const candidat = await Candidat.findById(candidatId);
        if (!candidat) {
            return res.status(404).json({ message: "Candidat non trouvé" });
        }

        const uploadedDocs = [];

        for (const file of req.files) {
            const newDoc = new Doc({
                candidatId: candidatId,
                filename: file.originalname,
                filepath: file.path,
                mimetype: file.mimetype,
                size: file.size
            });
            await newDoc.save();
            uploadedDocs.push(newDoc);
        }

        res.status(200).json({
            message: `${uploadedDocs.length} fichier(s) PDF uploadé(s) avec succès pour le candidat`,
            files: uploadedDocs
        });
    } catch (error) {
        console.error("Erreur lors de l'upload :", error);
        res.status(500).json({ message: "Erreur lors de l'upload des fichiers" });
    }
});

// Route pour récupérer les documents d'un candidat
router.get("/:candidatId", async (req, res) => {
    try {
        const { candidatId } = req.params;
        const docs = await Doc.find({ candidatId: candidatId });
        res.status(200).json(docs);
    } catch (error) {
        console.error("Erreur lors de la récupération des documents :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des documents" });
    }
});

export default router;