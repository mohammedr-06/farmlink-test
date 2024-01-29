import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup-type',
  templateUrl: './signup-type.component.html',
  styleUrls: ['./signup-type.component.scss']
})
export class SignupTypeComponent {
  constructor( public router: Router) {
  }

  ngOnInit() {
   
  }
  farmerClick(){
    this.router.navigate(['/signup/farmer']);
  }
  butcherClick(){
    this.router.navigate(['/signup/butcher']);
  }
  signinClick() {
    this.router.navigate(['/login']);
  }
}
