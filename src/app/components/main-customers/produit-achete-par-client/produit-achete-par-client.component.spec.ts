import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitAcheteParClientComponent } from './produit-achete-par-client.component';

describe('ProduitAcheteParClientComponent', () => {
  let component: ProduitAcheteParClientComponent;
  let fixture: ComponentFixture<ProduitAcheteParClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitAcheteParClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitAcheteParClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
