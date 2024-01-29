import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  year: any;
  footerLink= "https://www.kbizzsolutions.com/";
  constructor() {
    this.year = new Date().getFullYear();
   }
  ngOnint(){
    
  }
}
