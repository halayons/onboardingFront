import { Component, OnInit } from '@angular/core';
import { Colaborador } from '../../models/colaborador';
import { ColaboradorService } from '../../services/colaborador.service';
import { CommonModule } from '@angular/common';
import { FormularioColaboradorComponent } from '../formulario-colaborador/formulario-colaborador.component';
import { FormsModule } from '@angular/forms';
import { FiltroOnboardingPipe } from '../../pipes/filtro-onboarding.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tabla-colaboradores',
  standalone: true,
  imports: [CommonModule, FormularioColaboradorComponent, FormsModule, FiltroOnboardingPipe, RouterLink],
  templateUrl: './tabla-colaboradores.component.html',
  styleUrl: './tabla-colaboradores.component.scss'
})
export class TablaColaboradoresComponent implements OnInit {
  colaboradores: Colaborador[] = [];
  editarModal = false;
  colaboradorSeleccionado: Colaborador | null = null;
  editandoCampo: { [key: number]: string } = {};
  valorTemporal: string = '';
  filtroTipoOnboarding: string = '';
  filtroValorOnboarding: string = '';

  constructor(private colaboradorService: ColaboradorService) { }

  ngOnInit(): void {
    this.colaboradorService.listarColaboradores().subscribe(data => {
      this.colaboradores = data.map(colaborador => ({
        ...colaborador,
        onboardingGeneral: (colaborador as any).onboardingGeneralStatus || false,
        onboardingTecnico: (colaborador as any).onboardingTecnicoStatus || false
      }));
    });
  }
  abrirEditarModal(colaborador: Colaborador) {
    this.colaboradorSeleccionado = { ...colaborador };
    this.editarModal = true;
  }
  cerrarEditarModal() {
    this.editarModal = false;
    this.colaboradorSeleccionado = null;
  }
  guardarCambios(colaboradorSeleccionado: Colaborador) {
    if (this.colaboradorSeleccionado && this.colaboradorSeleccionado.id) {
      const payload = {
        ...this.colaboradorSeleccionado,
        onboardingGeneralStatus: this.colaboradorSeleccionado.onboardingGeneral,
        onboardingTecnicoStatus: this.colaboradorSeleccionado.onboardingTecnico
      };
      this.colaboradorService.actualizarColaborador(this.colaboradorSeleccionado.id, payload).subscribe(() => {
        alert('Colaborador actualizado correctamente');
        this.ngOnInit();
        this.cerrarEditarModal();
      });
    }
  }

  eliminarColaborador(colaborador: Colaborador) {
    if (confirm('¿Estás seguro de que deseas eliminar este colaborador?')) {
      this.colaboradorService.eliminarColaborador(colaborador).subscribe(() => {
        alert('Colaborador eliminado correctamente');
        this.ngOnInit();
      });
    }
  }

  empezarEdicionCampo(colaborador: Colaborador, campo: keyof Colaborador) {
    if (colaborador.id !== undefined) {
      if (
        (campo === 'fechaIngreso' || campo === 'fechaOnboardingTecnico') &&
        (!colaborador[campo] || colaborador[campo] === null)
      ) {
        this.valorTemporal = '';
      } else {
        this.valorTemporal = String(colaborador[campo] ?? '');
      }
      this.editandoCampo[colaborador.id] = campo as string;
    }
  }

  guardarEdicionCampo(colaborador: Colaborador, campo: keyof Colaborador) {
    let nuevoValor: any = this.valorTemporal;

    if (campo === 'onboardingGeneral' || campo === 'onboardingTecnico') {
      nuevoValor = this.valorTemporal === 'true';
      if (nuevoValor === colaborador[campo]) {
        if (colaborador.id !== undefined) {
          this.editandoCampo[colaborador.id] = '';
        }
        return;
      }
    } else {
      if (String(nuevoValor) === String(colaborador[campo])) {
        if (colaborador.id !== undefined) {
          this.editandoCampo[colaborador.id] = '';
        }
        return;
      }
    }

    if (colaborador.id !== undefined) {
      const payload = {
        ...colaborador,
        [campo]: nuevoValor,
        onboardingGeneralStatus: campo === 'onboardingGeneral' ? nuevoValor : colaborador.onboardingGeneral,
        onboardingTecnicoStatus: campo === 'onboardingTecnico' ? nuevoValor : colaborador.onboardingTecnico
      };
      this.colaboradorService.actualizarColaborador(colaborador.id, payload).subscribe(() => {
        this.editandoCampo[colaborador.id!] = '';
        this.ngOnInit();
      });
    }
  }
}
