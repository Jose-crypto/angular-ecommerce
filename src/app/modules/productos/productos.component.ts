import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ProductoService } from './services/producto.service';
import { Producto } from '../../shared/interfaces/product.interface';
import { ProductsCardComponent } from './components/productsCard/productsCard.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [ProductsCardComponent, CommonModule],
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
      <h2 class="text-center mb-4">Listado de Productos</h2>

      <div *ngIf="productos.length; else sinProductos" class="row row-cols-1 row-cols-md-3 g-4">
        <div *ngFor="let producto of productos" class="col">
          <app-products-card [product]="producto" class="card h-100"></app-products-card>
        </div>
      </div>

      <ng-template #sinProductos>
        <p class="text-center text-muted">No hay productos disponibles.</p>
      </ng-template>
    </div>
  `,
  styleUrls: ['./productos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductosComponent {
  productoService = inject(ProductoService);
  cd = inject(ChangeDetectorRef);

  productos: Producto[] = [];

  ngOnInit() {
    this.listProducts();
  }

  listProducts() {
    this.productoService.getProducts().subscribe((result) => {
      this.productos = result;
      console.log(this.productos);
      this.cd.markForCheck();
    });
  }
}
