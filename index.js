import express from 'express'; 
import cors from 'cors'; 
import bodyParser from 'body-parser';

// el middleware de autenticación
import { authentication } from './src/middlewares/authentication.js';

// la ruta para autenticarnos 
import authRouter from './src/routes/auth.routes.js';
import productsRoutes from './src/routes/products.routes.js';


const app = express(); 
const port = 3000;

app.use(cors()); 
// Configuración avanzada: Permitir dominios específicos 
const corsOptions = { 
    // Dominios permitidos 
    origin: ['https://example.com', 'https://entrega-final-4wclcemz9-afo18.vercel.app/'], 
    // Métodos HTTP permitidos 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    // Encabezados permitidos 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true // Permitir cookies o credenciales 
}; 
app.use(cors(corsOptions)); 

app.use(bodyParser.json()); 

// Routers 
app.use('/auth', authRouter); 
// protejo con autenticación la ruta de productos
app.use("/api", authentication, productsRoutes);



// Middleware para manejar errores 404 
app.use((req, res, next) => { 
    res.status(404).json({
        error: 'Recurso no encontrado o ruta inválida',
        message: 'La ruta que estás intentando acceder no existe en el servidor.'
    })
}); 



app.listen(port,()=>{console.log(`Servidor corriendo en http://localhost:${port}`)});

