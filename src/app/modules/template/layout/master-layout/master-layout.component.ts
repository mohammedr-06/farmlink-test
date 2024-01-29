import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { SubscriptionService } from '../../../subscription/subscription.service';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.scss']
})
export class MasterLayoutComponent {
  checkIsLoggedIn = false;
  userType:any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, public authService:AuthService,private subscriptionService :SubscriptionService) {
    this.checkIsLoggedIn = this.authService.checkIsLoggedIn;
    this.userType = authService.getUserType();
  }
  ngOnInit() {
    
    this.subscriptionService.getSubscription().subscribe( data =>{
      if(!data){
       this.authService.setIsActiveSubscription(false);
      } else {
        this.authService.setIsActiveSubscription(true);
      }
    });
  }
}
