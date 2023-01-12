import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../product';
import { GetProductsService } from '../get-products.service';

@Component({
  selector: 'app-product-list',
  template: `
    <ul>
      <div class="justify-content-around">
        <h1>Products List</h1>
        <br />
        <div class="newProductButton">
          <button
            id="newButton"
            class="btn btn-success"
            [routerLink]="['/new']"
          >
            Add a New Product
          </button>
          <button
            id="previewButton"
            type="button"
            class="btn btn-secondary"
            routerLink="/productsPreview"
          >
            Preview Products Page
          </button>
        </div>
        <li
          *ngFor="let product of products$ | async"
          class="container d-flex flex-wrap justify-content-around"
          id="productBox"
        >
          <img
            class="image"
            id="productImage"
            src="{{ product.image }}"
            alt="productImage"
          />
          <div id="productListText" class="ProductListText">
            <span>MongoDB ID :</span><span id="mongoID"> {{ product._id }}</span
            ><br />
            <span>Product Name :</span
            ><span id="productName">{{ product.name }}</span>
            <br />
            <span>Product Type :</span
            ><span id="productType"> {{ product.productType }}</span>
            <br />
            <span>Product Price :</span
            ><span id="productPrice"> {{ product.price }}</span>
          </div>
          <div class="ProductListButtons">
            <button
              id="editButton"
              class="btn btn-primary"
              [routerLink]="['edit/', product._id]"
            >
              Edit Details
            </button>
            <button
              id="removeButton"
              class="btn btn-danger"
              (click)="removeProduct(product._id || '')"
            >
              Remove Product
            </button>
          </div>
        </li>

        <br />
        <div class="newProductButton">
          <button id="newButton" class="btn btn-success" [routerLink]="['new']">
            Add a New Product
          </button>
          <button
            id="previewButton"
            type="button"
            class="btn btn-secondary"
            routerLink="/productsPreview"
          >
            Preview Products Page
          </button>
        </div>
      </div>
    </ul>
  `,
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> = new Observable();

  constructor(private productsService: GetProductsService) {}

  ngOnInit() {
    this.getProducts();
  }

  removeProduct(_id: string) {
    this.productsService.removeProduct(_id).subscribe({
      next: () => this.getProducts(),
    });
  }

  private getProducts() {
    this.products$ = this.productsService.getProducts();
  }
}
