import jwt from 'jsonwebtoken'; 
import 'dotenv/config'; 


const secret_key = process.env.JWT_SECRET_KEY; 

// Función para generar un token JWT 
export const generateToken = (userData) => { 
    console.log('key', secret_key);
    const user = {id: userData.id, email: userData.email}; 
    const expiration = { expiresIn: '1h' }; 
    return jwt.sign(user, secret_key, expiration); 
} 