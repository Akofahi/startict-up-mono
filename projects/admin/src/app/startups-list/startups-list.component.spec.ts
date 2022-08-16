import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupsListComponent } from './startups-list.component';

describe('StartupsListComponent', () => {
  let component: StartupsListComponent;
  let fixture: ComponentFixture<StartupsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartupsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
