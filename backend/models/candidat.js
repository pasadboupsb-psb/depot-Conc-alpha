import mongoose from "mongoose";
const candidatSchema = new mongoose.Schema({
    nom: {                  
        type: String,
        required: true
    },
    prenom: {   
        type: String,
        required: true
    },
    DateNaissance: {
        type: Date,
        required: true,         
        unique: true
    },
    lieuNaissance: {
        type: String, 
        required: true
    },
   sex: {
        type: String,
        required: true
    },
 adresse: {
        type: String,           
        required: true
    },
    nationalite: {
        type: String,
        required: true     
    },  
    cin: {
        type: String,
        required: true,    
        unique: true
    },
    email: {        
        type: String,
        required: true,
        unique: true
    },
    telephone: {
        type: String,
        required: true,
        unique: true
    },
    statut_dossier: {
        type: String,
        required: false
    },  
    date_inscription: {
        type: Date,
        default: Date.now           
    }
});
const Candidat = mongoose.model("Candidat", candidatSchema);
export default Candidat;