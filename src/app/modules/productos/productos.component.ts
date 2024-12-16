import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ProductoService } from './services/producto.service';
import { Producto } from '../../shared/interfaces/product.interface';
import { ProductsCardComponent } from './components/productsCard/productsCard.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [ProductsCardComponent,CommonModule],
  template: `<p>Listado de Productos</p>
    <div *ngFor="let producto of productos">
      <app-products-card [product]="producto"/>
    </div>
    
  `,
  styleUrl: './productos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductosComponent {
  productoService = inject(ProductoService);
  cd= inject(ChangeDetectorRef)

  productos: Producto[] = [];

  ngOnInit(){
    this.listProducts();
  }

  listProducts(){
    this.productoService.getProducts().subscribe(result =>{
      this.productos= result;
      console.log(this.productos)
      this.cd.markForCheck();
    })
  }

  
  
}
