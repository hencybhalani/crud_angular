import { Component , OnInit} from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,EmployeeListComponent,RouterLink,EmployeeFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
  logout(): void {
    if (window.confirm('Are you sure you want to log out?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
