import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../shared/interfaces/product.interface';
import { CarritoService } from './services/carrito.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule,FormsModule],
  template: `<div *ngIf="carrito.length > 0; else vacio">
  <h2>Carrito de compras</h2>
  <ul>
    <li *ngFor="let producto of carrito">
      <span>{{ '$' + producto.nombre }} - {{'$' + producto.precio }} * {{ producto.cantidad }}</span>
      <button (click)="eliminarProducto(producto.id)">Eliminar</button>
    </li>
  </ul>
  <h3>Total: {{ '$' + total }}</h3>
</div>

<ng-template #vacio>
  <p>El carrito está vacío.</p>
</ng-template>
`,
  styleUrl: './carrito.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarritoComponent { 
  carrito: Producto[] = [];
  total: number = 0;

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.carritoService.obtenerCarrito().subscribe(productos => {
      this.carrito = productos;
      this.total = this.carritoService.obtenerTotal();
      console.log(productos)
    });
  }

  eliminarProducto(id: number): void {
    this.carritoService.eliminarDelCarrito(id);
  }
}
