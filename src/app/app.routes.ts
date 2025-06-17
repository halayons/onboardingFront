import { Routes } from '@angular/router';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { HomeComponent } from './components/home/home.component';
import { TablaColaboradoresComponent } from './components/tabla-colaboradores/tabla-colaboradores.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'calendario', component: CalendarioComponent, canActivate: [AuthGuard] },
    { path: 'colaboradores', component: TablaColaboradoresComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];
