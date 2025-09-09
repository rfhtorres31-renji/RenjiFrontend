import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-cell-renderer-component',
  imports: [CommonModule],
  templateUrl: './button-cell-renderer-component.html',
  styleUrl: './button-cell-renderer-component.css'
})
export class ButtonCellRendererComponent implements ICellRendererAngularComp{

   params: any;
   showButton: boolean = false;

   agInit(params: any): void {
       this.params = params;
       console.log(this.params);
       this.showButton = params.data?.Status === "Open";
   }

   
  refresh(params: any): boolean {
    return false; // no refresh handling for now
  }

  onClick() {
        this.params.context.componentParent.onButtonClick(this.params.data);
   };



}
