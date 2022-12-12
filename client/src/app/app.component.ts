import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-shop-logo></app-shop-logo>
            <app-product-card></app-product-card>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TurboTees';
}
