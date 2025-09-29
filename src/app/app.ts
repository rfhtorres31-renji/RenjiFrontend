import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('renjifrontend');

  constructor(private userService: UserService){}

  ngOnInit() {
      this.userService.retrieveUserNameFromStorage(); // This ensures that after dashboard refresh, still it will keep the last update value of the userFullName
      this.userService.retrieveUserIdFromStorage(); // This ensures that after dashboard refresh, still it will keep the last update value of the userId
  }
  


}
