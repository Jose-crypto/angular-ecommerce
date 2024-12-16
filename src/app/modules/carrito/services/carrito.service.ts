import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private carrito: { producto: any; cantidad: number }[] = [];
  private readonly STORAGE_KEY = 'carrito';

  constructor() {
    this.cargarCarrito();
  }

  // Obtener el carrito completo
  obtenerCarrito() {
    return this.carrito;
  }

  // Agregar un producto al carrito
  agregarProducto(producto: any, cantidad: number = 1) {
    const productoExistente = this.carrito.find(
      (item) => item.producto.id === producto.id
    );

    if (productoExistente) {
      productoExistente.cantidad += cantidad;
    } else {
      this.carrito.push({ producto, cantidad });
    }
    this.guardarCarrito();
  }

  // Vaciar el carrito
  vaciarCarrito() {
    this.carrito = [];
    this.guardarCarrito();
  }

  eliminarProducto(idProducto: number) {
    const index = this.carrito.findIndex((item) => item.producto.id === idProducto);

    if (index !== -1) {
      this.carrito.splice(index, 1);
      this.guardarCarrito();
    } else {
      console.warn(`Producto con ID ${idProducto} no encontrado en el carrito.`);
    }
  }

  actualizarCantidad(idProducto: number, cambio: number) {
    const item = this.carrito.find((i) => i.producto.id === idProducto);
    if (item) {
      item.cantidad += cambio;
      if (item.cantidad <= 0) {
        this.eliminarProducto(idProducto); // Si la cantidad es 0, se elimina el producto
      }
    }
  }

  // Guardar el carrito en localStorage
  private guardarCarrito() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.carrito));
  }

  // Cargar el carrito desde localStorage
  private cargarCarrito() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        const parsedData = JSON.parse(data);
        // Validar que los datos cargados sean un array
        if (Array.isArray(parsedData)) {
          this.carrito = parsedData;
        } else {
          console.warn('Datos en localStorage no válidos, inicializando carrito vacío.');
          this.carrito = [];
        }
      } else {
        this.carrito = [];
      }
    } catch (error) {
      console.error('Error al cargar el carrito desde localStorage:', error);
      this.carrito = [];
    }
  }
  
}

/*
{
  "clienteId": id,
  "detalles": [
    {
      "idProducto": id,
      "cantidad": cantidad
    },
    ...
  ]
}
*/