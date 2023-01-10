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
      <div>
        <span id="dollarSpan">$</span>
        <span id="cartText">{{ item.price | number : '1.2-2' }}</span>
      </div>
      <button id="removeButton" (click)="removeItem(i)" class="btn btn-danger">
        Remove
      </button>
      <hr />
    </div>
    <hr />
    <span>Cart Total (Items) = $</span
    ><span id="itemsTotal">{{ cartTotal | number : '1.2-2' }}</span
    ><br />
    <span>Tax = $</span
    ><span id="taxTotal">{{ cartTax | number : '1.2-2' }}</span
    ><br />
    <span>Shipping = $</span
    ><span id="shippingTotal">{{ shipping | number : '1.2-2' }}</span>
    <hr />
    <span>Total Charge (Items + Tax + Shipping) = $</span
    ><span id="cartTotal">
      {{ cartTotal + cartTax + shipping | number : '1.2-2' }}</span
    >
    <hr />
    <hr />
    <div class="container flex">
      <button
        id="clearCartButton"
        (click)="clearCart()"
        type="button"
        class="btn btn-danger"
      >
        Clear Cart
      </button>

      <button
        id="checkoutButton"
        (click)="noCheckout()"
        type="button"
        class="btn btn-primary"
      >
        Checkout
      </button>

      <button
        id="closeButton"
        type="button"
        class="btn btn-secondary"
        routerLink="/products"
      >
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
      window.alert('Cart cleared');
    } else {
      window.alert('Theres nothing in the cart');
    }
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.cartTotal = this.cartService.getCartTotal();
    this.cartTax = this.cartService.getTax();
    this.shipping = this.cartService.getShipping();
    window.alert('Product removed from cart');
  }

  noCheckout() {
    if (this.items.length === 0) {
      window.alert('Theres nothing in the cart');
    } else {
      window.alert('This isnt working at the moment');
    }
  }
}
