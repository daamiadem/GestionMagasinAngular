import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProvidersComponent } from './main-providers.component';

describe('MainProvidersComponent', () => {
  let component: MainProvidersComponent;
  let fixture: ComponentFixture<MainProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
