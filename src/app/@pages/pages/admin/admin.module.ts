import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminUserListComponent } from './user/admin-user-list/admin-user-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AdminUserDetailComponent } from './user/admin-user-detail/admin-user-detail.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {FlexModule} from '@angular/flex-layout';
import {MatDividerModule} from '@angular/material/divider';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { AdminProductListComponent } from './product/admin-product-list/admin-product-list.component';
import { AdminProductDetailComponent } from './product/admin-product-detail/admin-product-detail.component';
import { AdminOrderListComponent } from './order/admin-order-list/admin-order-list.component';
import { AdminOrderDetailComponent } from './order/admin-order-detail/admin-order-detail.component';

@NgModule({
  declarations: [AdminUserListComponent, AdminUserDetailComponent, AdminProductListComponent, AdminProductDetailComponent, AdminOrderListComponent, AdminOrderDetailComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        TranslateModule,
        MatTableModule,
        MatIconModule,
        MatPaginatorModule,
        MatButtonModule,
        MatSortModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatCardModule,
        FlexModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatInputModule
    ]
})
export class AdminModule { }
