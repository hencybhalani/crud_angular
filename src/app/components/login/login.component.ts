import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../http.service';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { IEmployee } from '../../interfcaes/employee';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  builder = inject(FormBuilder);
  httpservice = inject(HttpService);
  router = inject(Router);
  authService = inject(AuthService);
  toastr=inject(ToastrService);

  isLogin: boolean = true;
  toggleForm(event: Event) {
    event.preventDefault();
    this.isLogin = !this.isLogin;
  }

  onSubmit() {          
    
    if (this.isLogin) {
      this.onLogin();
    } else {
      this.onSignUp();
    }
  }

  loginForm = this.builder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  signUpForm = this.builder.group({
    name: ['', Validators.required],
    department: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onLogin() {
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;

    this.httpservice.login(email, password).subscribe((result: any) => {
      console.log(result);
      this.authService.login(result.token);
      this.toastr.success("Login Successfully");
      this.router.navigateByUrl('/employee-list');
    });
  }
  onSignUp() {

    console.log(this.signUpForm.value);
    const employee: IEmployee = {
      name: this.signUpForm.value.name!,
      department: this.signUpForm.value.department!,
      email: this.signUpForm.value.email!,
      password: this.signUpForm.value.password!,
    };


    this.httpservice.createEmployee(employee).subscribe(
      (response:any) => {
        console.log("Sign up success:", response);
        this.toastr.success("User Signup Successfully");
        this.isLogin = true;
        
      },
      (error:any) => {
        this.toastr.success("User Signup Unsuccessfully");
        console.error("Sign up error:", error);
      }
    );
    
  }
}  

