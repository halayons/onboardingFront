import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';

export interface EventoCalendario {
  id?: number;
  titulo: string;
  fechaInicio: string;
  fechaFin: string;
}

@Injectable({ providedIn: 'root' })
export class CalendarioService {
  private apiUrl = environment.host + environment.apiCalendarioUrl;

  constructor(private http: HttpClient) { }

  obtenerEventos(): Observable<EventoCalendario[]> {
    return this.http.get<EventoCalendario[]>(this.apiUrl);
  }

  agregarEvento(evento: EventoCalendario): Observable<EventoCalendario> {
    return this.http.post<EventoCalendario>(this.apiUrl, evento);
  }

  eliminarEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  actualizarEvento(id: number, evento: EventoCalendario): Observable<EventoCalendario> {
    return this.http.put<EventoCalendario>(`${this.apiUrl}/${id}`, evento);
  }
}