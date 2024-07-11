import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';
import { HttpService } from '../../http.service';
import { IEmployee } from '../../interfcaes/employee';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: IEmployee[] = [];
  router = inject(Router);
  toastr=inject(ToastrService);
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.httpService.getAllEmployee().subscribe({
      next: (result: IEmployee[]) => {
        this.employeeList = result;
        console.log(this.employeeList);
      },
     
    });
  }

  viewEmployee(employee: IEmployee) {
    console.log(employee);
  } 

  editEmployee(id: number|undefined) {
    console.log(id);
    this.router.navigateByUrl("/employee/" +id);
  }

  deleteEmployee(id: number|undefined) {
  this.httpService.deleteEmployee(id).subscribe(()=>{
    console.log("deleted");
    this.employeeList= this.employeeList.filter(x=> x.id!=id);
    this.toastr.error("user Delete Successfully");
  })
  }
}
