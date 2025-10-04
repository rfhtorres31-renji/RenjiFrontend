import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewReport } from '../../interfaces/report';

@Component({
  selector: 'app-new-incident-report-modal',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-incident-report-modal.html',
  styleUrls: ['./new-incident-report-modal.css']
})
export class NewIncidentReportModal implements OnInit, OnChanges{

  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<NewReport>();

  myForm! : FormGroup;

  constructor(private fb: FormBuilder){}
  
  onClose(): void {
    this.close.emit(); // This will send signal to its callback function counterpart on the parents component (closeModal()) to run
  }
  
  // reset the form whenever the show property changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show'] && this.myForm) {
      this.myForm.reset();
    }
  }

  ngOnInit(): void {
            this.myForm = this.fb.group({
            title: ['', [Validators.required]],
            accidentTypeId: ['', [Validators.required]],
            description: ['', Validators.required],
            location: ['', Validators.required],         
        });   
        
        this.myForm.reset();
  }
   
  onSubmit(event:Event) {
    
    if(this.myForm.invalid){
      alert("Complete the details below");
    }

    event.preventDefault();
    this.formSubmit.emit(this.myForm.value as NewReport);
    this.onClose(); // close the modal after submit
  }



}
