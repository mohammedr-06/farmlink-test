import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../shared/alert';
import { OrderService } from '../order.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent {
  OrderData: any;
  id: any;
  modalRef!: BsModalRef;
  orderId: any;
  orderForm: FormGroup;
  p: number = 1;
  pagingConfig = {
    currentPage: 1,
    itemsPerPage: 25,
    totalItems: 0,
  };
  order: string = 'orderDate';
  reverse: boolean = false;
  searchText: any;
  userInfo: any;
  tableSize = [25, 50, 100];
  noOfRows = this.pagingConfig.itemsPerPage;
  userFilter: any = { orderDate: '', status: '' };

  orderStatusArr = ['Processing', 'Completed', 'Cancelled'];
  constructor(
    public router: Router,
    private orderService: OrderService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    public alertService: AlertService,
    public fb: FormBuilder,
    private authService: AuthService
  ) {
    this.userInfo = this.authService.getUserInfo();
  }
  ngOnInit() {
    this.getAllOrder();
  }
  getAllOrder() {
    this.spinner.show();
    const data = {
      page: this.pagingConfig.currentPage,
      size: this.pagingConfig.itemsPerPage,
      sortBy: this.order,
      sortOrder: !this.reverse ? 'DESC' : 'ASC',
      filter: this.searchText,
    };

    let orderServiceMethod;

    if (this.userInfo?.accountType !== 'FARMER') {
      orderServiceMethod = this.orderService.getButcherOrderAll(data);
    } else {
      orderServiceMethod = this.orderService.getAllOrderList(data);
    }

    orderServiceMethod.subscribe(
      (res) => {
        this.OrderData = res['content'];
        this.pagingConfig.totalItems = res['totalElements'];
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

  updateFilters() {
    this.pagingConfig.currentPage = 1;
    this.getAllOrder();
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
    this.getAllOrder();
  }
  // setOrder(value: string) {
  //   if (this.order === value) {
  //     this.reverse = !this.reverse;
  //   }

  //   this.order = value;
  //   this.getAllOrder();
  // }
  onTableSizeChange(event: any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    this.getAllOrder();
  }
  onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event;
    this.getAllOrder();
  }
  viewOrder(item) {
    this.orderService.orderId = item.id;
    this.orderService.orderData = item;
    this.router.navigate(['/order/view-order']);
  }
  changeStatus(template: TemplateRef<any>, item) {
    this.orderId = item.orderNumber;
    this.orderForm = this.fb.group({
      orderStatus: [item.status, Validators.required],
    });
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }
  closePopup() {
    this.modalRef.hide();
  }
  updateStatus(id, formdata) {
    this.orderService
      .updateOrderStatus(id, formdata.value.orderStatus)
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.closePopup();
          this.getAllOrder();
          this.alertService.clear();
          this.alertService.success('Record Updated Successfully!');
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
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
