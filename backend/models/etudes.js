import mongoose from "mongoose";    
const etudesSchema = new mongoose.Schema({
    les_diplomes: {
        type: String,
        required: true  
    },
    dernier_diplome_obtenu: {
        type: String,           
        required: true
    },
    annee_obtention: {  
        type: Date,
        required: true
    },
    candidatId: {   
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidat",
        required: true
    }
});
const Etudes = mongoose.model("Etudes", etudesSchema);
export default Etudes;
