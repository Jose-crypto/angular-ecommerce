import { Component, OnInit } from '@angular/core';
import { CarritoService } from './services/carrito.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <nav class="navbar">
        <div class="logo">Ecommerce</div>
        <ul class="nav-links">
          <li><a href="/products">Productos</a></li>
          <li><a href="/carrito">Carrito</a></li>
          <li><a href="/pedidos">Pedidos</a></li>
        </ul>
      </nav>
    </div>

    <div class="container mt-4">
      <h2 class="text-center mb-4">Carrito de Compras</h2>

      <div *ngIf="carrito.length; else carritoVacio">
        <div *ngFor="let item of carrito" class="card mb-3">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <h4>{{ item.producto.nombre }}</h4>
              <p>Precio: {{ item.producto.precio | currency }}</p>
            </div>

            <div class="d-flex align-items-center">
              <!-- Controles para modificar la cantidad -->
              <button 
                (click)="reducirCantidad(item.producto.id)" 
                [disabled]="item.cantidad <= 1" 
                class="btn btn-danger btn-sm mx-1">
                -
              </button>
              <span class="mx-2">{{ item.cantidad }}</span>
              <button 
                (click)="aumentarCantidad(item.producto.id)" 
                class="btn btn-success btn-sm mx-1">
                +
              </button>

              <!-- Botón para eliminar -->
              <button 
                (click)="eliminarDelCarrito(item.producto.id)" 
                class="btn btn-outline-danger btn-sm mx-2">
                Eliminar
              </button>
            </div>
          </div>
        </div>

        <!-- Botón para confirmar compra -->
        <button 
          class="btn btn-primary btn-lg w-100" 
          (click)="confirmarCompra()" 
          [disabled]="!carrito.length">
          Confirmar Compra
        </button>
      </div>

      <ng-template #carritoVacio>
        <p class="text-center text-muted">El carrito está vacío.</p>
      </ng-template>
    </div>
  `,
  styleUrls: ['carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: { producto: any; cantidad: number }[] = [];
  clienteId: number = 1;

  constructor(private carritoService: CarritoService, private http: HttpClient) {}

  ngOnInit() {
    this.carrito = this.carritoService.obtenerCarrito();
  }

  eliminarDelCarrito(idProducto: number) {
    this.carritoService.eliminarProducto(idProducto);
    this.carrito = this.carritoService.obtenerCarrito(); // Actualiza la vista
  }

  confirmarCompra() {
    if (!this.carrito.length) {
      alert('El carrito está vacío. No se puede confirmar la compra.');
      return;
    }

    // Crear el objeto de la petición
    const pedido = {
      clienteId: this.clienteId,
      detalles: this.carrito.map((item) => ({
        idProducto: item.producto.id,
        cantidad: item.cantidad,
      })),
    };

    console.log('Enviando pedido al backend:', pedido);

    // Enviar la petición al backend
    this.http.post('http://localhost:8080/pedidos', pedido).subscribe(
      (respuesta) => {
        console.log('Pedido procesado con éxito:', respuesta);

        // Vaciar el carrito después de la compra
        this.carritoService.vaciarCarrito();
        this.carrito = this.carritoService.obtenerCarrito();

        alert('¡Compra confirmada! Gracias por tu pedido.');
      },
      (error) => {
        console.error('Error al procesar el pedido:', error);
        alert('Ocurrió un error al confirmar la compra. Inténtalo de nuevo.');
      }
    );
  }

  aumentarCantidad(idProducto: number) {
    this.carritoService.actualizarCantidad(idProducto, 1); // Incrementar en 1
    this.carrito = this.carritoService.obtenerCarrito();
  }

  reducirCantidad(idProducto: number) {
    this.carritoService.actualizarCantidad(idProducto, -1); // Reducir en 1
    this.carrito = this.carritoService.obtenerCarrito();
  }
}
