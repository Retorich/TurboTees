import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../product';
import { GetProductsService } from '../get-products.service';

@Component({
  selector: 'app-product-edit',
  template: `
    <h1>Amend Product Details</h1>
    <app-product-form
      [initialState]="product"
      (formSubmitted)="editProduct($event)"
    ></app-product-form>
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
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  product: BehaviorSubject<Product> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: GetProductsService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.productsService.getProduct(id!).subscribe((product) => {
      this.product.next(product);
    });
  }

  editProduct(product: Product) {
    this.productsService
      .editProduct(this.product.value._id || '', product)
      .subscribe({
        next: () => {
          this.router.navigate(['/productsList']);
        },
        error: (error) => {
          alert('Failed to update product');
          console.error(error);
        },
      });
  }
}
