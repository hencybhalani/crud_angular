import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { LoginComponent } from './components/login/login.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'employee-list',
    component: EmployeeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-employee',
    component: EmployeeFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employee/:id',
    component: EmployeeFormComponent,
    canActivate: [AuthGuard]
  }
];
