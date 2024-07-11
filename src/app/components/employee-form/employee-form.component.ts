import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { IEmployee } from '../../interfcaes/employee';
import e from 'express';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule,HttpClientModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  // Your component logic here
  httpservice = inject(HttpService);
  formbulider = inject(FormBuilder);
  router= inject(Router);
  routes = inject(ActivatedRoute);
  toastr=inject(ToastrService);
  
  employeeForm= this.formbulider.group({
    name:['',[Validators.required]],
    department:['',[Validators.required]],
    email:['',[Validators.required]],
    password:['',[Validators.required]]
  });
  id!:number;
  isEdit = false;
  ngOnInit(){
    this.id = this.routes.snapshot.params['id'];
    if(this.id){
      this.isEdit=true; 
      this.httpservice.getEmployee(this.id).subscribe((result: any) => {
        console.log(result);
        this.employeeForm.patchValue(result);
      })
    }
  }
  onSubmit(){
    console.log(this.employeeForm.value);
    const employee: IEmployee = {
      name: this.employeeForm.value.name!,
      department: this.employeeForm.value.department!,
      email: this.employeeForm.value.email!,
      password: this.employeeForm.value.password!,
    };
    if(this.isEdit){
      this.httpservice.updateEmployee(employee,this.id).subscribe(()=>{
        console.log("success");
        this.toastr.success("user Updated Successfully");
        this.router.navigateByUrl("/employee-list");
      });
    }else{
      this.httpservice.createEmployee(employee).subscribe(()=>{
        console.log("success");
        this.toastr.success("user Added Successfully");
        this.router.navigateByUrl("/employee-list");
      });
    }
    

    
  }
}
