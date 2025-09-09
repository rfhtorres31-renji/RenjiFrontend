import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({providedIn: 'root'})
export class ActionPlanService {

   private apiURL = 'http://localhost:5101/api';

   constructor(private http: HttpClient) {}

   retrieveActionPlan(): Observable<any>{
       const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })

      return this.http.get(this.apiURL + "/actionplan/get", {headers, observe: 'response'}); 

    }

   updateActionPlan(actionID: string, incidentReportID: string, body: object): Observable<any>{
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })

      return this.http.put(this.apiURL + `/actionplan/put?actionID=${actionID}&incidentReportID=${incidentReportID}`, body, {headers, observe: 'response'}); 
   }

   retrieveActionPlanKPI(): Observable<any>{
       const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })

      return this.http.get(this.apiURL + "/actionplan/get/kpi", {headers, observe: 'response'}); 
   }; 

  retrieveActionPlanChart(): Observable<any>{
       const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })

      return this.http.get(this.apiURL + "/actionplan/get/chart", {headers, observe: 'response'}); 
   }; 

}