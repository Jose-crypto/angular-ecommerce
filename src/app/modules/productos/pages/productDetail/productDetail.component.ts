import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef,Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../../../shared/interfaces/product.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,FormsModule],
  template: `<div class="container mt-5">
  <!-- Verifica si el producto está disponible -->
  <div *ngIf="product; else loading" class="card">
    <div class="row no-gutters">
      <!-- Imagen del producto -->
      <div class="col-md-4">
        <img [src]="product.imagen" class="card-img" alt="{{ product.nombre }}">
      </div>
      <!-- Detalles del producto -->
      <div class="col-md-8">
        <div class="card-body">
          <!-- Nombre del producto -->
          <h3 class="card-title">{{ product.nombre }}</h3>

          <!-- Descripción del producto -->
          <p class="card-text">{{ product.descripcion }}</p>

          <!-- Precio -->
          <h4 class="text-success">{{ product.precio | currency }}</h4>

          <!-- Stock disponible -->
          <p><strong>Stock disponible:</strong> {{ product.stock }}</p>

          <!-- Categoría (por categoríaId, si la tienes definida en otro lugar, se puede convertir el id a nombre) -->
          <p><strong>Categoría ID:</strong> {{ product.categoriaId }}</p>

          <!-- Botón de acción (añadir al carrito o lo que necesites) -->
          <button class="btn btn-primary mt-4" >Añadir al carrito</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Template para mostrar cuando los datos están cargando -->
  <ng-template #loading>
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Cargando...</span>
      </div>
    </div>
  </ng-template>
</div>
`,
  styleUrl: './productDetail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent { 

  private router = inject(Router)
  private activatedRoute= inject(ActivatedRoute);
  private productoService = inject(ProductoService);  // Inyecta el servicio que maneja los productos
  
  product: Producto | undefined;

  private productId: string = '';
   cd= inject(ChangeDetectorRef)


  ngOnInit(){
    this.productId=this.activatedRoute.snapshot.params['id'];

    this.getProductDetail(this.productId);
  }




  // Método para obtener el producto según el ID
  getProductDetail(id: string): void {
    this.productoService.getProductById(id).subscribe((response) => {
      this.product = response;
      this.cd.markForCheck();
      console.log(response)  
    });
  }

}
