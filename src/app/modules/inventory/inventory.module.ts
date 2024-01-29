import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { TemplateModule} from '../template/template.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { InventoryListNewComponent } from './inventory-list-new/inventory-list-new.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { AddEditUnitComponent } from './add-edit-unit/add-edit-unit.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';
import { SharedModule}from '../shared/shared.module';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { AddInventorySingleComponent } from './add-inventory-single/add-inventory-single.component';
import { ArchiveListComponent } from './archive-list/archive-list.component';
@NgModule({
  declarations: [
    InventoryListComponent,
    CategoryListComponent,
    AddEditCategoryComponent,
    AddInventoryComponent,
    InventoryListNewComponent,
    UnitListComponent,
    AddEditUnitComponent,
    EditInventoryComponent,
    AddInventorySingleComponent,
    ArchiveListComponent
    
   
  ],
  imports: [
    FilterPipeModule,
    CommonModule,
    TemplateModule,
    SharedModule,
    InventoryRoutingModule
  ]
})
export class InventoryModule { }
