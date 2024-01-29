import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { InventoryListNewComponent } from './inventory-list-new/inventory-list-new.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { AddEditUnitComponent } from './add-edit-unit/add-edit-unit.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';
import { AddInventorySingleComponent } from './add-inventory-single/add-inventory-single.component';
import { ArchiveListComponent } from './archive-list/archive-list.component';
const routes: Routes = [
  { path: '', component: InventoryListComponent },
  { path: 'archive-list', component: ArchiveListComponent },
  { path: 'inventory', component: InventoryListComponent },
  { path: 'category-list', component: CategoryListComponent },
  { path: 'add-category', component: AddEditCategoryComponent },
  { path: 'edit-category', component: AddEditCategoryComponent },
  { path: 'inventory-add', component: AddInventorySingleComponent },
  { path: 'add-inventory', component: AddInventoryComponent },
  { path: 'edit-inventory', component: EditInventoryComponent },
  { path: 'inventory-list', component: InventoryListNewComponent },
  { path: 'unit-list', component: UnitListComponent },
  { path: 'add-unit', component: AddEditUnitComponent },
  { path: 'edit-unit', component: AddEditUnitComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
