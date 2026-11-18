import { getProducts } from "../models/products.models.js";


export async function getAllProductsService(category) {
    const products = await getProducts();

    if (category) {
        const filteredProducts =await products.filter(product => product.category === category);
        return filteredProducts;
    } else {
        return products;
    }
}

export const getProductByIdService =  async (id) => {
    const products = await getProducts();

    const product = await products.find(product => product.id === id);
    //console.log(`ID: ${id} producto: ${product.id}`);
    return product;
}