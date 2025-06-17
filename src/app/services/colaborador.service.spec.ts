import { TestBed } from '@angular/core/testing';
import { ColaboradorService } from './colaborador.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Colaborador } from '../models/colaborador';

describe('ColaboradorService', () => {
  let service: ColaboradorService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/api/colaboradores';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ColaboradorService]
    });
    service = TestBed.inject(ColaboradorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe listar colaboradores', () => {
    const mockColaboradores: Colaborador[] = [
      { id: 1, nombre: 'Juan', email: 'juan@mail.com', fechaIngreso: '2024-01-01', onboardingGeneral: true, onboardingTecnico: false }
    ];

    service.listarColaboradores().subscribe(colaboradores => {
      expect(colaboradores).toEqual(mockColaboradores);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockColaboradores);
  });

  it('debe crear un colaborador', () => {
    const nuevoColaborador: Colaborador = { nombre: 'Ana', email: 'ana@mail.com', fechaIngreso: '2024-01-01', onboardingGeneral: true, onboardingTecnico: true };

    service.crearColaborador(nuevoColaborador).subscribe(colaborador => {
      expect(colaborador).toEqual(nuevoColaborador);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(nuevoColaborador);
    req.flush(nuevoColaborador);
  });

  it('debe actualizar un colaborador', () => {
    const colaboradorActualizado: Colaborador = { id: 2, nombre: 'Luis', email: 'luis@mail.com', fechaIngreso: '2024-01-01', onboardingGeneral: false, onboardingTecnico: true };

    service.actualizarColaborador(colaboradorActualizado.id!, colaboradorActualizado).subscribe(colaborador => {
      expect(colaborador).toEqual(colaboradorActualizado);
    });

    const req = httpMock.expectOne(`${apiUrl}/${colaboradorActualizado.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(colaboradorActualizado);
    req.flush(colaboradorActualizado);
  });

  it('debe eliminar un colaborador', () => {
    const colaborador: Colaborador = { id: 3, nombre: 'Maria', email: 'maria@mail.com', fechaIngreso: '2024-01-01', onboardingGeneral: true, onboardingTecnico: false };

    service.eliminarColaborador(colaborador).subscribe(resp => {
      expect(resp).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/${colaborador.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});