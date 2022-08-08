import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPreformerGridComponent } from './top-preformer-grid.component';

describe('TopPreformerGridComponent', () => {
  let component: TopPreformerGridComponent;
  let fixture: ComponentFixture<TopPreformerGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopPreformerGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopPreformerGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
