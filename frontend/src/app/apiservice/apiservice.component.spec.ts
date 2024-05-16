import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiserviceComponent } from './apiservice.component';

describe('ApiserviceComponent', () => {
  let component: ApiserviceComponent;
  let fixture: ComponentFixture<ApiserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiserviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
