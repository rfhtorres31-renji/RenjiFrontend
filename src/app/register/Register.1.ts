import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { NgxSpinnerService} from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, NgxSpinnerModule],
    templateUrl: './register.html',
    styleUrl: './register.css'
})
export class Register implements OnInit {

    // myForm is a Register Class Property, FormGroup is a type, ! is an assertion
    // this declaration means that the myForm property is of type FormGroup and it will be promised to be assign before using it
    myForm!: FormGroup;

    // All logic/declarations inside the constructor will run first after the component is created
    // FormBuilder Service is injected here in Register Component to be used for form creation
    constructor(private fb: FormBuilder, 
               private httpService: HttpService,
               private spinner: NgxSpinnerService,
               private router: Router) {
    }

    ngOnInit(): void {
        this.myForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            departmentId: ['', Validators.required]
        });
                    
    }
    
    
    onSubmit() {
        if (this.myForm.valid) {
            this.spinner.show();
            console.log('Form Values:', this.myForm.value);
            var regRequest = this.httpService.registerUser(this.myForm.value); // Observable 
            

            regRequest.subscribe(
                {
                  next: (response)=>{ 
                     console.log('Success', response);
                     this.router.navigate(['/login']);
                     this.spinner.hide();
                  },
                  error: (err)=>{
                    console.error('Error', err);
                    this.spinner.hide();
                  }
                }
            );
         }
    }

}
