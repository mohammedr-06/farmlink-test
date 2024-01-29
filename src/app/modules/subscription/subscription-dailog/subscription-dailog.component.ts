import { Component, OnInit ,ElementRef, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-subscription-dailog',
  templateUrl: './subscription-dailog.component.html',
  styleUrls: ['./subscription-dailog.component.css']
})
export class SubscriptionDailogComponent implements OnInit  {
  loadAPI: Promise<any>;
  pricingTableId;
  stripeKey;
  userInfo ;
  constructor(private elementRef: ElementRef, private renderer: Renderer2,private authService : AuthService) {

  }
  ngOnInit() {
    this.userInfo = this.authService.getUserInfo(); 
    const pricingTable = this.elementRef.nativeElement.querySelector('stripe-pricing-table');
    this.renderer.setAttribute(pricingTable, 'customer-email', this.userInfo.userEmail);
    this.renderer.setAttribute(pricingTable, 'pricing-table-id', environment.pricingTableId);
    this.renderer.setAttribute(pricingTable, 'publishable-key', environment.stripeKey);

  setTimeout(() => {
    this.loadAPI = new Promise((resolve) => {
      console.log('resolving promise...');
      this.loadScript('https://js.stripe.com/v3/pricing-table.js');
  });
  }, 2000);
   
  }

  public loadScript(url) {
    console.log('preparing to load...');
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
