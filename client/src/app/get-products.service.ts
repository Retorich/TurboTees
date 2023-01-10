import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

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

  getProduct(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/products/${id}`);
  }

  addProduct(product: Product): Observable<string> {
    return this.httpClient.post(`${this.url}/products`, product, {
      responseType: 'text',
    });
  }

  editProduct(id: string, product: Product): Observable<string> {
    return this.httpClient.put(`${this.url}/products/${id}`, product, {
      responseType: 'text',
    });
  }

  removeProduct(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/products/${id}`, {
      responseType: 'text',
    });
  }
}
