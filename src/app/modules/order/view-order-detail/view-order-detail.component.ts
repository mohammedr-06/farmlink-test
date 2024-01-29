import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from '../../inventory/category-list/category.service';
import { AlertService } from '../../shared/alert';
import { OrderService} from '../order.service';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-view-order-detail',
  templateUrl: './view-order-detail.component.html',
  styleUrls: ['./view-order-detail.component.scss']
})
export class ViewOrderDetailComponent {
  orderId: any;
  orderData:any;
  chatData:any;
  userInfo: any;
  constructor(private categoryService:CategoryService,private router: Router,
    private spinner: NgxSpinnerService,public alertService:AlertService, private orderService:OrderService,private authService:AuthService) {
     
      this.userInfo = this.authService.getUserInfo();
  }
  ngOnInit() {
    this.orderId = this.orderService.orderId;
    if(this.orderId) {
      this.getOrderById();
      this.orderData = this.orderService.orderData;
      
    }else{
      this.router.navigate(['/order/list']);
    }
    
  }
  getOrderById(){
    this.spinner.show();
    this.orderService.getOrderById(this.orderId).subscribe(res => {
     this.chatData = res;
      this.spinner.hide();
      
    }, err => {
      this.spinner.hide();
      this.alertService.clear();
      this.alertService.error("not able to get Order detail data!!");
     });
  }
}
