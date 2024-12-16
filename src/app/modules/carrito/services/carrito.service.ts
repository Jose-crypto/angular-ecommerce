import { Injectable } from '@angular/core';
import { Producto } from '../../../shared/interfaces/product.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: Producto[] = [];
  private carritoSubject: BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>(this.carrito);

  constructor() { }

   // Método para agregar un producto al carrito
   agregarAlCarrito(producto: Producto): void {
    const index = this.carrito.findIndex(item => item.id === producto.id);

    if (index === -1) {
      // Si el producto no está en el carrito, lo agregamos
      this.carrito.push({...producto, cantidad: 1});
    } else {
      // Si el producto ya está en el carrito, incrementamos la cantidad
      this.carrito[index].cantidad++;
    }
    this.carritoSubject.next(this.carrito);  // Actualizamos el observable

    console.log("CARRITO")
  }

  // Método para eliminar un producto del carrito
  eliminarDelCarrito(id: number): void {
    this.carrito = this.carrito.filter(item => item.id !== id);
    this.carritoSubject.next(this.carrito);
  }

  // Método para obtener los productos del carrito
  obtenerCarrito() {
    return this.carritoSubject.asObservable();
  }

  // Método para obtener el total del carrito
  obtenerTotal(): number {
    return this.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

}
