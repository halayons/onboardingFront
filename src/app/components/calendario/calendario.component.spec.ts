import { CalendarioComponent } from './calendario.component';
import { CalendarioService } from '../../services/calendario/calendario.service';
import { Router, NavigationEnd } from '@angular/router';
import { of, Subject } from 'rxjs';

describe('CalendarioComponent', () => {
  let component: CalendarioComponent;
  let mockCalendarioService: any;
  let mockRouter: any;
  let navigationEnd$: Subject<any>;

  beforeEach(() => {
    mockCalendarioService = {
      obtenerEventos: jasmine.createSpy('obtenerEventos'),
      agregarEvento: jasmine.createSpy('agregarEvento')
    };

    navigationEnd$ = new Subject();
    mockRouter = {
      url: '/calendario',
      events: navigationEnd$.asObservable()
    };

    component = new CalendarioComponent(
      {} as any,
      mockRouter,
      mockCalendarioService
    );
  });

  it('debe inicializar esVistaCompleta en true si la ruta es /calendario', () => {
    expect(component['esVistaCompleta']).toBeTrue();
  });

  it('debe actualizar esVistaCompleta al navegar', () => {
    mockRouter.url = '/otra';
    navigationEnd$.next({ urlAfterRedirects: '/otra' });
    expect(component['esVistaCompleta']).toBeFalse();

    navigationEnd$.next({ urlAfterRedirects: '/calendario' });
    expect(component['esVistaCompleta']).toBeTrue();
  });

  it('debe cargar eventos en ngOnInit', () => {
    const eventos = [
      { titulo: 'Evento 1', fechaInicio: '2024-01-01', fechaFin: '2024-01-02' }
    ];
    mockCalendarioService.obtenerEventos.and.returnValue(of(eventos));
    component.ngOnInit();
    expect(component.calendarOptions.events).toEqual([
      { title: 'Evento 1', start: '2024-01-01', end: '2024-01-02' }
    ]);
  });

  it('debe agregar un evento correctamente', () => {
    component.nuevoEvento = {
      titulo: 'Nuevo',
      fechaInicio: '2024-01-01',
      fechaFin: '2024-01-02',
      participantes: ''
    };
    mockCalendarioService.agregarEvento.and.returnValue(
      of({ titulo: 'Nuevo', fechaInicio: '2024-01-01', fechaFin: '2024-01-02' })
    );
    component.calendarOptions.events = [];
    component.agregarEvento();
    expect(component.calendarOptions.events).toEqual([
      { title: 'Nuevo', start: '2024-01-01', end: '2024-01-02' }
    ]);
    expect(component.nuevoEvento).toEqual({ titulo: '', fechaInicio: '', fechaFin: '', participantes: '' });
  });

  it('no debe agregar evento si faltan campos', () => {
    component.nuevoEvento = { titulo: '', fechaInicio: '', fechaFin: '', participantes: '' };
    component.calendarOptions.events = [];
    component.agregarEvento();
    expect(mockCalendarioService.agregarEvento).not.toHaveBeenCalled();
    expect(component.calendarOptions.events).toEqual([]);
  });
});