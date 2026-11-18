import { createProductService, deleteProductService, getAllProductsService, getProductByIdService } from "../services/products.service.js";

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

export async function createProduct(req, res) {
    const product = req.body;
    console.log('Producto recibido:', product);

    // Aquí iría la lógica para crear el producto
    if (product) {
        try {
            // Llamar a la función del servicio para crear el producto
            const createdProduct = await createProductService(product);
            res.status(201).json({
                message: 'Producto creado correctamente',
                data: createdProduct
            });
        }
        catch (error) {
            res.status(500).json({
                error: 'Error al crear el producto',
                message: `Error al crear el producto: ${error}`
            })
        }
    }
    else {
        res.status(400).json({
            error: 'Datos del producto son necesarios',
            message: 'Se requiere un nuevo producto en el cuerpo de la solicitud'
        })
    }

}


export async function deleteProduct(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            // Aquí iría la lógica para eliminar el producto
            const deletedProduct = await deleteProductService(id);
            if (deletedProduct) {
                res.status(200).json({
                    message: 'Producto eliminado con éxito',
                    data: deletedProduct
                });
            } else {
                res.status(404).json({
                    error: 'Producto no encontrado',
                    message: `No se encontró un producto con el ID ${id}`
                });
            }
        }
        catch (error) {
            res.status(500).json({
                error: 'Error al eliminar el producto',
                message: `Error al eliminar el producto: ${error}`
            });
        }
    } else {
        res.status(400).json({
            error: 'ID del producto es necesario',
            message: 'Se requiere un ID de producto en la solicitud'
        });
    }

}