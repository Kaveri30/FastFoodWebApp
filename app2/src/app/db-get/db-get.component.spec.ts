import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbGetComponent } from './db-get.component';

describe('DbGetComponent', () => {
  let component: DbGetComponent;
  let fixture: ComponentFixture<DbGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
