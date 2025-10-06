import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenu } from '../shared/nav-menu/nav-menu';
import { NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';
import { UserService } from '../services/user.service';
import { ActionPlanService } from '../services/action.service';
import { Router } from '@angular/router';
import { Chart, ChartOptions, ChartData,
         BarElement, CategoryScale, LinearScale,
         Tooltip, Legend, ChartConfiguration, ArcElement} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ViewChild } from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';


Chart.register(
  BarElement, CategoryScale, LinearScale, // for bar chart
  ArcElement, Tooltip, Legend,            // for doughnut chart
  ChartDataLabels
);
@Component({
  selector: 'app-actionplandashboard',
  imports: [CommonModule,
           NavMenu,
           NgxSpinnerModule,
           BaseChartDirective,
  ],
  templateUrl: './actionplandashboard.html',
  styleUrl: './actionplandashboard.css'
})

export class Actionplandashboard implements OnInit {

  userFullName: string = "";
  averageDaysOverDue: string = "";
  percentageOnTime: string = "";
  noOfActivePlans: string = "";
  showDonutChart = false;
  showBarChart = false;
  showLineChart = false;
  dateLabels: number[] = [];
  isSideMenuOpen = false;


  @ViewChild('donutChart') donutChart?: BaseChartDirective;
  @ViewChild('barChart') barChart?: BaseChartDirective;

