import { FormularioColaboradorComponent } from './formulario-colaborador.component';
import { ColaboradorService } from '../../services/colaborador.service';
import { of } from 'rxjs';

describe('FormularioColaboradorComponent', () => {
  let component: FormularioColaboradorComponent;
  let mockColaboradorService: any;

  beforeEach(() => {
    mockColaboradorService = {
      crearColaborador: jasmine.createSpy('crearColaborador').and.returnValue(of({}))
    };
    component = new FormularioColaboradorComponent(mockColaboradorService);
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe emitir el evento guardar al llamar onSubmit', () => {
    spyOn(component.guardar, 'emit');
    component.colaborador = {
      nombre: 'Juan',
      email: 'juan@mail.com',
      fechaIngreso: '2024-01-01',
      onboardingGeneral: true,
      onboardingTecnico: false
    };
    component.onSubmit();
    expect(component.guardar.emit).toHaveBeenCalledWith(component.colaborador);
  });

  it('debe llamar al servicio y mostrar alerta al registrarColaborador', () => {
    spyOn(window, 'alert');
    component.colaborador = {
      nombre: 'Ana',
      email: 'ana@mail.com',
      fechaIngreso: '2024-01-01',
      onboardingGeneral: true,
      onboardingTecnico: true
    };
    component.registrarColaborador();
    expect(mockColaboradorService.crearColaborador).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Colaborador registrado correctamente');
  });
});