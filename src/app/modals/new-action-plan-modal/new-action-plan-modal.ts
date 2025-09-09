import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActionPlan } from '../../interfaces/actionPlan';

@Component({
  selector: 'app-new-action-plan-modal',
  imports: [CommonModule, 
            ReactiveFormsModule, 
            MatIconModule],
  templateUrl: './new-action-plan-modal.html',
  styleUrl: './new-action-plan-modal.css'
})
export class NewActionPlanModal implements OnInit{
   
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<ActionPlan>();
  @Input() data!: any;
  myForm!: FormGroup;

  constructor(private fb: FormBuilder){};
  
  onClose(): void {
    this.close.emit();
  }

  ngOnInit(): void {
     this.myForm = this.fb.group({
            actionDescription: ['', [Validators.required]],
            personInCharge: ['', [Validators.required]],
            priority: ['', Validators.required],
            actionTypes: ['', Validators.required],   
            targetDate: ['', Validators.required],    
        });    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show'] && this.myForm) {
      this.myForm.reset();
    }
  }

  onSubmit(event:Event) {
      if (this.myForm.valid){
         event.preventDefault();
         console.log(this.data);
         this.formSubmit.emit({
           form: this.myForm.value,
           incidentReportID: this.data,
         });
         this.onClose();
      } 
    }


}
