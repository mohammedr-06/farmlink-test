import { Component, TemplateRef } from '@angular/core';
import { RequestService } from '../request.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-support-request-list',
  templateUrl: './support-request-list.component.html',
  styleUrls: ['./support-request-list.component.css'],
})
export class SupportRequestListComponent {
  requestForm: FormGroup;
  getAllCustomerSupport: any;
  modalRef!: BsModalRef;
  pagingConfig = {
    currentPage: 1,
    itemsPerPage: 25,
    totalItems: 0,
  };
  tableSize = [25, 50, 100];
  p: number = 1;
  noOfRows = this.pagingConfig.itemsPerPage;
  isLoading = false;
  categoryData: any[] = [];
  userFilter: any = {
    firstName: '',
    status: '',
    concern: '',
    contactNumber: '',
    email: '',
    farmerName: '',
  };
  order: string = 'firstName';
  reverse: boolean = false;
  searchText: any;

  constructor(
    private requestService: RequestService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,

    private fb: FormBuilder
  ) {}
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
    this.requestService.getAllCustomerSupport(data).subscribe((res) => {
      this.isLoading = false;
      this.getAllCustomerSupport = res['content'];
      this.categoryData = res['content'];
      this.pagingConfig.totalItems = res['totalElements'];
      this.spinner.hide();
    });
  }

  onTableSizeChange(event: any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    // this.noOfRows = this.pagingConfig.itemsPerPage; // Manually set the value
    this.fetchData(); // Corrected method call
  }

  onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event;
    this.getAllCustomerSupport();
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
    this.fetchData();
  }
  closePopup() {
    this.modalRef.hide();
  }
  openUpdateStatusModel(template: TemplateRef<any>, id) {
    this.requestForm = this.fb.group({
      status: ['', Validators.required],
      comment: [],
    });
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }
  requestSubmit(formdata) {}
}
