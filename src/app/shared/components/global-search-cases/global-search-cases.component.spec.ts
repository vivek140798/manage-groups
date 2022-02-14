import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSearchCasesComponent } from './global-search-cases.component';

describe('GlobalSearchCasesComponent', () => {
  let component: GlobalSearchCasesComponent;
  let fixture: ComponentFixture<GlobalSearchCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalSearchCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSearchCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
