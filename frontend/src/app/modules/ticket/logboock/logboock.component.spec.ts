import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogboockComponent } from './logboock.component';

describe('LogboockComponent', () => {
  let component: LogboockComponent;
  let fixture: ComponentFixture<LogboockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogboockComponent]
    });
    fixture = TestBed.createComponent(LogboockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