  //=============== Initialize Donut chart ========================//
    public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: false,
    maintainAspectRatio: false,
    layout: {
        padding: {
          top: 60   // adds 30px padding on top
        }
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
            usePointStyle: true, // optional: make legend circles
            padding: 20
        }
      },
      tooltip: {
        enabled: true
      },
      datalabels: {   
          color: '#fff',
          font: {
            weight: 'bold',
            size: 14
          },
          formatter: (value, ctx) => {
            const dataset = ctx.chart.data.datasets[0].data as number[];
            const total = dataset.reduce((a, b) => a + b, 0);
            const percentage = total ? ((value / total) * 100).toFixed(1) : 0;
            return percentage + '%'; // 👈 show % on slices
          }
    }
    }
  };

  public doughnutChartLabels: string[] = ['Completed Plans', 'Pending Plans'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [], backgroundColor: ['#FF6384', '#36A2EB'] }
    ]
  };

  public doughnutChartType: 'doughnut' = 'doughnut';
  //===============================================================//

  //=============== Initialize Bar Chart =========================//
        // Horizontal bar chart type
    public barChartType: 'bar' = 'bar';

    // Chart options
    public barChartOptions: ChartOptions<'bar'> = {
      responsive: true,
      indexAxis: 'y',   // 👈 makes it horizontal
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          enabled: true
        },
        datalabels: {
          anchor: 'end',
          align: 'right',
          color: '#000',
          font: {
            weight: 'bold'
          }
        }
      }
    };

    //first argument is cart type,second argument is the data type of the datasets, last argument is the data type of the labels
    public barChartData: ChartConfiguration<'bar', number[], string> = {
      type: 'bar',
      data: {
              labels: [],
      datasets: [
        {
          label: 'Action Plans',
          data: [],
          backgroundColor: 'rgba(54,162,235,0.7)',
          borderColor: 'blue',
          borderWidth: 1
        }
      ]
      }
    };

  //==============================================================//

  //==================== Initialize Line Chart ==================//

    public lineChartType: 'line' = 'line';
    // Line chart configuration
    public lineChartData: ChartConfiguration<'line'>['data'] = {
      labels: [],
      datasets: [
        {
          label: 'Completed Data',
          data: [],
          fill: false,
          borderColor: 'blue',
          tension: 0.4
        },
        {
          label: 'Pending Data',
          data: [],
          fill: false,
          borderColor: 'red',
          tension: 0.4
        },
      ]
    };

    public lineChartOptions: ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          align: 'center', // ✅ keep it above chart
          text: 'Action Plans Progress (Last 30 Days)',
          font: {
            size: 18,
            weight: 'bold'
          },
          color: '#333',
        },
        legend: {
          display: true,
          position: 'right', // ✅ legend stays right side
          align: 'center',
          labels: {
            boxWidth: 15,
            padding: 15,
            font: { size: 13 }
          }
        }
      },
      layout: {
        padding: {
          right: 20
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Action Plans'
          }
        }
      }
    };


  

  //=============================================================//

  constructor(private spinner: NgxSpinnerService,
              private actionService: ActionPlanService,
              private router: Router,
              private userService: UserService,
  ) {}
  
  toggleSideMenu() {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  ngOnInit(): void {
    this.loadData();
  }


  loadData(): void {
        this.spinner.show();
        
        this.userService.userName$.subscribe(name => {
              this.userFullName = name?.toUpperCase() ?? "";
        });

        
       //================  API call for KPI ==================//
        this.actionService.retrieveActionPlanKPI().subscribe({
            
            next: (res)=>{
                  
                if (res.ok){
                    this.spinner.hide();
                    this.averageDaysOverDue = res.body.details.averageDueDays;
                    this.percentageOnTime = res.body.details.percentageOnTime;
                    this.noOfActivePlans = res.body.details.noOfActivePlans;
                    console.log(res.body.details);

                }
            },

            error: (err)=>{
                console.error(err);
                if(err.status == 401){
                  this.router.navigate(['login']);
                }
            }
  
        });
    // ====================================================== //

    // =========== API call for chart (Donut, Bar chart, Line Chart) ======================= //
       this.actionService.retrieveActionPlanChart().subscribe({
            
            next: (res)=>{

                if (res.ok){

                    this.spinner.hide();

                    var donutChartArray: number[] = res.body.details.donutChart;
                    var barChartObj: {xLabel:number[], yLabel:string[]} = res.body.details.barChart;
                    var lineChartObj: {completedOverTime:any[], pendingOverTime:any[]} = res.body.details.lineChart;
                    console.log(lineChartObj);
                    if (donutChartArray.length > 0){
                        this.showDonutChart = true; 
                        this.doughnutChartData.datasets[0].data = [...donutChartArray];
                        this.donutChart?.chart?.update();
                    }
                          
                    if (barChartObj != null){
                        const xLabel = barChartObj.xLabel;
                        const yLabel = barChartObj.yLabel;
                        this.showBarChart = true;

                        this.barChartData.data.labels = [...yLabel];
                        this.barChartData.data.datasets[0].data = [...xLabel];
                        this.barChart?.update(); 
                    }

                    if (lineChartObj != null) {
                      const completedOverTimeArr = lineChartObj.completedOverTime;
                      const pendingOverTimeArr = lineChartObj.pendingOverTime;

                      // ✅ Ensure allDates is a string[] (not numbers)
                      const allDates: string[] = Array.from(
                        new Set([
                          ...completedOverTimeArr.map(d => new Date(d.date).toISOString().split('T')[0]),
                          ...pendingOverTimeArr.map(d => new Date(d.date).toISOString().split('T')[0])
                        ])
                      ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

                      // ✅ Format labels nicely for display, but keep ISO date for mapping
                      this.lineChartData.labels = allDates.map(d => {
                        const dateObj = new Date(d);
                        return dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
                      });

                      this.showLineChart = true;

                      // ✅ Map completed data correctly
                      const mapDataToLabelsCompleted = (
                        dataArray: { date: string; completed: number }[],
                        labels: string[]
                      ) => {
                        return labels.map(label => {
                          // Find by ISO date (string)
                          const record = dataArray.find(
                            d => new Date(d.date).toISOString().split('T')[0] === label
                          );
                          return record ? record.completed : 0;
                        });
                      };

                      // ✅ Map pending data correctly
                      const mapDataToLabelsPending = (
                        dataArray: { date: string; pending: number }[],
                        labels: string[]
                      ) => {
                        return labels.map(label => {
                          const record = dataArray.find(
                            d => new Date(d.date).toISOString().split('T')[0] === label
                          );
                          return record ? record.pending : 0;
                        });
                      };

                      // ✅ Build datasets
                      const completedData = mapDataToLabelsCompleted(completedOverTimeArr, allDates);
                      const pendingData = mapDataToLabelsPending(pendingOverTimeArr, allDates);

                      this.lineChartData.datasets[0].data = completedData;
                      this.lineChartData.datasets[1].data = pendingData;
                    }


                }
            },

            error: (err)=>{
                console.error(err);
                if(err.status == 401){
                  this.spinner.hide();
                  this.router.navigate(['login']);
                }
            }  
        });
    // ====================================================== //




  }



}
