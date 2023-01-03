import { Component } from '@angular/core';

import { ShoppingCartService } from '../shoppingCart.service';

@Component({
  selector: 'app-shopping-cart',
  template: ` <h1>Shopping Cart</h1>
    <hr />
    <div class="cart-item" *ngFor="let item of items; let i = index">
      <img
        class="itemImage"
        id="itemImage"
        src="{{ item.image }}"
        alt="itemImage"
      />
      <span id="cartTextTitle">{{ item.name }}</span
      ><br />
      <span id="cartText">{{ item.price | currency }}</span>

      <button (click)="removeItem(i)" class="btn btn-danger">Remove</button>
      <hr />
    </div>
    <hr />
    <span>Cart Total (Items) = {{ cartTotal | currency }}</span
    ><br />
    <span>Tax = {{ cartTax | currency }}</span
    ><br />
    <span>Shipping = {{ shipping | currency }}</span>
    <hr />
    <span
      >Total Charge (Items + Tax + Shipping) =
      {{ cartTotal + cartTax + shipping | currency }}</span
    >
    <hr />
    <hr />
    <div class="container flex">
      <button (click)="clearCart()" type="button" class="btn btn-danger">
        Clear Cart
      </button>

      <button (click)="noCheckout()" type="button" class="btn btn-primary">
        Checkout
      </button>

      <button type="button" class="btn btn-secondary" routerLink="/products">
        Close
      </button>
    </div>
    <hr />`,
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent {
  items: any = [];
  shipping: number = 0;
  cartTotal: number = 0;
  cartTax: number = 0;
  orderTotal: number = 0;

  constructor(private cartService: ShoppingCartService) {
    this.items = this.cartService.getItems();
    this.cartTotal = this.cartService.getCartTotal();
    this.cartTax = this.cartService.getTax();
    this.shipping = this.cartService.getShipping();
  }

  clearCart() {
    if (this.cartTotal !== 0) {
      this.cartService.clearCart();
      this.cartTotal = this.cartService.getCartTotal();
      this.cartTax = this.cartService.getTax();
      this.shipping = this.cartService.getShipping();
      this.items = [];
    } else {
      window.alert('Theres nothing in the cart');
    }
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.cartTotal = this.cartService.getCartTotal();
    this.cartTax = this.cartService.getTax();
    this.shipping = this.cartService.getShipping();
  }

  noCheckout() {
    if (this.items.length === 0) {
      window.alert('Theres nothing in the cart');
    } else {
      window.alert('This isnt working at the moment');
    }
  }
}
