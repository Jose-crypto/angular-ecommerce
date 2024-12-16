import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../../../shared/interfaces/product.interface';
import { map } from 'rxjs/operators'; // Importar 'map' de 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/productos';
  //private baseUrl = 'https://fakestoreapi.com/products';

  constructor() {}

    getProducts(): Observable<Producto[]> {
      return this.http.get<Producto[]>(this.baseUrl);
    }



    getProductById(id: string): Observable<Producto | undefined> {
      return this.http.get<Producto[]>(this.baseUrl).pipe(
        map((products: Producto[]) => 
          products.find((p) => p.id === Number(id))  // Compara correctamente id (string) con p.id (string)
        )
      );
    }
    


    // Actualizar un producto
    updateProduct(id: string, product: Producto): Observable<Producto> {
      const updateUrl = `${this.baseUrl}/${id}`;  
      return this.http.put<Producto>(updateUrl, product);  
    }
  
    // Eliminar un producto
    deleteProduct(id: string): Observable<void> {
      const deleteUrl = `${this.baseUrl}/${id}`; 
      return this.http.delete<void>(deleteUrl); 
    }

}
