import { Component, OnInit, AfterViewInit, Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule} from '@angular/common';
import { NewIncidentReportModal } from '../modals/new-incident-report-modal/new-incident-report-modal';
import { NewActionPlanModal } from '../modals/new-action-plan-modal/new-action-plan-modal';
import { NewReport } from '../interfaces/report';
import { NgxSpinnerService} from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpService } from '../services/http.service';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../services/user.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartData, ChartType, Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { ReportsService } from '../services/reports.service';
import { AgGridModule } from 'ag-grid-angular';
import { ModuleRegistry, AllCommunityModule, buttonStyleQuartz } from 'ag-grid-community';
import { ViewChild } from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ButtonCellRendererComponent } from '../utils/button-cell-renderer-component/button-cell-renderer-component';
import { ActionPlan } from '../interfaces/actionPlan';
import { NavMenu } from '../shared/nav-menu/nav-menu';
import { IncidentDetailsModal } from '../modals/incident-details-modal/incident-details-modal';

ModuleRegistry.registerModules([AllCommunityModule]);
Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);
@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [CommonModule, 
            NewIncidentReportModal, 
            NewActionPlanModal,
            IncidentDetailsModal,
            NgxSpinnerModule, 
            MatIconModule, 
            BaseChartDirective,
            NavMenu,
            AgGridModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfile implements OnInit {

  isMenuOpen: boolean = true;
  showModal: boolean = false;
  showModal2: boolean = false;
  showModal3: boolean = false;
  userFullName: string = "";
  userId: string = "";
  chartYLabel = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  barCharData: { x: string; y: number }[] = [];
  noOfOpenReports: number = 0;
  noOfInProgressReports: number = 0;
  noOfResolvedReports: number = 0;
  actionID: number = 0;
  isBarChart: boolean = true;
  incidentDetail!: any;
    
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

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective; // This gives an access to the canvas bar chart on the HTML Template

 //==================== Bar Chart (Number of Accidents Per Type) ========================= //
  public barChartData: ChartConfiguration<'bar', { x: string; y: number }[]>['data'] = {
      datasets: [
        {
          label: 'Count',
          data: [],
          backgroundColor: 'rgba(54,162,235,0.7)',
          borderColor: 'blue',
          borderWidth: 1,
        }
      ]
    };

  // Chart options with a time scale
public barChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y', // horizontal mode
  scales: {
    x: {
      beginAtZero: true,
      title: { display: true, text: 'Count' }
    },
    y: {
      type: 'category',
      title: { display: true, text: 'Accident Type' }
    }
  },
  plugins: {
    legend: { position: 'top' },
    datalabels: { display: false }
  }
};


  pieChartType: 'pie' = 'pie';
 // =================================================================================== //

 //==================== Pie Chart (Number of Accidents Per Type) ========================= //
   pieChartData!: ChartData<'pie', number[], string | string[]>;

   pieChartOptions: ChartOptions<'pie'> = {
         responsive: true,
         maintainAspectRatio: false,
         layout: {
           padding: {
               bottom: 10,
               top: 10,
            }
         },
         plugins: {
         legend: { position: 'right',
                   align: 'end',
                    labels: {
              font: {
                size: 14 // smaller text size (default is ~12–14)
              },
              boxWidth: 12, // size of the color box
              padding: 5 // space between legend items
            }
          }, // controls the legend (color labels)
          tooltip: {                   // controls the hover info
            callbacks: {
              label: (context) => {
                const dataset = context.dataset.data; // array of values
                const total = dataset.reduce((sum, value) => sum + value, 0);
                const value = context.parsed; // current segment's value
                const percentage = ((value / total) * 100).toFixed(2);

                return `${context.label}, ${percentage}%`;
              }
            }
          },
         datalabels: {
           color: '#ffffffff',
           font: {
             weight: 'bold',
             size: 12
           },
           align: 'end',
           offset: 10,
           formatter: (value, context) => {
               const data = context.chart.data.datasets[0].data as number[];
               const total = data.reduce((sum, val) => sum + val, 0);
               const percentage = Math.ceil((value / total) * 100) + '%';
               return percentage;
           }
        }
       },       
     }

   

 // ====================================================================================== //

  constructor(private router: Router,
              private userService: UserService,
              private reportsService: ReportsService,
              private spinner: NgxSpinnerService,
              private httpService: HttpService,
              ){}
  
  ngOnInit(): void {
    this.loadData();
  }
   
  onButtonClick(row: any) {
     console.log('Button clicked on row:', row?.ID);
     this.actionID = row?.ID;
     this.showModal2 = true;
  } 

  onSidebarToggle(open: boolean) {
    console.log(open);
  }
  
  loadData() : void {
        this.spinner.show();
        
        this.userService.userName$.subscribe(name => {
              this.userFullName = name?.toUpperCase() ?? "";
        });

        this.userService.userId$.subscribe(userId => {
              this.userId = userId ?? "";
              console.log(this.userId);
        });
        
        this.reportsService.retrieveReports().subscribe({
          next: (response) => {

              if (response.ok){
                this.spinner.hide();

                // For Report Summary Table
                this.rowData = response.body.details.incidentReports.data;
                this.noOfOpenReports = response.body.details.incidentReports.reportCounts.open;
                this.noOfInProgressReports = response.body.details.incidentReports.reportCounts.inProgress;
                this.noOfResolvedReports = response.body.details.incidentReports.reportCounts.resolved;

                // For Bar Chart and Pie Chart
                const barChartData = response.body.details.barChart;
                const pieChartData = response.body.details.pieChart;
                
                const pieLabels = pieChartData.map((d: any) => d.label);
                const pieValue = pieChartData.map((d:any) => d.value);
                console.log(pieLabels);
                
                if (barChartData.length > 0){
                     this.isBarChart = true;
                     this.barChartData.datasets[0].data = [...barChartData];
                }

                this.pieChartData = {
                  labels: pieLabels,
                  datasets: [{
                    data: pieValue,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FFCE56', '#56ff7bff', '#4f3800ff'],
                 }]
                }

                this.chart?.update();

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

  getRandomColor(): string {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
}   
  refresh(): void  {
     this.loadData() 
  }
  
  openModal(): void {
    this.showModal = true;
  }
  
  closeModal(): void {
    this.showModal = false;
  }

  closeModal2(): void {
    this.showModal2 = false;
  }

  closeModal3(): void {
    this.showModal3 = false;
  }
  


  reportSubmit(newReport:NewReport){
    this.spinner.show();
    console.log(newReport);

    var reportSubmit = this.httpService.submitNewReport(newReport); // Observable

    reportSubmit.subscribe({
        next: (response)=>{
            if (response.status === 200){
              this.refresh();
              this.spinner.hide();
            }
        },

        error: (err)=>{
          console.error(err);
          if (err.status == 401){
            this.router.navigate(['login']);
          }
        } 
    })
    
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
        } 
    })

  }


}
