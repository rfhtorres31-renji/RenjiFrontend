import { Routes } from '@angular/router';
import { Register } from './register/Register.1';
import { Login } from './login/login';
import { UserProfile } from './userprofile/user-profile';
import { Actionplan } from './actionplan/actionplan';
import { Actionplandashboard } from './actionplandashboard/actionplandashboard';
import { IncidentReport } from './incidentreport/incidentreport';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path:'register', component: Register},
    {path:'login', component: Login},
    {path:'dashboard', component: UserProfile},
    {path: 'actionplan', component: Actionplan},
    {path: 'actionplan-dashboard', component: Actionplandashboard},
    {path: 'incident-report', component: IncidentReport},
];
