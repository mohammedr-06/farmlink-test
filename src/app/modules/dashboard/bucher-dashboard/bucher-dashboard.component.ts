import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubscriptionService } from '../../subscription/subscription.service';
import { AlertService } from '../../shared/alert';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-bucher-dashboard',
  templateUrl: './bucher-dashboard.component.html',
  styleUrls: ['./bucher-dashboard.component.scss'],
})
export class BucherDashboardComponent {
  listData = {
    todaysOrderCount: 0,
    allOrders: 0,
  };
  constructor(
    private authService: AuthService,
    public router: Router,
    private dashboardService: DashboardService,
    private spinner: NgxSpinnerService,
    private subscriptionService: SubscriptionService,
    public alertService: AlertService,
    private modalService: BsModalService
  ) {}
  ngOnInit() {
    this.getAllData();
  }
  getAllData() {
    this.spinner.show();
    //getAllItem?page=0&size=10&sortBy=fieldName&sortOrder=desc
    const data = {
      currentPage: 1,
      sortBy: 'itemName',
      sortOrder: 'desc',
      noOfRecord: 100,
    };
    this.dashboardService.getButcherDashboardData().subscribe(
      (res) => {
        this.listData = res;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.alertService.clear();
        this.alertService.error(err.error.errors[0]);
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        console.error('catch', err);
      }
    );
  }
}
