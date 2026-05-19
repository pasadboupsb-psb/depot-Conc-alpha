import bcrypt from "bcrypt";
import admin from "./models/admin.js";
import connection from "./connectionobjet/connection.js";  
const test = async () => {  
    try {
        await connection();
        const hashedPassword = await bcrypt.hash("admin123", 10);
        const newAdmin = new admin({
            login: "admin",
            password: hashedPassword
        });
        await newAdmin.save();
        console.log("Admin user created successfully");
    }
    catch (error) {
        console.error("Error creating admin user:", error);
    }   
}
test();
        
