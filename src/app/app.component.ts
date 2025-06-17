import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioColaboradorComponent } from "./components/formulario-colaborador/formulario-colaborador.component";
import { TablaColaboradoresComponent } from './components/tabla-colaboradores/tabla-colaboradores.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendarioComponent } from "./components/calendario/calendario.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-onboarding';
}
