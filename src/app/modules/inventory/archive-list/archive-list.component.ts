import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category-list/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../shared/alert';
import { InventoryService } from '../inventory.service';
@Component({
  selector: 'app-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.css'],
})
export class ArchiveListComponent {
  unitOption: any;
  categoryOption: any;
  inventoryData: any;
  modalRef!: BsModalRef;
  inventoryForm: FormGroup;
  deleteInvId: any;
  archiveId: any;
  order: string = 'categoryName';
  reverse: boolean = false;
  searchText: any;
  p: number = 1;
  pagingConfig = {
    currentPage: 1,
    itemsPerPage: 25,
    totalItems: 0,
  };
  userFilter: any = { categoryName: '', itemName: '', price: '', qty: '' };
  noOfRows = this.pagingConfig.itemsPerPage;
  tableSize = [25, 50, 100];
  constructor(
    public router: Router,
    private inventoryService: InventoryService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private categoryService: CategoryService,
    private spinner: NgxSpinnerService,
    public alertService: AlertService
  ) {}
  ngOnInit() {
    this.getAllArchive();
    this.getAllCategory();
    this.getAllUnitItem();
  }
  getAllArchive() {
    this.spinner.show();
    // getAllItem?page=0&size=10&sortBy=fieldName&sortOrder=desc
    const data = {
      page: this.pagingConfig.currentPage,
      size: this.pagingConfig.itemsPerPage,
      sortBy: this.order,
      sortOrder: !this.reverse ? 'DESC' : 'ASC',
      filter: this.searchText,
    };
    this.categoryService.getAllArchive(data).subscribe(
      (res) => {
        this.inventoryData = res['content'];
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
    this.getAllArchive();
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
    this.getAllArchive();
  }
  onTableSizeChange(event: any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    this.getAllArchive();
  }
  onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event;
    this.getAllArchive();
  }
  getAllCategory() {
    this.spinner.show();
    this.categoryService.getAllCategoryForDropDown().subscribe(
      (res) => {
        this.categoryOption = res;
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
  getAllUnitItem() {
    this.spinner.show();
    this.categoryService.getAllUnitItemForDropDown().subscribe(
      (res) => {
        this.unitOption = res;
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
  addInventory() {
    this.router.navigate(['/manage/inventory-add']);
  }
  addBulkInventory() {
    this.router.navigate(['/manage/add-inventory']);
  }

  openInvenModal(item) {
    this.inventoryService.inventoryId = item.id;
    this.router.navigate(['/manage/edit-inventory']);
  }
  openInvenDeleteModal(template: TemplateRef<any>, item) {
    this.deleteInvId = item.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }
  deleteConfirm(deleteInvId) {
    this.spinner.show();
    this.inventoryService.deleteInventory(deleteInvId).subscribe(
      (res) => {
        this.closePopup();
        this.spinner.hide();
        this.alertService.clear();
        this.alertService.success(res.message);
        setTimeout(() => {
          this.getAllArchive();
        }, 1000);
      },
      (err) => {
        this.spinner.hide();
        this.closePopup();
        console.error('catch', err);
      }
    );
  }
  openInvenUnArchivedModal(template: TemplateRef<any>, item) {
    this.archiveId = item.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered',
    });
  }
  unArchive(archiveId) {
    const status = 'Unarchived';
    this.spinner.show();
    this.inventoryService.unArchivedInventory(archiveId, status).subscribe(
      (res) => {
        this.closePopup();
        this.spinner.hide();
        this.alertService.clear();
        this.alertService.success(res.message);
        setTimeout(() => {
          this.getAllArchive();
        }, 1000);
      },
      (err) => {
        this.spinner.hide();
        this.closePopup();
        console.error('catch', err);
      }
    );
  }
  closePopup() {
    this.modalRef.hide();
  }
}
