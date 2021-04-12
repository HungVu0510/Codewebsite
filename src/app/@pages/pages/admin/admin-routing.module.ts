import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminUserListComponent} from './user/admin-user-list/admin-user-list.component';
import {AdminUserDetailComponent} from './user/admin-user-detail/admin-user-detail.component';
import {AdminProductListComponent} from './product/admin-product-list/admin-product-list.component';
import {AdminProductDetailComponent} from './product/admin-product-detail/admin-product-detail.component';
import {AdminOrderListComponent} from './order/admin-order-list/admin-order-list.component';
import {AdminOrderDetailComponent} from './order/admin-order-detail/admin-order-detail.component';

const routes: Routes = [
  {
    path: 'user',
    component: AdminUserListComponent
  },
  {
    path: 'user/:id',
    component: AdminUserDetailComponent
  },
  {
    path: 'product',
    component: AdminProductListComponent
  },
  {
    path: 'product/:id',
    component: AdminProductDetailComponent
  },
  {
    path: 'order',
    component: AdminOrderListComponent
  },
  {
    path: 'order/:id',
    component: AdminOrderDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
