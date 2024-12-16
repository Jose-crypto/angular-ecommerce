import { Routes } from "@angular/router";
import { ListaPedidosComponent } from "./lista-pedidos/lista-pedidos.component";
import { DetallePedidoComponent } from "./historial-pedidos/historial-pedidos.component";

export const routes: Routes=[
    { path: '', component: ListaPedidosComponent },
    { path: 'detalle/:pedidoId', component: DetallePedidoComponent },
]