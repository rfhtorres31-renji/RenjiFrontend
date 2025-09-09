import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage} from '@angular/common';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { NgxSpinnerService} from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserService } from '../services/user.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, NgxSpinnerModule, MatIconModule, NgOptimizedImage, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
    
    myForm!: FormGroup;
    rememberMe: boolean = false;
    invalidEmailError: boolean = false;
    submitted: boolean = true;
    isErrorVisible: boolean = false;
    errorMessage: string = "";

    constructor(private fb: FormBuilder, 
                private httpService: HttpService,
                private userService: UserService,
                private router: Router,
                private spinner: NgxSpinnerService) {}


    ngOnInit(): void {
        this.myForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });                  
    }
    

    onSubmit(): void {
        
        if (!this.myForm.valid) { 
            return;
        }

        this.spinner.show(); // Show the loader
        var loginRequest = this.httpService.loginUser(this.myForm.value, this.rememberMe); 

        loginRequest.subscribe({
              // All 200 status codes are catched by next handler
           next: (response) => {
                if (response.status == 200){
                    
                    const token: string = response.body.details.token; 
                    const userFullName: string = response.body.details.name;
                    const userID: string = response.body.details.userID;

                    localStorage.setItem('token', token);

                    this.userService.setUserName(userFullName);
                    this.userService.setUserId(userID);

                    this.spinner.hide();
                    this.router.navigate(['/dashboard']);
                    
                 }
              },
              // Error status codes (400's 500's) are catched by the error handler
              error: (err) => {
                  this.spinner.hide();
                  console.error(err);
                  this.isErrorVisible = err.status == 409;
                  this.errorMessage = err.error?.details;
              }
           });


    }




}
