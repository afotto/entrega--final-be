import { getAllProductsService, getProductByIdService } from "../services/products.service.js";

export async function getAllProducts(req, res) {

    const category = req.query.category;
    console.log('Categoría recibida:', category);

    try {
        if (category) {
            const products = await getAllProductsService(category);
            if (products.length > 0) {
                res.json({
                    messge: `Productos de la categoría ${category} obtenidos correctamente`,
                    data:products
                });
            } else {
                res.status(404).json({ error: `No se encontraron productos para la categoría ${category}` });
            }
        } else {
            const products = await getAllProductsService();
            res.json({
                messge: `Todos los productos obtenidos correctamnete`,
                data:products
            });
        }
    }
    catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: `Error al obtener los productos ${error}` });
    }

}


export async function getProductById(req, res) {
    const id = (req.params.id);
    if (id){
        try {
            const product = await getProductByIdService(id);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ error: 'Producto no encontrado' });
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Error al obtener el producto' });
        }

    } else {
        res.status(400).json({
            error:'Id es necesario',
            message: 'El id es necesario'
     })
    }
}
