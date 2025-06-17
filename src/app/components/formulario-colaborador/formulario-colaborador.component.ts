import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Colaborador } from '../../models/colaborador';
import { ColaboradorService } from '../../services/colaborador.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-colaborador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-colaborador.component.html',
  styleUrl: './formulario-colaborador.component.scss'
})
export class FormularioColaboradorComponent {
  @Input() colaborador: Colaborador = {
    nombre: '',
    email: '',
    fechaIngreso: '',
    onboardingGeneral: false,
    onboardingTecnico: false,
  };
  @Input() modo: 'crear' | 'editar' = 'crear';
  @Output() guardar = new EventEmitter<Colaborador>();
  @Output() cancelar = new EventEmitter<void>();

  constructor(private colaboradorService: ColaboradorService) { }

  registrarColaborador() {
    const payload = {
      ...this.colaborador,
      onboardingGeneralStatus: this.colaborador.onboardingGeneral || false,
      onboardingTecnicoStatus: this.colaborador.onboardingTecnico || false
    };
    this.colaboradorService.crearColaborador(payload).subscribe(() => {
      alert('Colaborador registrado correctamente');
    });
  }

  onSubmit() {
    this.guardar.emit(this.colaborador);
  }
}