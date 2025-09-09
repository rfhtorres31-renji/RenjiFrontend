import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { RegisterRequest, LoginRequest} from '../interfaces/auth';
import { NewReport } from "../interfaces/report";
import { ActionPlan } from "../interfaces/actionPlan";

// This enables the register.service.ts to be injected in components
@Injectable({providedIn: 'root'})
export class HttpService {
   
   private apiURL = 'http://localhost:5101/api';
    
   constructor(private http: HttpClient) {}


   registerUser(userData: RegisterRequest): Observable<any> {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })
      return this.http.post(this.apiURL + '/auth/register', userData, {headers, observe: 'response'}); // put observe: 'response' for full HTTP response

   }
  

   loginUser(userData: LoginRequest, rememberMe: boolean): Observable<any>{
      console.log(userData);
      const headers = new HttpHeaders({
            'Content-Type': 'application/json'
      })
      
      return this.http.post(this.apiURL + `/auth/login?rememberMe=${rememberMe}`, userData, {headers, observe: 'response'});
   }

   submitNewReport(report: NewReport): Observable<any>{
         const headers = new HttpHeaders({
               'Content-Type': 'application/json'
         })

         return this.http.post(this.apiURL + '/reports/post', report, {headers, observe: 'response'});
   }

   submitNewActionPlan(actionPlan: ActionPlan): Observable<any>{
         const headers = new HttpHeaders({
               'Content-Type': 'application/json'
         })

         return this.http.post(this.apiURL + '/actionplan/post', actionPlan, {headers, observe: 'response'});
   }





}
