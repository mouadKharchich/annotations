import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupformComponent } from './popupform.component';

describe('PopupformComponent', () => {
  let component: PopupformComponent;
  let fixture: ComponentFixture<PopupformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupformComponent]
    });
    fixture = TestBed.createComponent(PopupformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
