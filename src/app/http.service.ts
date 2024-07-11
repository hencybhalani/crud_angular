import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
import { IEmployee } from './interfcaes/employee';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = "http://localhost:5186";

  constructor(private http: HttpClient) { }

  getAllEmployee() {
    return this.http.get<IEmployee[]>(`${this.apiUrl}/api/Home/getstudentlist`);
  }
  createEmployee(employee:IEmployee):Observable<any> {
  return   this.http.post(`${this.apiUrl}/api/Home/`,employee);
  }
  getEmployee(id:number){
    return this.http.get<IEmployee[]>(`${this.apiUrl}/api/Home/`+id);
  }
  updateEmployee(employee:IEmployee,id:number){
    return this.http.put<IEmployee[]>(`${this.apiUrl}/api/Home/`+id,employee);
  }
  deleteEmployee(id:number|undefined){
    return this.http.delete(`${this.apiUrl}/api/Home/`+id);
  }
  login(email:string , password:string){
    return this.http.post<{token:string}>(`${this.apiUrl}/api/Auth/login`,{
      email:email,
      password:password,
    });
  }
  // signUp(employee:IEmployee){
  //   return   this.http.post(`${this.apiUrl}/api/Home/`,employee);
  //   }
}
 