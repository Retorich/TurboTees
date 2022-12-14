import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../product';
import { GetProductsService } from '../get-products.service';
import { ShoppingCartService } from '../shoppingCart.service';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="container">
      <button
        id="viewCartButton"
        type="button"
        class="btn btn-secondary"
        routerLink="/cart"
      >
        View Cart
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
              <button
                id="buyButton"
                (click)="addToCart(product)"
                class="btn btn-primary"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  providers: [GetProductsService],
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  products$: Observable<Product[]> = new Observable();
  products: any;

  constructor(
    private productsService: GetProductsService,
    private cartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.fetchProducts();
  }

  private fetchProducts() {
    this.products$ = this.productsService.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('Item added to cart, Thanks !!');
  }
}
