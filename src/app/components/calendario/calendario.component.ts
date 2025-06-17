import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { CalendarioService } from '../../services/calendario/calendario.service';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, RouterLink, FormsModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent {
  esVistaCompleta = false;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: []
  };
  nuevoEvento = {
    titulo: '',
    fechaInicio: '',
    fechaFin: '',
    participantes: ''
  };

  constructor(private http: HttpClient, private router: Router, private calendarioService: CalendarioService) {
    this.actualizarVistaCompleta(this.router.url);
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.actualizarVistaCompleta(event.urlAfterRedirects);
      });
  }

  private actualizarVistaCompleta(url: string) {
    this.esVistaCompleta = url.startsWith('/calendario');
  }

  ngOnInit() {
    this.calendarioService.obtenerEventos().subscribe(data => {
      this.calendarOptions.events = data.map(event => ({
        title: event.titulo,
        start: event.fechaInicio,
        end: event.fechaFin
      }));
    });
  }

  agregarEvento() {
    if (this.nuevoEvento.titulo && this.nuevoEvento.fechaInicio && this.nuevoEvento.fechaFin) {
      this.calendarioService.agregarEvento(this.nuevoEvento).subscribe(evento => {
        this.calendarOptions.events = [
          ...(this.calendarOptions.events as any[]),
          {
            title: evento.titulo,
            start: evento.fechaInicio,
            end: evento.fechaFin
          }
        ];
        this.nuevoEvento = { titulo: '', fechaInicio: '', fechaFin: '', participantes: '' };
      });
    }
  }
}
