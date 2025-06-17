import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaColaboradoresComponent } from './tabla-colaboradores.component';

describe('TablaColaboradoresComponent', () => {
  let component: TablaColaboradoresComponent;
  let fixture: ComponentFixture<TablaColaboradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaColaboradoresComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TablaColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
