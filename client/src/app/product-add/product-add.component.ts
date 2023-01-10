import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../product';
import { GetProductsService } from '../get-products.service';

@Component({
  selector: 'app-product-add',
  template: `
    <h1>Add New Product</h1>
    <app-product-form (formSubmitted)="addProduct($event)"></app-product-form>
    <div class="cancelButtonBox">
      <button
        id="cancelButton"
        type="button"
        class="btn btn-danger"
        routerLink="/productsList"
      >
        Cancel
      </button>
    </div>
  `,
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent {
  constructor(
    private router: Router,
    private productsService: GetProductsService
  ) {}

  addProduct(product: Product) {
    this.productsService.addProduct(product).subscribe({
      next: () => {
        this.router.navigate(['/productsList']);
      },
      error: (error) => {
        alert('Failed to create product');
        console.error(error);
      },
    });
  }
}
