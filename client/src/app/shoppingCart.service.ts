import { Product } from './product';
import { Injectable } from '@angular/core';

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
    this.items = []; //creates a new instance of the items array
    return this.items; // returns the new this.item array overwriting the old array within the service.
  }

  removeItem(index: number) {
    this.items.splice(index, 1); //Removes the item passed to the function on line 46, only removes that item.
    this.items; // returns the new this.item array overwriting the old array within the service.
  }

  constructor() {}
}
