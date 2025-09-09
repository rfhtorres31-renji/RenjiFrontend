import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({providedIn: 'root'})
export class UserService {

   // | -> is a Union Type Operator, meaning a variable or new class instance can be one data type or another.
   // It tells the typescript what data types are allowed. It can have many data types
   usernameSubject = new BehaviorSubject<string | null>(null);  // An observable and observer and its mutable
   userIDSubject = new BehaviorSubject<string | null>(null);

   userName$ = this.usernameSubject.asObservable(); // An Observable and can only be subscribed.
   userId$ = this.userIDSubject.asObservable();

   setUserName(userName: string) {
      console.log(userName);
      this.usernameSubject.next(userName);
      localStorage.setItem('userName', userName);
   }

   retrieveUserNameFromStorage() {
       const name = localStorage.getItem('userName');
       if (name){
          this.usernameSubject.next(name);
       }
   }
   

  setUserId(userId: string) {
      console.log(userId);
      this.userIDSubject.next(userId);
      localStorage.setItem('userId', userId);
   }

   retrieveUserIdFromStorage() {
       const userId = localStorage.getItem('userId');
       if (userId){
          this.userIDSubject.next(userId);
       }
   }


    
}