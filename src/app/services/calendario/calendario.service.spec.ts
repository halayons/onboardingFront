import { TestBed } from '@angular/core/testing';
import { CalendarioService, EventoCalendario } from './calendario.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CalendarioService', () => {
  let service: CalendarioService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/api/calendario';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CalendarioService]
    });
    service = TestBed.inject(CalendarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe obtener eventos', () => {
    const mockEventos: EventoCalendario[] = [
      { id: 1, titulo: 'Evento', fechaInicio: '2024-01-01', fechaFin: '2024-01-02' }
    ];

    service.obtenerEventos().subscribe(eventos => {
      expect(eventos).toEqual(mockEventos);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockEventos);
  });

  it('debe agregar un evento', () => {
    const nuevoEvento: EventoCalendario = { titulo: 'Nuevo', fechaInicio: '2024-01-01', fechaFin: '2024-01-02' };

    service.agregarEvento(nuevoEvento).subscribe(evento => {
      expect(evento).toEqual(nuevoEvento);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(nuevoEvento);
    req.flush(nuevoEvento);
  });

  it('debe eliminar un evento', () => {
    const id = 1;

    service.eliminarEvento(id).subscribe(resp => {
      expect(resp).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('debe actualizar un evento', () => {
    const id = 1;
    const eventoActualizado: EventoCalendario = { id, titulo: 'Editado', fechaInicio: '2024-01-01', fechaFin: '2024-01-02' };

    service.actualizarEvento(id, eventoActualizado).subscribe(evento => {
      expect(evento).toEqual(eventoActualizado);
    });

    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(eventoActualizado);
    req.flush(eventoActualizado);
  });
});