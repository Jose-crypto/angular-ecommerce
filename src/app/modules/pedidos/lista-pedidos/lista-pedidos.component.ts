import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PedidosService } from '../services/pedidos.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedidos',
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
      <h2 class="text-center mb-4">Historial de Pedidos</h2>
      
      <div *ngIf="pedidos.length; else sinPedidos">
        <div class="list-group">
          <div *ngFor="let pedido of pedidos" class="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>Pedido ID:</strong> {{ pedido.pedidoId }} <br>
              <strong>Fecha:</strong> {{ pedido.fecha }} <br>
              <strong>Estado:</strong> {{ pedido.estado }} <br>
              <strong>Producto:</strong> {{ obtenerNombrePrimerProducto(pedido) }}
            </div>
            <button (click)="verDetalles(pedido.pedidoId)" class="btn btn-primary btn-sm">Ver Detalles</button>
          </div>
        </div>
      </div>

      <ng-template #sinPedidos>
        <p class="text-center text-muted">No se encontraron pedidos.</p>
      </ng-template>
    </div>
  `,
  styleUrl: 'lista-pedidos.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ListaPedidosComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private pedidosService: PedidosService, private router: Router) {}

  ngOnInit(): void {
    const clienteId = 1; // Cambia esto al ID del cliente autenticado
    this.pedidosService.obtenerPedidosPorCliente(clienteId).subscribe(
      (data) => {
        this.pedidos = data;
        console.log(data); // Verifica que se estén recibiendo los datos correctos
      },
      (error) => {
        console.error('Error al obtener los pedidos:', error);
      }
    );
  }

  obtenerNombrePrimerProducto(pedido: any): string {
    const primerDetalle = pedido.detalles[0];
    return primerDetalle ? `Producto ${primerDetalle.idProducto}` : 'Sin productos';
  }

  verDetalles(pedidoId: number): void {
    this.router.navigate(['/pedidos/detalle', pedidoId]);
  }
}
