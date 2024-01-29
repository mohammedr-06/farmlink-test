import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../shared/alert';
import { CategoryService } from '../category-list/category.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss'],
})
export class UnitListComponent {
  unitData: any[] = [];
  id: any;
  isLoading = false;
  modalRef!: BsModalRef;
  tableSize = [25, 50, 100];
  order: string = 'unitName';
  reverse: boolean = false;
  searchText: any;
  p: number = 1;
  pagingConfig = {
    currentPage: 1,
    itemsPerPage: 25,
    totalItems: 0,
  };
  filter: any = { unitName: '', status: '' };

  noOfRows = 2;
  constructor(
    public router: Router,
    private categoryService: CategoryService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    public alertService: AlertService
  ) {}
  ngOnInit() {
    this.getAllUnit();
  }
  getAllUnit() {
    this.spinner.show();
    const data = {
      page: this.pagingConfig.currentPage,
      size: this.pagingConfig.itemsPerPage,
      sortBy: this.order,
      sortOrder: !this.reverse ? 'DESC' : 'ASC',
      filter: this.searchText,
    };
    this.isLoading = true;
    this.categoryService.getAllUnit(data).subscribe(
      (res) => {
        this.unitData = res['content'];
        this.pagingConfig.totalItems = res['totalElements'];
        this.spinner.hide();
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.spinner.hide();
        this.alertService.clear();
        this.alertService.error(err.error.errors[0]);
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        console.error('catch', err);
      }
    );
  }
  updateFilters() {
    // this.filter = {
    //  unitName :this.searchText
    // };
    // this.pagingConfig.currentPage = 1;
    //this.getAllUnit();
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
    this.getAllUnit();
  }
  onTableSizeChange(event: any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    this.getAllUnit();
  }
  onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event;
    this.getAllUnit();
  }
  addUnit() {
    this.categoryService.unitRow = {};
    this.router.navigate(['/manage/add-unit']);
  }
  editUnit(item) {
    this.categoryService.unitRow = item;
    this.router.navigate(['/manage/edit-unit']);
  }
  deleteConfirmation(id, template: TemplateRef<any>) {
    this.id = id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }
  closePopup() {
    this.modalRef.hide();
  }
  deleteConfirm(id) {
    this.spinner.show();
    this.categoryService.deleteUnit(id).subscribe(
      (res) => {
        this.closePopup();
        this.spinner.hide();
        this.alertService.clear();
        this.alertService.success(res.message);

        setTimeout(() => {
          this.unitData = [];
          this.getAllUnit();
        }, 1000);
      },
      (err) => {
        this.spinner.hide();
        this.closePopup();
        this.alertService.clear();
        this.alertService.error(err.error.message);
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        console.error('catch', err);
      }
    );
  }
}
