import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../product';

@Component({
  selector: 'app-product-form',
  template: `
    <form
      class="product-form"
      autocomplete="off"
      [formGroup]="productForm"
      (ngSubmit)="submitForm()"
    >
      <div class="form-floating">
        <input
          class="form-control"
          type="text"
          id="name"
          formControlName="name"
          placeholder="name"
          required
        />
        <label for="name">Name</label>
      </div>
      <div
        *ngIf="name.invalid && (name.dirty || name.touched)"
        class="alert alert-danger"
      >
        <div *ngIf="name.errors?.['required']">Name is required.</div>
      </div>

      <div class="form-floating">
        <input
          id="image"
          class="form-control"
          type="text"
          formControlName="image"
          placeholder="image"
          required
        />
        <label for="image">Product Image Location</label>
      </div>
      <div
        *ngIf="image.invalid && (image.dirty || image.touched)"
        class="alert alert-danger"
      >
        <div *ngIf="image.errors?.['required']">
          Image Location is required.
        </div>
      </div>

      <div class="form-floating">
        <input
          class="form-control"
          type="text"
          id="productType"
          formControlName="productType"
          placeholder="productType"
          required
        />
        <label for="productType">Product Type</label>
      </div>
      <div
        *ngIf="
          productType.invalid && (productType.dirty || productType.touched)
        "
        class="alert alert-danger"
      >
        <div *ngIf="productType.errors?.['required']">
          Product Type is required.
        </div>
      </div>

      <div class="form-floating">
        <input
          class="form-control"
          type="number"
          id="price"
          formControlName="price"
          placeholder="price"
          required
        />
        <label for="price">Price</label>
      </div>
      <div
        *ngIf="price.invalid && (price.dirty || price.touched)"
        class="alert alert-danger"
      >
        <div *ngIf="price.errors?.['required']">Price is required.</div>
      </div>

      <div class="addButtonBox">
        <button
          id="addNewButton"
          class="btn btn-primary"
          type="submit"
          [disabled]="productForm.invalid"
        >
          Add
        </button>
      </div>
    </form>
  `,
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  @Input()
  initialState: BehaviorSubject<Product> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Product>();

  @Output()
  formSubmitted = new EventEmitter<Product>();

  productForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  get name() {
    return this.productForm.get('name')!;
  }
  get image() {
    return this.productForm.get('image')!;
  }
  get productType() {
    return this.productForm.get('productType')!;
  }
  get price() {
    return this.productForm.get('price')!;
  }

  ngOnInit() {
    this.initialState.subscribe((product) => {
      this.productForm = this.fb.group({
        name: [product.name, [Validators.required]],
        image: [product.image, [Validators.required]],
        productType: [product.productType, [Validators.required]],
        price: [product.price, [Validators.required]],
      });
    });

    this.productForm.valueChanges.subscribe((val) => {
      this.formValuesChanged.emit(val);
    });
  }

  submitForm() {
    this.formSubmitted.emit(this.productForm.value);
  }
}
