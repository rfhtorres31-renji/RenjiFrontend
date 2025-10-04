import { Component } from '@angular/core';
import { NavMenu } from '../shared/nav-menu/nav-menu';
import { NgxSpinnerService, NgxSpinnerModule} from 'ngx-spinner';
import { AgGridModule } from 'ag-grid-angular';
import { UserService } from '../services/user.service';
import { ButtonCellRendererComponent } from '../utils/button-cell-renderer-component/button-cell-renderer-component';
import { ReportsService } from '../services/reports.service';
import { Router } from '@angular/router';
import { IncidentDetailsModal } from '../modals/incident-details-modal/incident-details-modal';
import { NewActionPlanModal } from '../modals/new-action-plan-modal/new-action-plan-modal';
import { ActionPlan } from '../interfaces/actionPlan';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-incidentreport',
  imports: [NavMenu, NgxSpinnerModule, AgGridModule, IncidentDetailsModal, NewActionPlanModal],
  templateUrl: './incidentreport.html',
  styleUrl: './incidentreport.css'
})
export class IncidentReport {

    
    userFullName: string = "";
    showModal2: boolean = false;
    showModal3: boolean = false;
    actionID: number = 0;
    incidentDetail!: any;
    isSideMenuOpen = false;

       // ======================= Incident Report Grid ================================= // 
       columnDefs = [
          { field: 'ID', headerName: 'ID', sortable: true, filter: true },
          { field: 'Description', headerName: 'Description', sortable: true, filter: true },
          { field: 'Type', headerName: 'Type', sortable: true, filter: true },
          { field: 'Location', headerName: 'Location', sortable: true, filter: true },
          { field: 'ReportedDate', headerName: 'Reported Date', sortable: true, filter: true },
          { field: 'ReportedBy', headerName: 'Reported By', sortable: true, filter: true },
          { field: 'Status', headerName: 'Status', sortable: true, filter: true },
          {headerName: 'Action', cellRenderer: 'buttonCellRenderer'}
       ]
       
        defaultColDef = {
          flex: 1,
          minWidth: 100,
          resizable: true,
        };
    
        rowData: any[] = [];
    
        components  = {
           buttonCellRenderer: ButtonCellRendererComponent
        };
    
        onRowDoubleClicked(event: any): void {
            this.showModal3 = true;
            this.incidentDetail = event.data;
            console.log(this.incidentDetail);
        }
    
        
     // ============================================================================== //

    constructor(private spinner: NgxSpinnerService,
                private router: Router,
                private userService: UserService,
                private reportsService: ReportsService,
                private httpService: HttpService,
    ){}

    ngOnInit(): void {
      this.loadData();
    }

    loadData() : void {

        this.userService.userName$.subscribe(name => {
              this.userFullName = name?.toUpperCase() ?? "";
        });
        
                this.reportsService.retrieveReports().subscribe({
          next: (response) => {

              if (response.ok){
                this.spinner.hide();

                // For Report Summary Table
                this.rowData = response.body.details.incidentReports.data;

              }
          },
          error: (err) => {
              console.error(err.status);
              if (err.status === 401){
                 this.router.navigate(['login']); 
              }
          }
        })        

   }

  onButtonClick(row: any) {
     console.log('Button clicked on row:', row?.ID);
     this.actionID = row?.ID;
     this.showModal2 = true;
  } 
  
  refresh(): void  {
     this.loadData() 
  }
  closeModal2(): void {
    this.showModal2 = false;
  }

  toggleSideMenu() {
  this.isSideMenuOpen = !this.isSideMenuOpen;
 }

  closeModal3(): void {
    this.showModal3 = false;
  }

  actionSubmit(newAction:ActionPlan){
        this.spinner.show();
        console.log(newAction);
  
        var actionPlanSumibt = this.httpService.submitNewActionPlan(newAction); // Observable
  
        actionPlanSumibt.subscribe({
          next: (response)=>{
              console.log(response);
              if (response.status === 200){
                this.refresh();
                this.spinner.hide();
              }
          },
  
          error: (err)=>{
            console.error(err);
            this.spinner.hide();
            // go back to login page if unauthorize
            if (err.status == 401) {
              this.router.navigate(['login']);
            }
          } 
      })
  
    }



}
