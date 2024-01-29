import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../shared/alert';
import { CategoryService } from './category.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  categoryData: any[] = [];
  id: any;
  isLoading = false;
  modalRef!: BsModalRef;
  tableSize = [25, 50, 100];
  order: string = 'categoryName';
  reverse: boolean = false;
  searchText: any;
  p: number = 1;
  pagingConfig = {
    currentPage: 1,
    itemsPerPage: 25,
    totalItems: 0,
  };
  userFilter: any = { categoryName: '', status: '' };
  noOfRows = this.pagingConfig.itemsPerPage;
  constructor(
    public router: Router,
    private categoryService: CategoryService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    public alertService: AlertService
  ) {}
  ngOnInit() {
    this.getAllCategory();
  }
  getAllCategory() {
    this.spinner.show();
    const data = {
      page: this.pagingConfig.currentPage,
      size: this.pagingConfig.itemsPerPage,
      sortBy: this.order,
      sortOrder: !this.reverse ? 'DESC' : 'ASC',
      filter: this.searchText,
    };
    this.isLoading = true;
    this.categoryService.getCategory(data).subscribe(
      (res) => {
        this.isLoading = false;
        this.categoryData = res['content'];
        this.pagingConfig.totalItems = res['totalElements'];
        this.spinner.hide();
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

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
    this.getAllCategory();
  }
  onTableSizeChange(event: any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    this.getAllCategory();
  }
  onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event;
    this.getAllCategory();
  }
  addCategory() {
    this.categoryService.categoryRow = {};
    this.router.navigate(['/manage/add-category']);
  }
  editCategory(item) {
    this.categoryService.categoryRow = item;
    this.router.navigate(['/manage/edit-category']);
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
    this.categoryService.deleteCategory(id).subscribe(
      (res) => {
        this.closePopup();
        this.spinner.hide();
        this.alertService.clear();
        this.alertService.success(res.message);

        setTimeout(() => {
          this.categoryData = [];
          this.getAllCategory();
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
