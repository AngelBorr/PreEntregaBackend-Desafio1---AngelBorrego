//crear una clase ProductManager *
//crear desde un construcctor array product vacio * 
//cada producto debe tener las suguientes propiedades:
//title(nombre), description, price(precio), thumbnail(ruta img)
//code(codigo que no es id), stock. *
//crear metodo addProduct(agrega un prod al array), debe validar:
//que code(codigo propio del prod) no se repita y que todas las propiedades tengan 
//su valor. *
//cada prod debe tener un id creado automaticamente (random)
//crear metodo getProducts, devuelve el arreglo con todos los productos
//crear un metodo getProductById que busca prod por su id.
//validar (if) si existe o no y mostrar error por consola("not found")

class ProductManager {
    constructor() {
      this.products = [];
    }
    //retorna los prod
    getProducts() {
      return this.products;
    }
    //agrega los prod a products y muestra por consola el code existente
    addProduct({title, description, price, thumbnail, code, stock}) {
      if (this.products.some(product => product.code === code)) {
        let error = console.log(`El code ingresado ya existe en otro Producto: (${code})`);
        return error;
      }
      //llamado a metodo id
      const id = this.randomIdGenerator();
      const product = {id, title, description, price, thumbnail, code, stock};
      //validaciones de propiedades
      switch (product) {
        case (!product.id):
          console.log("No se pudo agregar el producto, falta su id");          
          break;
        case (!product.title):
          console.log("No se pudo agregar el producto, falta su titulo");          
          break;
        case (!product.description):
          console.log("No se pudo agregar el producto, falta su descripcion");          
          break;
        case (!product.price):
          console.log("No se pudo agregar el producto, falta su precio");          
          break;
        case (!product.thumbnail):
          console.log("No se pudo agregar el producto, falta una imagen");          
          break;
        case (!product.code):
          console.log("No se pudo agregar el producto, falta codigo producto");          
          break;
        case (!product.stock):
          console.log("No se pudo agregar el producto, falta agregar el stock");          
          break;
        default:
          console.log("No se pudo agregar el producto, comunicarse con Atencion al Cliente")
          break;
      }
      this.products.push(product);
      return product;
    }
    //busca un prod por su id
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (!product) {
        console.log(`No se ha encontrado Productos con este id:(${id}), verifique que los datos ingresados sean los correctos y vuelve a intentarlo`);
      }
      return product;
    }
    //generador de id random
    randomIdGenerator() {
      let id;
      do {
        id = Math.floor(Math.random() * 100000);
      } while (this.products.some(product => product.id === id));
      return id;
    }
  }
  
  const manager = new ProductManager();
  
  console.log(manager.getProducts());
  
  const product = manager.addProduct({
    title: "Remera",
    description: "Remera 100% algodon \n colores: Blanco, Negro, Azul y Amarillo \n Talles: XXL, XL, L, M y S",
    price: 1500,
    thumbnail: "Sin imagen",
    code: "R-123",
    stock: 30
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
    code: "R-123",
    stock: 30
    });
  } catch (error) {
    console.error(error);
  }
  
  console.log(manager.getProductById(product.id));
  try {
    manager.getProductById(200);
  } catch (error) {
    console.error(error);
  }