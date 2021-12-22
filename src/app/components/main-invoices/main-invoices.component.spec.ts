import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInvoicesComponent } from './main-invoices.component';

describe('MainInvoicesComponent', () => {
  let component: MainInvoicesComponent;
  let fixture: ComponentFixture<MainInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
