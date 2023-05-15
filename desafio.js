//crear una clase ProductManager *
//crear desde un construcctor array product vacio y this.path con ruta 
//de almacenaje de los productos* 
//cada producto debe tener las siguientes propiedades:
//title(nombre), description, price(precio), thumbnail(ruta img)
//code(codigo que no es id), stock. *
//crear metodo addProduct(agrega un prod al array), debe validar:
//que code(codigo propio del prod) no se repita y que todas las propiedades tengan 
//su valor. *
//cada prod debe tener un id creado automaticamente (random)
//crear metodo getProducts, devuelve el arreglo con todos los productos
//crear un metodo getProductById que busca prod por su id.
//validar (if) si existe o no y mostrar error por consola("not found")

const fs = require('fs')
class ProductManager {
    constructor() {
      this.products = [];
      this.path = "./productos.json"
    }

    //retorna los prod
    getProducts() {
      const getData = async () => {
        try {
          const data = await fs.promises.readFile(this.path, 'utf8');
          return data
        } catch (error) {
          throw new Error('Se producjo un error al imprimir los datos desde el Json')
        }
                
      }
      return getData()
    }
    //generador de id 
    async generateId() {
      await this.getProducts();
      if (this.products.length === 0) {
        console.log()
        return 1; 
      } else {
        const lastProduct = this.products[this.products.length-1];
        return lastProduct.id+1; 
      }
    }

    //agrega los prod a products y muestra por consola el code existente
    async addProduct({title, description, price, thumbnail, code, stock}) {
      if (this.products.some(product => product.code === code)) {
        let error = console.log(`El code ingresado ya existe en otro Producto: (${code})`);
        return error;
      }
      
      //validaciones de propiedades
      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice) || parsedPrice <= 0) {
        throw new Error("No se pudo agregar el producto, falta su precio y/o el formato no es el correcto. El precio debe ser un número positivo.");
      }

      if (typeof title !== "string" || title.trim() === "") {
        throw new Error("No se pudo agregar el producto, falta y/o existe producto con ese titulo");
      }

      if (typeof description !== "string" || description.trim() === "") {
        throw new Error("No se pudo agregar el producto, falta su descripcion");
      }

      if (typeof thumbnail !== "string" || thumbnail.trim() === "") {
        throw new Error("No se pudo agregar el producto, falta una imagen.");
      }

      if (typeof code !== "string" || code.trim() === "") {
        throw new Error("No se pudo agregar el producto, falta codigo producto.");
      }

      const parsedStock = parseInt(stock);
      if (isNaN(parsedStock) || parsedStock < 0) {
        throw new Error("El stock debe ser un número entero no negativo.");
      }      
      const newProduct = {
        id: await this.generateId(),
        title: title.trim(),
        description: description.trim(),
        price: parsedPrice,
        thumbnail: thumbnail.trim(),
        code: code.trim(),
        stock: parsedStock
      };
  
      this.products.push(newProduct);

      if(product){
        const addData = async () => {
        try {
          await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf8')
        } catch (error) {
          throw new Error('Se produjo un error al imprimir los datos desde el Json')
        }
        }
        return addData();
      }else{        
        console.log("No se pudo agregar el producto")      
      }

      return product;      
    }

    //modificar un producto
    async updateProduct(id, updates) {
      try {
        const productIndex = this.products.findIndex(product => product.id === id);
    
        if (productIndex === -1) {
          throw new Error(`No se encontró ningún producto con el ID ${id}.`);
        }
    
        this.products[productIndex] = {
          ...this.products[productIndex],
          ...updates
        };
    
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, id));
        console.log("Producto actualizado correctamente.");
        console.log("Producto actualizado:", this.products[productIndex]);
        return this.products[productIndex];
      } catch (error) {
        throw new Error(`Error al actualizar el producto: ${error.message}`);
      }
      
    }
    //busca un prod por su id
    async getProductById(id) {
      try {
        const data = await fs.promises.readFile(this.path, 'utf8');           
        const productJson = JSON.parse(data);
        const product = productJson.find((product) => product.id === id);
        if(!product){
          console.log(`No se ha encontrado Productos con este id:(${id}), verifique que los datos ingresados sean los correctos y vuelve a intentarlo`);
        }
        console.log(product);
        return product;
      } catch (error) {
          throw new Error('Se produjo un error al leer los datos desde el Json')
      }
    }
    
    //elimina un producto
    async deleteProduct(id) {
      try {
        const data = await fs.promises.readFile(this.path, 'utf8');
        const products = data ? JSON.parse(data) : [];
    
        const index = products.findIndex((product) => product.id === id);
        if (index !== -1) {
          products.splice(index, 1);
          await fs.promises.writeFile(this.path, JSON.stringify(products, null, id));
          console.log(`Producto con id ${id} eliminado exitosamente.`);

          console.log("Listado de productos actualizado:");
          products.forEach((product) => console.log(product));
        } else {
          console.log(`No se encontró ningún producto con id ${id}.`);
        }
      } catch (error) {
        console.error(`Error al eliminar el producto: ${error}`);
      }
    } 
    
    
  }
  
  const manager = new ProductManager();
  
  //crear un producto
  const product = manager.addProduct({
    title: "Remera",
    description: "Remera 100% algodon \n colores: Blanco, Negro, Azul y Amarillo \n Talles: XXL, XL, L, M y S",
    price: 1500,
    thumbnail: "Sin imagen",
    code: "R-123",
    stock: 20
  });

  const product2 = manager.addProduct({
    title: "Pantalon",
    description: "Pantalo de Gabardina \n colores: Blanco, Negro, Azul y Amarillo \n Talles: XXL, XL, L, M y S",
    price: 2500,
    thumbnail: "Sin imagen",
    code: "R-124",
    stock: 30
  });

  console.log(product);
  console.log(manager.getProducts());
  
  try {
    manager.addProduct({
      title: "Remera",
      description: "Remera 100% algodon \n colores: Blanco, Negro, Azul y Amarillo \n Talles: XXL, XL, L, M y S",
      price: 1500,
      thumbnail: "Sin imagen",
      code: "R-125",
      stock: 30
    });
  } catch (error) {
    console.error(error);
  }

  //utilizando getProductById
  console.log(manager.getProductById(product.id));
  try {
    manager.getProductById(2);
  } catch (error) {
    console.error(error);
  }

  // utilizando updateProduct  
  (async () => {
  try {
    await manager.getProducts();
    const updatedProduct = await manager.updateProduct(2, { price: 8500 });
    console.log("Producto actualizado:", updatedProduct);
  } catch (error) {
    console.error(error.message);
  }
})();

// utilizando deleteProduct
(async () => {
  try {
    await manager.getProducts();

    console.log("Lista de productos antes de eliminar:");
    console.log(manager.products);

    const deletedProduct = await manager.deleteProduct(1);
    
  } catch (error) {
    console.error(error.message);
  }
})();
