import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private apiUrl = 'http://localhost:8080/pedidos';

  constructor(private http: HttpClient) {}

  obtenerPedidosPorCliente(clienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${clienteId}`);
  }

  obtenerPedidoDetalle(clienteId: number, pedidoId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${clienteId}/${pedidoId}`);
  }
}
