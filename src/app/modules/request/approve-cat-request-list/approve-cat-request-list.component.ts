import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../shared/alert';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-approve-cat-request-list',
  templateUrl: './approve-cat-request-list.component.html',
  styleUrls: ['./approve-cat-request-list.component.scss'],
})
export class ApproveCatRequestListComponent {
  getRequestedCategoryList: any;
  modalRef!: BsModalRef;
  requestForm: FormGroup;
  categoryId: number;
  updateRequestedCategoryList: any;
  pagingConfig = {
    currentPage: 1,
    itemsPerPage: 25,
    totalItems: 0,
  };
  tableSize = [25, 50, 100];
  p: number = 1;
  noOfRows = 1;
  isLoading = false;
  categoryData: any[] = [];
  order: string = 'createdDate';
  reverse: boolean = false;
  searchText: any;
  userFilter: any = {
    createdDate: '',
    status: '',
    farmerName: '',
    categoryName: '',
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    public alertService: AlertService,
    private requestService: RequestService
  ) {
    this.noOfRows = this.pagingConfig.itemsPerPage;
  }
  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.spinner.show();
    const data = {
      page: this.pagingConfig.currentPage,
      size: this.pagingConfig.itemsPerPage,
      sortBy: this.order,
      sortOrder: !this.reverse ? 'DESC' : 'ASC',
      filter: this.searchText,
    };
    this.isLoading = true;
    this.requestService.getRequestedCategoryList(data).subscribe(
      (res) => {
        this.isLoading = false;
        this.getRequestedCategoryList = res['content'];
        this.categoryData = res['content'];
        this.pagingConfig.totalItems = res['totalElements'];
        this.spinner.hide();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  onTableSizeChange(event: any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    this.getRequestedCategoryList();
  }
  onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event;
    this.getRequestedCategoryList();
  }
  closePopup() {
    this.modalRef.hide();
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
    this.fetchData();
  }
  openUpdateStatusModel(template: TemplateRef<any>, id) {
    this.categoryId = id;
    this.requestForm = this.fb.group({
      status: ['', Validators.required],
      comment: [],
    });
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }
  requestSubmit(formdata) {
    const { status, comment } = formdata; // Destructure status and comment from the form data
    console.log(this.categoryId);

    this.requestService
      .updateRequestedCategoryList(this.categoryId, status, comment) // Pass categoryId, status, and comment to the service method
      .subscribe(
        (res) => {
          console.log(res);
          this.closePopup();
          this.fetchData();
        },
        (error) => {
          console.error('Category Request Error', error);
        }
      );
  }
  isActionButtonDisabled(status: string): boolean {
    // Disable the action button if the status is "Approved" or "Rejected"
    return status === 'Approved' || status === 'Rejected';
  }
}
