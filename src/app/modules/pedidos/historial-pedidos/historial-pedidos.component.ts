import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService } from '../services/pedidos.service';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-detalle-pedido',
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
      <h2 class="text-center mb-4">Detalle del Pedido</h2>
      
      <div *ngIf="pedido; else sinPedido">
        <div class="card">
          <div class="card-header">
            <strong>Pedido ID:</strong> {{ pedido.pedidoId }}
          </div>
          <div class="card-body">
            <p><strong>Fecha:</strong> {{ pedido.fecha }}</p>
            <p><strong>Estado:</strong> {{ pedido.estado }}</p>
            <p><strong>Total:</strong> {{ pedido.total | currency }}</p>
          </div>
        </div>

        <h3 class="mt-4">Detalles de los Productos</h3>
        <div class="list-group">
          <div *ngFor="let detalle of pedido.detalles" class="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>Producto ID:</strong> {{ detalle.idProducto }} <br>
              <strong>Cantidad:</strong> {{ detalle.cantidad }} <br>
              <strong>SubTotal:</strong> {{ detalle.subTotal | currency }}
            </div>
          </div>
        </div>
      </div>

      <ng-template #sinPedido>
        <p class="text-center text-muted">Pedido no encontrado.</p>
      </ng-template>
      
      <div class="mt-4 text-center">
        <button class="btn btn-secondary" (click)="volverAlHistorial()">Volver al Historial</button>
      </div>
    </div>
  `,
  styleUrls: ['historial-pedidos.component.css']
})
export class DetallePedidoComponent implements OnInit {
  pedido: any;

  constructor(
    private pedidosService: PedidosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const pedidoId = Number(this.route.snapshot.paramMap.get('pedidoId'));
    this.pedidosService.obtenerPedidoDetalle(1, pedidoId).subscribe(
      (data) => {
        this.pedido = data;
      },
      (error) => {
        console.error('Error al obtener el detalle del pedido:', error);
      }
    );
  }

  volverAlHistorial(): void {
    this.router.navigate(['/pedidos']);
  }
}
