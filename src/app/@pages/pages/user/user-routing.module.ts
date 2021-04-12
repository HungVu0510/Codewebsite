import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserHomeComponent} from './user-home/user-home.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path: 'home',
    component: UserHomeComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
