import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-incident-details-modal',
  imports: [MatIconModule, CommonModule],
  templateUrl: './incident-details-modal.html',
  styleUrl: './incident-details-modal.css'
})
export class IncidentDetailsModal implements OnChanges {

   @Input() show:boolean = false;
   @Input() incidentDetail!:any;
   @Output() close = new EventEmitter<void>();

   reportedDate?: string;
   reportedBy?: string; 
   
   onClose(): void {
     this.close.emit();
   }

 
      ngOnChanges(changes: SimpleChanges): void {
        if (changes['incidentDetail'] && this.incidentDetail?.ReportedDate && this.incidentDetail?.ReportedBy) {
          this.reportedDate = new Date(this.incidentDetail.ReportedDate).toLocaleString();
          this.reportedBy = this.incidentDetail?.ReportedBy;
        }
      }


}
