import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActionPlanService } from '../../services/action.service';
import { NgxSpinnerService} from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-change-status-modal',
  imports: [MatIconModule, CommonModule, ReactiveFormsModule],
  templateUrl: './change-status-modal.html',
  styleUrl: './change-status-modal.css'
})
export class ChangeStatusModal implements OnInit, OnChanges {
  
  @Input() show = false;
  @Input() actionDetailTitle = "";
  @Input() Status = "";
  @Input() actionID = "";
  @Input() incidentReportID = "";
  @Output() close = new EventEmitter<boolean>();
  actionPlanStatusControl = new FormControl();
  remarks = new FormControl();

  constructor(private actionHttpService: ActionPlanService,
              private spinner: NgxSpinnerService) 
              {}
  
  onClose(): void {
     this.close.emit();
  }
  

  ngOnInit(): void {
    console.log("Modal was opened");
    this.actionPlanStatusControl.setValue('');
    this.remarks.setValue('');
  }

  ngOnChanges(changes: SimpleChanges): void {
     if(changes['show']){
       this.actionPlanStatusControl.reset();
       this.remarks.reset();
     }
  }


  updateActionPlan(): void {

    if (this.actionPlanStatusControl.value == null || this.remarks.value == null || this.actionID == null){
      console.log("Please complete all the details");
      return;
    }

    console.log(this.incidentReportID);

    var newActionPlanData = {
        newActionPlanStatus : this.actionPlanStatusControl.value,
        remarks: this.remarks.value
    }

    this.spinner.show();

    var updateActionPlanObservable = this.actionHttpService.updateActionPlan(this.actionID, this.incidentReportID, newActionPlanData);

    updateActionPlanObservable.subscribe({
      next: (res)=>{
          console.log(res);
          if (res.ok){
             console.log(res);
             window.location.reload();
             this.spinner.hide();
          }
      },

      error: (err)=>{
          console.error(err);
          this.spinner.hide();
      } 
    });


  }


}
