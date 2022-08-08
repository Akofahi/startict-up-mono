import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupSubmitFormComponent } from './startup-submit-form.component';

describe('StartupSubmitFormComponent', () => {
  let component: StartupSubmitFormComponent;
  let fixture: ComponentFixture<StartupSubmitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartupSubmitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupSubmitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
