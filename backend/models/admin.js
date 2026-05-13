import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
    login: {
        type: String,                   
        required: true      
    },
    password: {
        type: String,       
        required: true,
        unique: true
    }

});
const admin = mongoose.model("Admin", adminSchema);
export default admin;
