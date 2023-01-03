import { Component } from '@angular/core';

import { ShoppingCartService } from './shoppingCart.service';

@Component({
  selector: 'app-root',
  template: ` <div class="container">
    <router-outlet></router-outlet>
  </div>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TurboTees';

  constructor(private cartService: ShoppingCartService) {}
}
