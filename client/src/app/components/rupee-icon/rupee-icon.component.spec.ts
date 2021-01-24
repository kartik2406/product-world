import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RupeeIconComponent } from './rupee-icon.component';

describe('RupeeIconComponent', () => {
  let component: RupeeIconComponent;
  let fixture: ComponentFixture<RupeeIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RupeeIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RupeeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
