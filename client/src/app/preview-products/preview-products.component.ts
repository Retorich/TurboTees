import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../product';
import { GetProductsService } from '../get-products.service';

@Component({
  selector: 'app-preview-products',
  template: `
    <h1>Products Preview</h1>
    <h3>No buy functionality - this page is just to test rendering</h3>
    <br />
    <div class="container">
      <button
        id="returnButton"
        type="button"
        class="btn btn-secondary"
        routerLink="/productsList"
      >
        Return to Product List
      </button>
    </div>
    <br />
    <hr />
    <div
      id="CardContainer"
      class="container d-flex flex-wrap justify-content-around"
    >
      <div
        id="flipCard"
        *ngFor="let product of products$ | async"
        class="flip-card d-flex flex-wrap"
      >
        <div class="flip-card-inner" id="cardDetail">
          <div class="flip-card-front" id="cardImage">
            <img
              class="cardImage"
              id="productImage"
              src="{{ product.image }}"
              alt="productImage"
            />
          </div>
          <div class="flip-card-back">
            <div>
              <h1 class="name" id="cardBackText1">{{ product.name }}</h1>
              <p class="price" id="cardBackText2">
                {{ product.price | currency }}
              </p>
              <button id="buyButton" class="btn btn-primary">Buy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./preview-products.component.css'],
})
export class PreviewProductsComponent implements OnInit {
  products$: Observable<Product[]> = new Observable();
  products: any;

  constructor(private productsService: GetProductsService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  private fetchProducts() {
    this.products$ = this.productsService.getProducts();
  }
}
