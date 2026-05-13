import mongoose from "mongoose";
import multer from "multer";
const docSchema = new mongoose.Schema({
    candidatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidat",
        required: true
    },
    filename: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.toLowerCase().endsWith('.pdf');
            },
            message: 'Le nom du fichier doit se terminer par .pdf'
        }
    },
    filepath: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true,
        enum: ['application/pdf', 'image/jpeg', 'image/png'],
        message: 'Seuls les fichiers PDF, JPEG et PNG sont autorisés'
    },  
    size: {
        type: Number,
        required: true,
        max: [10 * 1024 * 1024, 'La taille du fichier ne doit pas dépasser 10MB']
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const Doc = mongoose.model("Doc", docSchema);
export default Doc;

