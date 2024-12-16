import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component,ChangeDetectorRef,inject } from '@angular/core';
import { ProductoService } from '../productos/services/producto.service';
import { Producto } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: ` <div class="home-container">
    <nav class="navbar">
      <div class="logo">Ecommerce</div>
      <ul class="nav-links">
        <li><a href="#">Productos</a></li>
        <li><a href="#">Carrito</a></li>
      </ul>
    </nav>

    <section class="featured-products">
      <h2>Bienvenido a tu Tienda Online</h2>
      <div class="products-grid">
        <div class="product-card" *ngFor="let product of products">
          <img [src]="product.imagen" alt="{{ product.imagen }}" />
          <h3>{{ product.nombre }}</h3>
          <span>{{ product.descripcion }}</span>
          <p class="price">{{ '$' + product.precio }}</p>
          <button class="btn-buy">Comprar</button>
        </div>
      </div>
    </section>
  </div>`,
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  
   productoService = inject(ProductoService);
   cd= inject(ChangeDetectorRef)
  
    products: Producto[] = [];
  
    ngOnInit(){
      this.listProducts();
    }
  
    listProducts(){
      this.productoService.getProducts().subscribe(result =>{
        this.products= result;
        console.log(this.products)
        this.cd.markForCheck();
      })
    }
}
