import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopLogoComponent } from './shop-logo.component';

describe('ShopLogoComponent', () => {
  let component: ShopLogoComponent;
  let fixture: ComponentFixture<ShopLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopLogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
