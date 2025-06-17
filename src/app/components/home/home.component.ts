import { Component } from '@angular/core';
import { CalendarioComponent } from '../calendario/calendario.component';
import { FormularioColaboradorComponent } from '../formulario-colaborador/formulario-colaborador.component';
import { TablaColaboradoresComponent } from '../tabla-colaboradores/tabla-colaboradores.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CalendarioComponent, FormularioColaboradorComponent, TablaColaboradoresComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
