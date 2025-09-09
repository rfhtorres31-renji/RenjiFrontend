import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './nav-menu.html',
  styleUrls: ['./nav-menu.css'] 
})
export class NavMenu {

  @Input() userFullName: string = "";
  isMenuOpen: boolean = true;
  isSideMenuOpen: boolean = true;

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSideMenu(): void {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  goToDashboard(): void {
      this.router.navigate(['dashboard']);
  }

  goToActionPlan(): void {
      this.router.navigate(['actionplan']);
  }

  goToActionPlanDashboard(): void {
    this.router.navigate(['actionplan-dashboard']);
  }


}
