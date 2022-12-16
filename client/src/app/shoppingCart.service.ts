import { Product } from './product';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  items: Product[] = [];

  addToCart(product: Product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  getCartTotal(): any {
    let cartTotal = 0;
    for (let item of this.items) {
      let subTotal = item.price;
      cartTotal += subTotal;
    }
    return cartTotal;
  }

  getTax() {
    let cartTax = 0;
    for (let item of this.items) {
      let subTotal = item.price / 10;
      cartTax += subTotal;
    }
    return cartTax;
  }

  getShipping() {
    let shipping = 20;
    return shipping;
  }

  clearCart() {
    this.items = [];
    this.items;
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.items;
  }

  constructor() {}
}
