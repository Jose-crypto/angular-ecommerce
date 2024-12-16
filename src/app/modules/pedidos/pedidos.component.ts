import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [],
  template: `<p>pedidos works!</p>`,
  styleUrl: './pedidos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PedidosComponent { }
