import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product'
import { GetProductsService } from '../get-products.service';

@Component({
  selector: 'app-product-card',
  template: `
  <div class="container d-flex flex-wrap justify-content-around">
   <div *ngFor="let product of products$ | async" class="flip-card d-flex flex-wrap" >
   <div class="flip-card-inner" id="cardDetail">
     <div class="flip-card-front" id="cardImage">
       <img class="cardImage" id= "productImage" src={{product.image}} alt= "productImage">
     </div>
     <div class="flip-card-back">
       <div>
       <h1 class="name" id="cardBackText1">{{product.name}}</h1>
       <p class="price" id="cardBackText2">{{product.price}}</p>
       <button (click)="addToCart()" class="btn btn-primary"> Add to cart </button>
       </div>
     </div>
   </div>
 </div>
</div>`,
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent implements OnInit {
  products$: Observable<Product[]> = new Observable();
 products: any

  constructor(private productsService: GetProductsService) { 
  }
  
  ngOnInit() {
    this.fetchProducts();
}

private fetchProducts() {
  this.products$ = this.productsService.getProducts();
  this.products = this.products$.subscribe((data ) => console.log(data))

}

addToCart() {
  //code to add to cart
}

}
