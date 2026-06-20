// ============================================================
//  Carrito de Compras — Cola FIFO
//  Estructura: Queue (First In, First Out)
//  El primer producto añadido es el primero en procesarse.
// ============================================================

class CarritoFIFO {
  #queue = [];
  #counter = 0;

  // Añade un producto al FINAL de la cola — O(1)
  add(product) {
    if (!product?.name || product.price == null) {
      throw new Error("El producto debe tener 'name' y 'price'");
    }
    const item = {
      id: ++this.#counter,
      name: product.name,
      price: Number(product.price),
      qty: product.qty ?? 1,
      addedAt: new Date(),
    };
    this.#queue.push(item);
    console.log(`[+] Añadido al final → #${item.id} ${item.name} ($${item.price.toFixed(2)})`);
    return item;
  }

  // Elimina y devuelve el PRIMER producto de la cola — O(1)
  remove() {
    if (this.isEmpty()) {
      console.warn("[-] El carrito está vacío, nada que eliminar.");
      return null;
    }
    const item = this.#queue.shift();
    console.log(`[-] Eliminado del frente → #${item.id} ${item.name}`);
    return item;
  }

  // Elimina un producto específico por su id — O(n)
  removeById(id) {
    const index = this.#queue.findIndex((i) => i.id === id);
    if (index === -1) {
      console.warn(`[-] No se encontró ningún ítem con id=${id}`);
      return null;
    }
    const [item] = this.#queue.splice(index, 1);
    console.log(`[-] Eliminado por id → #${item.id} ${item.name}`);
    return item;
  }

  // Devuelve el primer ítem SIN eliminarlo — O(1)
  peek() {
    return this.#queue[0] ?? null;
  }

  // Vacía el carrito por completo
  clear() {
    this.#queue = [];
    console.log("[x] Carrito vaciado.");
  }

  // Devuelve una copia de todos los ítems en orden FIFO
  getItems() {
    return [...this.#queue];
  }

  // Cantidad total de productos (sumando qty)
  get count() {
    return this.#queue.reduce((sum, i) => sum + i.qty, 0);
  }

  // Total a pagar
  get total() {
    return this.#queue.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  isEmpty() {
    return this.#queue.length === 0;
  }

  // Resumen legible del estado actual
  summary() {
    if (this.isEmpty()) {
      console.log("=== Carrito vacío ===");
      return;
    }
    console.log("=== Carrito (orden FIFO) ===");
    this.#queue.forEach((item, idx) => {
      const tag = idx === 0 ? " ← primero en salir" : "";
      console.log(
        `  #${item.id} ${item.name.padEnd(15)} x${item.qty}  $${(item.price * item.qty).toFixed(2)}${tag}`
      );
    });
    console.log(`  ${"─".repeat(35)}`);
    console.log(`  Total: $${this.total.toFixed(2)}  |  Artículos: ${this.count}`);
    console.log("===========================");
  }
}


// ============================================================
//  Demo de uso
// ============================================================
const carrito = new CarritoFIFO();

// Añadir productos
const leche  = carrito.add({ name: "Leche",   price: 1.50 });
const pan    = carrito.add({ name: "Pan",     price: 1.20 });
const queso  = carrito.add({ name: "Queso",   price: 2.30, qty: 2 });
const cafe   = carrito.add({ name: "Café",    price: 3.00 });

carrito.summary();

// Ver el primero sin eliminarlo
console.log("\nPrimero en la cola:", carrito.peek()?.name);

// Eliminar el primero (FIFO: Leche fue la primera en entrar)
carrito.remove();

carrito.summary();

// Eliminar un ítem específico por id
carrito.removeById(cafe.id);

carrito.summary();

// Vaciar todo
carrito.clear();
carrito.summary();