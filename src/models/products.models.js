  import { db } from '../data/data.js'; 
  import { 
      collection, 
      getDocs, 
      getDoc, 
      addDoc, 
      deleteDoc, 
      doc 
  } from 'firebase/firestore';

export async function getProducts() {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
    } catch (error) {
        console.error("Error al obtener los productos desde Firestore:", error);
        throw error;
    }
}

export const getProductById = async (idDocumento) => {
  try {
    const docRef = doc(db,  "products", idDocumento);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error obteniendo el documento con ID ${idDocumento}:`, error);
    throw error;
  }
};


export const getProductsByCategory = async (valor) => {
  try {
    const q = query(collection(db, "products"), where("category", "==", valor));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error realizando la consulta en products:`, error);
    throw error;
  }
};

export const createProduct= async (product) => {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    return { id: docRef.id, ...product};
  } catch (error) {
    console.error(`Error creando el producto:`, error);
    throw error;
  }
}

export const deleteProduct = async (id) => {
  try {
    const docRef = doc(db, "products", id);
    const deleted= await deleteDoc(docRef);
    console.log(`Eliminando producto con ID: ${id} resulado: ${deleted}`);
    return deleted;
  } catch (error) {
    console.error(`Error eliminando el producto:`, error);
    throw error;
  }
}