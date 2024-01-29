import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService} from './modules/auth/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SubscriptionService } from './modules/subscription/subscription.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-routing';
  footerUrl = 'https://farmlink.com';
  footerLink = 'www.farmlink.com';
  templateFile = "master";
  constructor(private router: Router, private activatedRoute: ActivatedRoute, public authService:AuthService,
    private modalService: BsModalService,private subscriptionService :SubscriptionService,
    ) {
    }
    
   ngOnInit() {
    // this.subscriptionService.getSubscription().subscribe( data =>{
    //   if(!data){
    //    this.authService.setIsActiveSubscription(false);
    //   } else {
    //     this.authService.setIsActiveSubscription(true);
    //   }
    // });
    

     
}
}