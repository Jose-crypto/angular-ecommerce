import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; // Módulo para tarjetas
import { MatButtonModule } from '@angular/material/button'; // Módulo para botones
import { Producto } from '../../../../shared/interfaces/product.interface';
import { CarritoService } from '../../../carrito/services/carrito.service';

@Component({
  selector: 'app-products-card',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  template: `<mat-card class="product-card">
  <mat-card-header>
    <mat-card-title>{{ product.nombre }}</mat-card-title>
    <mat-card-subtitle>Precio: {{product.precio }}</mat-card-subtitle>
  </mat-card-header>
  
  <mat-card-content>
    <p>{{ product.descripcion }}</p>
    <img [src]="product.imagen" alt="{{ product.nombre }}" style="width: 20%; height: auto;"/>
  </mat-card-content>
  
  <mat-card-actions>
    <button mat-button (click)="agregarAlCarrito()">Agregar al Carrito</button>
  </mat-card-actions>
</mat-card>
`,
  styleUrl: './productsCard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsCardComponent { 

  @Input() product!: Producto;

  constructor(private carritoService: CarritoService) { }

  agregarAlCarrito(): void {
    this.carritoService.agregarAlCarrito(this.product);
    console.log(this.product)
  }

}
