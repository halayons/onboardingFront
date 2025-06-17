import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaborador } from '../models/colaborador';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {
  private apiUrl = environment.host + environment.apiColaboradorUrl;

  constructor(private http: HttpClient) { }

  listarColaboradores(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(this.apiUrl);
  }

  crearColaborador(colaborador: Colaborador): Observable<Colaborador> {
    return this.http.post<Colaborador>(this.apiUrl, colaborador);
  }

  actualizarColaborador(id: number, colaborador: Colaborador): Observable<Colaborador> {
    return this.http.put<Colaborador>(`${this.apiUrl}/${colaborador.id}`, colaborador);
  }

  eliminarColaborador(colaborador: Colaborador): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${colaborador.id}`);
  }
}
