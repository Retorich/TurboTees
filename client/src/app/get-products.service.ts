import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class GetProductsService {
  private url = 'http://localhost:5200';
  private products$: Subject<Product[]> = new Subject();

  constructor(private httpClient: HttpClient) {}

  private refreshProducts() {
    this.httpClient
      .get<Product[]>(`${this.url}/products`)
      .subscribe((products) => {
        this.products$.next(products);
      });
  }

  getProducts(): Subject<Product[]> {
    this.refreshProducts();
    return this.products$;
  }
}
