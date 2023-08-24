import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionQueryComponent } from './solution-query.component';

describe('SolutionQueryComponent', () => {
  let component: SolutionQueryComponent;
  let fixture: ComponentFixture<SolutionQueryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolutionQueryComponent]
    });
    fixture = TestBed.createComponent(SolutionQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
