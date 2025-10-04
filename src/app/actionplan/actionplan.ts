import { Component, OnInit } from '@angular/core';
import { NavMenu } from '../shared/nav-menu/nav-menu';
import { UserService } from '../services/user.service';
import { NgxSpinnerService} from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgGridModule } from 'ag-grid-angular';
import { ActionPlanService } from '../services/action.service';
import { ChangeStatusModal } from '../modals/change-status-modal/change-status-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actionplan',
  imports: [NavMenu, 
            NgxSpinnerModule, 
            AgGridModule,
            ChangeStatusModal       
  ],
  templateUrl: './actionplan.html',
  styleUrl: './actionplan.css'
})
export class Actionplan implements OnInit {
   
   userFullName: string = "";
   actionDetailTitleValue: string = "";
   statusValue: string = "";
   actionIDValue: string = "";
   userId: string = "";
   showModal: boolean = false;
   incidentReportIDValue: string  = "";
  isSideMenuOpen = false;

   // ======================= Action Plan Grid ================================= // 
      columnDefs = [
      { 
        headerName: 'No', 
        valueGetter: (params:any) => params.node.rowIndex + 1, 
        width: 80,
        sortable: false,
        filter: false
      },
      { field: 'ActionDetail', headerName: 'Action Detail', sortable: true, filter: true },
      { field: 'IncidentReportTitle', headerName: 'Incident Report Title', sortable: true, filter: true },
      { field: 'Location', headerName: 'Location', sortable: true, filter: true },
      { field: 'Priority', headerName: 'Priority', sortable: true, filter: true },
      { field: 'DueDate', headerName: 'Due Date', sortable: true, filter: true, valueFormatter: (params:any) => {
            if (!params.value) return '';
            return new Date(params.value).toLocaleDateString(); 
      }},
      { field: 'ActionType', headerName: 'Action Type', sortable: true, filter: true },
      { field: 'MaintenanceTeam', headerName: 'Maintenance Staff', sortable: true, filter: true },
      { field: 'AccidentType', headerName: 'Accident Type', sortable: true, filter: true },
      { field: 'Status', headerName: 'Status', sortable: true, filter: true },
   ]
   
    defaultColDef = {
      minWidth: 120,
      resizable: true,
      autoHeaderHeight: true,
      cellStyle: { textAlign: 'center' }
    };

    onGridReady(params: any) {
      setTimeout(() => {
        params.columnApi.autoSizeAllColumns();
      }, 0);
    }

    rowData: any[] = [];
   // ========================================================================== //

   constructor(private userService: UserService,
               private router: Router,
               private spinner: NgxSpinnerService,
               private actionPlanService: ActionPlanService
   ){}

   ngOnInit(): void {
     this.loadData();
   }

     loadData() : void {
        this.spinner.show();
        
        this.userService.userName$.subscribe(name => {
              this.userFullName = name?.toUpperCase() ?? "";
        });

        this.spinner.show();

        // Retrieve Action Plan Records
        this.actionPlanService.retrieveActionPlan().subscribe({
          next: (res)=>{
              
              if (res.ok){
                 this.rowData = res.body.details.data;   
                 this.spinner.hide();              
              }
          },
          error: (err)=>{
               console.error(err);
               this.router.navigate(['login']);
               this.spinner.hide();
          },
        })
   }
  
   onRowClicked(event: any) {
     this.showModal = true;
     this.actionDetailTitleValue = event.data.ActionDetail;
     this.statusValue = event.data.Status;
     this.actionIDValue = event.data.ActionID;
     this.incidentReportIDValue = event.data.IncidentReportID;
     console.log(event.data);   
   }
  
   closeModal() {
     this.showModal = false;
   }

}
