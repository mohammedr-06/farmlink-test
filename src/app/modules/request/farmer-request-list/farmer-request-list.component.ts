import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-farmer-request-list',
  templateUrl: './farmer-request-list.component.html',
  styleUrls: ['./farmer-request-list.component.scss'],
})
export class FarmerRequestListComponent implements OnInit {
  id: number;
  getRequestedCategoriesList: any;
  selectedFilter: string = 'category'; // Default selected filter
  reverse: boolean = false;
  searchText: any;
  p: number = 1;
  pagingConfig = {
    currentPage: 1,
    itemsPerPage: 25,
    totalItems: 0,
  };
  order: string = 'date';
  userFilter: any = { date: '', status: '' };
  noOfRows = this.pagingConfig.itemsPerPage;
  tableSize = [25, 50, 100];
  constructor(
    private requestService: RequestService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getAllRequestlist();
  }
  getAllRequestlist() {
    this.spinner.show();
    const data = {
      page: this.pagingConfig.currentPage,
      size: this.pagingConfig.itemsPerPage,
      sortBy: this.order,
      sortOrder: !this.reverse ? 'DESC' : 'ASC',
      filter: this.searchText,
    };

    this.requestService.getRequestedCategoriesList(data).subscribe((res) => {
      this.getRequestedCategoriesList = res['content'];
      this.pagingConfig.totalItems = res['totalElements'];
      this.spinner.hide();
    });
  }
  updateFilters() {
    this.pagingConfig.currentPage = 1;
    this.getAllRequestlist();
  }

  onTableSizeChange(event: any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    this.getAllRequestlist();
  }
  onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event;
    this.getAllRequestlist();
  }
  getRequestService() {
    sortOrder: !this.reverse ? 'DESC' : 'ASC';
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
    this.getAllRequestlist();
  }
  onFilterChange(filter: string) {
    this.selectedFilter = filter;
  }
}
