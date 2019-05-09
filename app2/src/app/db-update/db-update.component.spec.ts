import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbUpdateComponent } from './db-update.component';

describe('DbUpdateComponent', () => {
  let component: DbUpdateComponent;
  let fixture: ComponentFixture<DbUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
