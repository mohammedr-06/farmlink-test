import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../shared/alert';
import { DashboardService } from '../dashboard.service';
import { SubscriptionService } from '../../subscription/subscription.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SubscriptionDailogComponent } from '../../subscription/subscription-dailog/subscription-dailog.component';
import { AuthService } from '../../auth/auth.service';
declare var CanvasJS: any; // Assuming you are using CanvasJS for charts

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  chartOptions: any;

  listData = {
    todaysOrderCount: 0,
    totalInventoryCount: 0,
    totalRevenue: '0.00',
    totalOrderCount: 0,
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
    if (this.authService.getUserType() === 'FARMER') {
      this.checkSubscription();
    }
    this.getAllData();

    this.chartOptions = {
      title: {
        text: 'Total Orders vs dates/month',
      },
      animationEnabled: true,
      axisY: {
        title: 'Orders',
        includeZero: true,
        interval: 50,
        maximum: 500,
      },
      axisX: {
        title: 'Date',
        interval: 1,
        valueFormatString: 'DD MMMM',
      },
      data: [
        {
          type: 'column',
          indexLabelFontColor: '#5A5757',
          dataPoints: this.generateDataPointsForDecember(),
        },
      ],
    };

    // Assuming you have a div with id="chartContainer" in your HTML to render the chart
    let chart = new CanvasJS.Chart('chartContainer', this.chartOptions);
    chart.render();
  }
  generateDataPointsForDecember() {
    let dataPoints = [];

    for (let day = 1; day <= 30; day++) {
      let dateString = '2023-12-' + day;
      let dataPoint = {
        x: new Date(dateString),
        y: Math.floor(Math.random() * 100),
      };
      dataPoints.push(dataPoint);
    }

    return dataPoints;
  }

  checkSubscription() {
    this.subscriptionService.getSubscription().subscribe((data) => {
      if (!data) {
        let modalRef = this.modalService.show(SubscriptionDailogComponent, {
          backdrop: 'static',
          keyboard: false,
        });
        this.authService.setIsActiveSubscription(false);
      } else {
        this.authService.setIsActiveSubscription(true);
      }
    });
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
    this.dashboardService.getDashboardData().subscribe(
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

  // chartOptions = {
  //   title: {
  //     text: ' Total Orders vs dates/month',
  //   },
  //   animationEnabled: true,
  //   axisY: {
  //     title: 'Orders',
  //     includeZero: true,
  //     interval: 50, // Set the interval to 50
  //     maximum: 500, // Set the maximum value to 100
  //   },
  //   axisX: {
  //     title: 'Date',
  //     interval: 1, // Set the interval as needed
  //     valueFormatString: 'DD MMMM', // Date format
  //   },
  //   data: [
  //     {
  //       type: 'column', //change type to bar, line, area, pie, etc
  //       //indexLabel: "{y}", //Shows y value on all Data Points
  //       indexLabelFontColor: '#5A5757',
  //       // dataPoints:generateDataPointsForDecember

  //       // dataPoints: [
  //       //   { x: new Date('2023-12-01'), y: 71 },
  //       //   { x: new Date('2023-12-02'), y: 55 },
  //       //   { x: new Date('2023-12-03'), y: 50 },
  //       //   { x: new Date('2023-12-04'), y: 65 },
  //       //   { x: new Date('2023-12-05'), y: 71 },
  //       //   { x: new Date('2023-12-06'), y: 92 },
  //       //   { x: new Date('2023-12-07'), y: 68 },
  //       //   { x: new Date('2023-12-08'), y: 38 },
  //       //   { x: new Date('2023-12-09'), y: 54 },
  //       //   { x: new Date('2023-12-10'), y: 60 },
  //       // ],
  //     },
  //   ],
  // };
}
